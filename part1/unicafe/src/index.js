// Application to record user feedback
// User has three feedback options: good, neutral, and bad
// Displays statistics based on the feedback
// only works in a single browser session (feedback doesn't go anywhere)
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  // component to display a button with a label & handle it being clicked
  return (
    <button onClick={props.handleClick}> {props.text} </button>
  )
};

const Statistic = (props) => {
  // displays a single statistic in a table row
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
};

const Statistics = (props) => {
  // container to display all feedback statistics

  // determine the total number of button clicks
  const total = props.good + props.neutral + props.bad;
  if (total === 0) {
    return (
      <p>No feedback given </p>
    );
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <Statistic text="good" value={props.good} />
            <Statistic text="neutral" value={props.neutral} />
            <Statistic text="bad" value={props.bad} />
            <Statistic text="all" value={total} />
            <Statistic text="average" value={ (props.good - props.bad) / (total) } />
            <Statistic text="positive" value={ ((props.good / (total)) * 100) + '%' } />
          </tbody>
        </table>
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
