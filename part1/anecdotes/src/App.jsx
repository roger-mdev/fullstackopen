import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1> 
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Object.fromEntries(anecdotes.map(key => [key, 0])))
  const [mostVotedIndex, setMostVoted] = useState(0)
  
  const currentAnedote = anecdotes[selected];  

  const getMostVoted = (updatedVotes) => {
    console.log("finding new most voted")
    let mostVoted = 0
    for (let i = 0; i < anecdotes.length; ++i) {
      if (updatedVotes[anecdotes[i]] >= mostVoted) {
        mostVoted = updatedVotes[anecdotes[i]]
        setMostVoted(i);
      }
    }
  }

  const handleAnecdote = () => {
    let index
    do {
      index = Math.floor(Math.random() * anecdotes.length)
    } while (index === selected)
    setSelected(index)
  }

  const handleVotes = () => {
    const newVotes = {...votes, [currentAnedote]: votes[currentAnedote] + 1}
    setVotes(newVotes)
    getMostVoted(newVotes)
  }

  return (
    <div>
      <Header text={"Anecdote of the day"} />
      <p>{anecdotes[selected]} {votes[anecdotes[selected]]} votes</p>
      <Button onClick={handleVotes} text={"vote"} />
      <Button onClick={handleAnecdote} text={"next anecdote"} />
      <Header text={"Anecdote with the most votes"} />
      <p>{anecdotes[mostVotedIndex]} {votes[anecdotes[mostVotedIndex]]} votes</p>
    </div>
  )
}

export default App