function LetterKeyboard({ guessedLetters, onGuess, gameOver }) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  
    return (
      <div>
        {alphabet.split('').map((letter) => (
          <button
            key={letter}
            onClick={() => onGuess(letter)}
            disabled={gameOver || guessedLetters.includes(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    )
  }
  
  export default LetterKeyboard