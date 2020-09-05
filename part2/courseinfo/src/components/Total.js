import React from 'react';

const Total = ( {parts} ) => {
    
    // container to display the total number of exercises in the course
    const sum = parts.reduce((accumulator, currentValue) => 
        accumulator + currentValue.exercises, 0);
    return <p><strong>total of {sum} exercises</strong></p>
  };

  export default Total;
