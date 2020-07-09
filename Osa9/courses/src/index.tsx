import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  }
];

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  const totalExerciseCount = () => courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return (
    <div>
      <Header header={courseName} />
      <Content courses={courseParts} />
      <Total total={totalExerciseCount()} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));