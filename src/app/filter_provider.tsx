'use client'

import { sql_query } from '@/utils';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
interface ProviderContextType {
  semester_filter: string,
  set_semester_filter: React.Dispatch<React.SetStateAction<string>>;
}

interface Course {
  semester_filter: string,
  set_semester_filter: React.Dispatch<React.SetStateAction<string>>;
}

const FilterContext = React.createContext<ProviderContextType | null>(null);

export const FilterProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [courses, set_courses] = useState();
  const [semester_filter, set_semester_filter] = useState("Spring 2025");

  useEffect(() => {
    console.log("filter changed, updating course")
    /* const get_semester = async() => { */
    /*   const semester = await sql_query("select * from semester"); */
    /*   console.log(semester); */
    /* } */
    /**/
    /* get_semester(); */
  }, [semester_filter]);

  return (
    <FilterContext.Provider
      value={{
        semester_filter,
        set_semester_filter,
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
    throw new Error('useScheduleContext must be used within a ScheduleProvider');
  }
  return context;
};
