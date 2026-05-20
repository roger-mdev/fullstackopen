import { useState } from 'react'

const StatisticsLine = ({text, value}) => {
  if (Number.isNaN(value)) return (
    <tr><td>{text}</td><td>0</td></tr>)

  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Button = ({onClick, name}) => <button onClick={onClick}>{name}</button>

const Header = ({text}) => <h1>{text}</h1>

const Statistics = (props) => {
  const [good, neutral, bad] = props.reviews;
  const total = good + bad + neutral;

  if ((good + neutral + bad) === 0)
    return (
      <>
        <Header text={"statistics"} />
        <p>No feedback given</p>
      </>
    )

  return (
    <>
    <Header text={"statistics"} />
    <table>
      <tbody>
      <StatisticsLine text={"good"} value={good} />
      <StatisticsLine text={"neutral"} value={neutral} />
      <StatisticsLine text={"bad"} value={bad} />
      <StatisticsLine text={"all"} value={total} />
      <StatisticsLine text={"average"} value={(good - bad) / total} />
      <StatisticsLine text={"positive"} value={`${(good / total) * 100}%`} />
      </tbody>
    </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Header text={"give feedback"} />
      <Button name={"good"} onClick={() => setGood(good + 1)} />
      <Button name={"neutral"} onClick={() => setNeutral(neutral + 1)} />
      <Button name={"bad"} onClick={() => setBad(bad + 1)} />
      
      <Statistics reviews={[good, neutral, bad]}/>
      
    </div>
  )
}

export default App