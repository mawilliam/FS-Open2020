import React from 'react';
import Part from './Part';

const Content = ( {parts} ) => {
    // container for all of the course content (parts)
    // receives an array of course part data
    // renders a Part component and passes the requisite part data
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part} />
          )}
      </div>
    )
  };

  export default Content;
  