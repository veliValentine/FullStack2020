import React from 'react';

import { CoursePart } from '../index';
import Part from './Part';

const Content = ({ courses }: { courses: CoursePart[] }) => {
  console.log(courses);
  return (
    <div>
      {courses.map(course =>
        <Part key={course.name} course={course} />
      )}
    </div>
  );
};


export default Content;