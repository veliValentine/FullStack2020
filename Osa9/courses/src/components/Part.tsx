import React from 'react';
import { CoursePart } from '..';

const Part = ({ course }: { course: CoursePart }) => {

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  switch (course.name) {
    case 'Fundamentals':
      return <div>
        <h4>{course.name}</h4>
        {course.exerciseCount} exercises
        <br />
        {course.description}
        <hr />
      </div>;
    case 'Using props to pass data':
      return <div>
        <h4>{course.name}</h4>
        {course.exerciseCount} exercises
        <br />
        {course.groupProjectCount} projects
        <hr />
      </div>;
    case 'Deeper type usage':
      return <div>
        <h4>{course.name}</h4>
        {course.exerciseCount} exercises
        <br />
        {course.description}
        <br/>
        submission: <a href={course.exerciseSubmissionLink}>{course.exerciseSubmissionLink}</a>
        <hr />
      </div>;
    default:
      return assertNever(course);
  }
};

export default Part;