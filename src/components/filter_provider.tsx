'use client'

import { sql_query } from '@/utils';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
interface ProviderContextType {
  semester: string,
  set_semester: React.Dispatch<React.SetStateAction<string>>;
}

const FilterContext = React.createContext<ProviderContextType | null>(null);

export const FilterProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [semester, set_semester] = useState("Spring 2025");

  useEffect(() => {
    const get_semester = async() => {
      const semester = await sql_query("select * from semester");
      console.log(semester);
    }

    get_semester();
  }, [semester]);

  return (
    <FilterContext.Provider
      value={{
        semester,
        set_semester,
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
