function GuessedLetters({ guessedLetters }) {
    return (
      <div>
        <h2>Guessed Letters</h2>
        <p>{guessedLetters.join(', ')}</p>
      </div>
    )
  }
  
  export default GuessedLetters