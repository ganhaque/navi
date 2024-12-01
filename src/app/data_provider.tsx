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
  day_patterns: DayPattern[],
  time_slots: TimeSlot[],
  locations: Location[],
  special_enrollments: SpecialEnrollment[],
  course_types: CourseType[],
  credit_hours: CreditHour[],

  update: boolean,
  set_update: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Course {
  course_id: number;
  semester_title: string;
  department_title: string;
  available?: number | null;
  enrollment?: number | null;
  course_number: number;
  section: number;
  room_number?: number | null;
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

export interface DayPattern {
  day_pattern: string;
}

export interface TimeSlot {
  time_begin: number;
  time_end: number;
}

export interface Location {
  room_number: number;
  building_name: string;
}

export interface SpecialEnrollment {
  special_enrollment: string;
}
export interface CourseType {
  course_type: string;
}
export interface CreditHour {
  credit_hour: string;
}

const FilterContext = React.createContext<ProviderContextType | null>(null);

export const FilterProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [current_schedule, set_current_schedule] = useState(-1);


  const [courses, set_courses] = useState<Course[]>([]);

  const [semesters, set_semesters] = useState<Semester[]>([]);
  const [departments, set_departments] = useState<Department[]>([]);
  const [time_slots, set_time_slots] = useState<TimeSlot[]>([]);
  const [day_patterns, set_day_patterns] = useState<DayPattern[]>([]);
  const [locations, set_locations] = useState<Location[]>([]);
  const [special_enrollments, set_special_enrollments] = useState<SpecialEnrollment[]>([]);
  const [course_types, set_course_types] = useState<CourseType[]>([]);
  const [credit_hours, set_credit_hours] = useState<CreditHour[]>([]);

  const [semester_filter, set_semester_filter] = useState("Spring 2025");
  const [department_filter, set_department_filter] = useState("COMPUTER SCIENCE");

  // hacky solution to prompt courses update
  // do set_update(!update) to update courses
  const [update, set_update] = useState(false);

  useEffect(() => {
    sql_query("SELECT * FROM semester")
      .then((semesters: Semester[]) => {
        const sorted_semesters = semesters.sort((a, b) => {
          const [a_season, a_year] = a.semester_title.split(" ");
          const [b_season, b_year] = b.semester_title.split(" ");

          const season_order: Record<string, number> = { Spring: 0, Fall: 1, };
          const a_order = parseInt(a_year) * 10 + season_order[a_season];
          const b_order = parseInt(b_year) * 10 + season_order[b_season];

          return a_order - b_order;
        });

        set_semesters(sorted_semesters);
      })
      .catch((error) => {
        console.error("Error fetching semesters:", error);
      });
  }, []);

  useEffect(() => {
    sql_query("SELECT * FROM credit_hour")
      .then((credit_hours: CreditHour[]) => {
        const sorted_credit_hour = credit_hours.sort((a, b) => {
          return a.credit_hour.localeCompare(b.credit_hour);
        });

        set_credit_hours(sorted_credit_hour);
      })
      .catch((error) => {
        console.error("Error fetching course_types:", error);
      });
  }, []);

  useEffect(() => {
    sql_query("SELECT * FROM course_type")
      .then((course_types: CourseType[]) => {
        const sorted_course_types = course_types.sort((a, b) => {
          return a.course_type.localeCompare(b.course_type);
        });

        set_course_types(sorted_course_types);
      })
      .catch((error) => {
        console.error("Error fetching course_types:", error);
      });
  }, []);

  useEffect(() => {
    sql_query("SELECT * FROM special_enrollment")
      .then((special_enrollments: SpecialEnrollment[]) => {
        const sorted_special_enrollments = special_enrollments.sort((a, b) => {
          return a.special_enrollment.localeCompare(b.special_enrollment);
        });

        set_special_enrollments(sorted_special_enrollments);
      })
      .catch((error) => {
        console.error("Error fetching special_enrollments:", error);
      });
  }, []);

  useEffect(() => {
    sql_query("SELECT * FROM location")
      .then((locations: Location[]) => {
        const sorted_locations = locations.sort((a, b) => {
          if (a.building_name === b.building_name) {
            return a.room_number - b.room_number;
          }
          return a.building_name.localeCompare(b.building_name);
        });

        set_locations(sorted_locations);
      })
      .catch((error) => {
        console.error("Error fetching time_slots:", error);
      });
  }, []);

  useEffect(() => {
    sql_query("SELECT * FROM time_slot")
      .then((time_slots: TimeSlot[]) => {
        const sorted_time_slots = time_slots.sort((a, b) => {
          if (a.time_begin === b.time_begin) {
            return a.time_end - b.time_end;
          }
          return a.time_begin - b.time_begin;
        });

        set_time_slots(sorted_time_slots);
      })
      .catch((error) => {
        console.error("Error fetching time_slots:", error);
      });
  }, []);

  useEffect(() => {
    sql_query("SELECT * FROM day_pattern")
      .then((day_patterns: DayPattern[]) => {
        set_day_patterns(day_patterns);
      })
      .catch((error) => {
        console.error("Error fetching day_patterns:", error);
      });
  }, []);

  useEffect(() => {
    sql_query("SELECT * FROM department WHERE abbreviation IS NOT NULL")
      .then((departments: Department[]) => {
        const sorted_departments = departments.sort((a, b) => {
          return a.department_title.localeCompare(b.department_title);
        });
        set_departments(sorted_departments);
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
      /* console.log(courses); */
      set_courses(courses);
    }

    get_courses();
  }, [update, semester_filter, department_filter]);

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
        day_patterns,
        time_slots,
        locations,
        special_enrollments,
        course_types,
        credit_hours,

        update,
        set_update,
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
