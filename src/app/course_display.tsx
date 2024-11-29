"use client"

import { use_filter_context } from "@/app/data_provider";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function CourseDisplay() {
  const { courses } = use_filter_context();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Available</TableHead>
            <TableHead>Abbreviation</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>CR</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Special Enrollment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={index}>
              {/* TODO: different color if full */}
              <TableCell>
                {course.enrollment != null && course.available != null ? (
                  course.enrollment + "/" + (course.enrollment + course.available)
                ) : (
                    ""
                  )}
              </TableCell>

              <TableCell>{course.department_abbreviation}</TableCell>
              <TableCell>{course.course_number}-{course.section}</TableCell>
              <TableCell>{course.course_title}</TableCell>
              <TableCell>{course.credit_hour}</TableCell>

              <TableCell>{course.instructor_name}</TableCell>

              <TableCell>{course.room_number} {course.building_name}</TableCell>

              {/* TODO: parse time */}
              <TableCell>{course.time_begin} - {course.time_end}</TableCell>
              <TableCell>{course.day_pattern}</TableCell>

              <TableCell>{course.course_type}</TableCell>
              <TableCell>{course.special_enrollment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}
