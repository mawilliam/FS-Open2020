// Application to display details about the Full Stack Open course
import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  // container to display the course name
  // receives the name of the course
  return (
    <h1>{props.course} </h1>
  )
};

const Part = (props) => {
  // container to display a single part of the course
  // receives the name and number of exercises for a single part
  return <p>{props.part} {props.exercises} </p>
};

const Content = (props) => {
  // container for all of the course content (parts)
  // receives an array of course part data
  // renders a Part component and passes the requisite part data
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  )
};

const Total = (props) => {
  // container to display the total number of exercises in the course
  return <p>Number of exercises {props.parts[0].exercises 
    + props.parts[1].exercises 
    + props.parts[2].exercises} </p>
};

const App = () => {
  // root component for the application

  // course information object containing a string representing the course name
  // and an array of objects that represent each part's name and number of exercises
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      }
    ]
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
