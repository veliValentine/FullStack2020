import React from 'react';
interface CourseProps {
  course: {
    name: string;
    exerciseCount: number;
  };
}

interface ContentProps {
  courses: Array<{
    name: string;
    exerciseCount: number;
  }>;
}

const Course: React.FC<CourseProps> = ({ course }) => (
  <p>
    {course.name} {course.exerciseCount}
  </p>
)

const Content: React.FC<ContentProps> = ({ courses }) => (
  <div>
    {courses.map(c =>
      <Course key={c.name} course={c} />
    )}
  </div>
);


export default Content;