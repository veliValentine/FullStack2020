import React from 'react';

import { CoursePart } from '../index';
import Part from './Part';

const Content = ({ courses }: { courses: CoursePart[] }) => (
  <div>
    {courses.map(course =>
      <Part key={course.name} course={course} />
    )}
  </div>
);

export default Content;