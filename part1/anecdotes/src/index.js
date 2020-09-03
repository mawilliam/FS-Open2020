import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  // container for an individual button
  // receives the event handler, label, and selected
  return (
    <button onClick={props.handleClick}>
      {props.label}
    </button>
  )
};

const Content = (props) => {
  // container to display information about an anecdote
  return (
    <>
      <p> {props.text} </p>
      <p>has {props.number} votes </p>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(props.votes);
  const [mostVotes, setMost] = useState(0);

  const handleNext = () => {
    // return a random index in the anecdote array
    return setSelected(
      Math.floor( Math.random() * props.anecdotes.length )
    )
  };

  const findMost = (votes) => {
    // returns the position of the largest value in the array
    // returns first position in case of ties
    let most = 0;
    console.log('Votes:', votes)
    for (let i = 1; i < votes.length; i++) {
      if (votes[i] > votes[most]) {
        most = i;
      }
    }
    return most;
  };

  const handleVote = () => {
    // create a copy of the votes array
    // necessary because you cannot mutate state variables
    const newVotes = [...votes];

    // increment vote and update array
    newVotes[selected]++;
    setVotes(newVotes); // replaces the current votes object with a new one

    // determine anecdote with the most votes
    // for some reason cannot see the updated version of votes
    setMost(findMost(newVotes));

  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Content text={props.anecdotes[selected]} number={votes[selected]} />
      <Button handleClick={handleVote} label="vote" />
      <Button handleClick={handleNext} label="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Content text={props.anecdotes[mostVotes]} number={votes[mostVotes]} />
    </div>
  )
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

// array the same size as anecdotes initially all zero to track votes
const votes = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0);

ReactDOM.render(
  <App anecdotes={anecdotes} votes={votes} />,
  document.getElementById('root')
);
