'use client'

import { sql_query } from '@/utils';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
interface ProviderContextType {
  current_schedule: number,
  set_current_schedule: React.Dispatch<React.SetStateAction<number>>;
  courses: Course[],
  semester_filter: string,
  set_semester_filter: React.Dispatch<React.SetStateAction<string>>;
  department_filter: string,
  set_department_filter: React.Dispatch<React.SetStateAction<string>>;

  semesters: Semester[],
  departments: Department[],
}

export interface Course {
  semester_title: string;
  department_title: string;
  available?: number | null;
  enrollment?: number | null;
  course_number: number;
  section: number;
  room_number?: string | null;
  building_name?: string | null;
  time_begin?: number | null;
  time_end?: number | null;
  day_pattern?: string | null;
  special_enrollment?: string | null;
  instructor_name?: string | null;
  course_extension_id?: number | null;

  department_abbreviation: string;

  credit_hour: string | null;
  course_title: string;
  course_type: string | null;
}

export interface Schedule {
  schedule_id: string;
  schedule_name: string;
  username: string;
  semester_title: string;
}

export interface Semester {
  semester_title: string;
}

export interface Department {
  department_title: string;
  abbreviation?: string;
}

const FilterContext = React.createContext<ProviderContextType | null>(null);

export const FilterProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [current_schedule, set_current_schedule] = useState(-1);


  const [courses, set_courses] = useState<Course[]>([]);

  const [semesters, set_semesters] = useState<Semester[]>([]);
  const [departments, set_departments] = useState<Department[]>([]);

  const [semester_filter, set_semester_filter] = useState("Spring 2025");
  const [department_filter, set_department_filter] = useState("COMPUTER SCIENCE");

  useEffect(() => {
    // TODO: sort by chronological order
    sql_query("SELECT * FROM semester")
      .then((semesters: Semester[]) => {
        set_semesters(semesters);
      })
      .catch((error) => {
        console.error("Error fetching semesters:", error);
      });
  }, []);

  useEffect(() => {
    // TODO: sort by alphabetical
    // TODO: query only department with abbreviation
    sql_query("SELECT * FROM department")
      .then((departments: Department[]) => {
        set_departments(departments)
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  useEffect(() => {
    console.log("filter changed, updating course")

    const get_courses = async() => {
      let query = `
SELECT
course.*,
department.abbreviation AS department_abbreviation,
course_template.credit_hour AS credit_hour,
course_template.course_title AS course_title,
course_template.course_type AS course_type
FROM
course
NATURAL JOIN department
NATURAL JOIN course_template
WHERE 1=1
`
      ;

      const params = [];
      if (semester_filter) {
        query += " AND semester_title = '" + semester_filter + "'";
        params.push(semester_filter);
      }
      if (department_filter) {
        query += " AND department_title = '" + department_filter + "'";
        params.push(department_filter);
      }
      const courses = await sql_query(query);
      console.log(courses);
      set_courses(courses);
    }

    get_courses();

  }, [semester_filter]);

  return (
    <FilterContext.Provider
      value={{
        current_schedule,
        set_current_schedule,
        courses,
        semester_filter,
        set_semester_filter,
        department_filter,
        set_department_filter,

        semesters,
        departments,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

// A custom hook to use the context in components
export const use_filter_context = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('usecurrent_scheduleContext must be used within a current_scheduleProvider');
  }
  return context;
};
