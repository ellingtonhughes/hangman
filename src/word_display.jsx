function WordDisplay({ word, guessedLetters }) {
    return (
      <p>
        {word.split('').map((letter, index) => (
          <span key={index}>
            {guessedLetters.includes(letter) ? letter : '_'}
            {' '}
          </span>
        ))}
      </p>
    )
  }
  
  export default WordDisplay