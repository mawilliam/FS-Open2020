import React from 'react';

const Part = ( {part} ) => {
    // container to display a single part of the course
    // receives the name and number of exercises for a single part
    return <p>{part.name} {part.exercises} </p>
};

export default Part;
