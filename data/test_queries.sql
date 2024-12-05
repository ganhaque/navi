-- variations of special enrollment
SELECT * FROM special_enrollment;

-- department without abbreviation (scraped departments that does not have ANY class in ANY semesters)
SELECT department_title FROM department WHERE abbreviation IS NULL;

-- all classes in Spring 2025 that are 100% online
SELECT department.abbreviation, course_template.course_number, course.section, course_template.course_title, course_template.credit_hour
FROM course NATURAL JOIN department NATURAL JOIN course_template
WHERE semester_title = 'Spring 2025' AND course.special_enrollment = '100% WEB BASED';

-- all CS teacher in Spring 2025
SELECT DISTINCT instructor_name
FROM course
WHERE semester_title = 'Spring 2025'
AND department_title = 'Computer Science'
AND instructor_name IS NOT NULL;

-- all classrooms in PFT
SELECT DISTINCT room_number
FROM location
WHERE building_name = 'Patrick Taylor';
