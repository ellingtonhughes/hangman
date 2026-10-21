function HangmanDisplay({ wrongGuessCount, livesRemaining }) {
    return (
      <div>
        <img
          src={`/../hangman-${wrongGuessCount}.png`}
          alt={`Hangman with ${wrongGuessCount} incorrect guesses`}
        />
  
        <p>You have {livesRemaining} lives remaining!</p>
      </div>
    )
  }
  
  export default HangmanDisplay