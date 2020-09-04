import React from 'react';

const Header = ( {course} ) => {
    // container to display the course name
    // receives the name of the course
    return (
      <h2>{course.name} </h2>
    )
  };

  export default Header;
  