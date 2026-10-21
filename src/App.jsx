import { useState } from 'react'
import WordDisplay from './word_display'
import LetterKeyboard from './letter_keyboard'
import GuessedLetters from './guessed_letters'
import HangmanDisplay from './hangman_display'
import GameResultModal from './game_result'
import NewGameButton from './NewGameButton'
import './App.css'

function App() {
  const [word, setWord] = useState('REACT')
  const [guessedLetters, setGuessedLetters] = useState([])


function handleGuess(letter) {
  if (gameOver || guessedLetters.includes(letter)) return
    setGuessedLetters(previousLetters => [
      ...previousLetters,
      letter
    ])
  }

function startNewGame() {
  setGuessedLetters([])
}


const maxLives = 6
const wrongGuesses = guessedLetters.filter(
  letter => !word.includes(letter)
)
const livesRemaining = maxLives - wrongGuesses.length



const isWinner = word.split('').every(
  letter => guessedLetters.includes(letter)
)
const isLoser = livesRemaining <= 0
const gameOver = isWinner || isLoser


  return (
    <main>
      <h1>Hangman</h1>
      <p>Guess the word before you run out of lives!</p>

      <WordDisplay word={word} guessedLetters={guessedLetters} />

      <GuessedLetters guessedLetters={guessedLetters} />

      <HangmanDisplay
        wrongGuessCount={wrongGuesses.length}
        livesRemaining={livesRemaining}
      />

      <LetterKeyboard
        guessedLetters={guessedLetters}
        onGuess={handleGuess}
        gameOver={gameOver}
      />

      <GameResultModal
        gameOver={gameOver}
        isWinner={isWinner}
        word={word}
        onNewGame={startNewGame}
      />

      <NewGameButton onNewGame={startNewGame} />
    </main>
  )
}

export default App