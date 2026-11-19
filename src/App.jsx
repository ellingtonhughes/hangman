import { useState } from 'react'
import WordDisplay from './word_display'
import LetterKeyboard from './letter_keyboard'
import GuessedLetters from './guessed_letters'
import HangmanDisplay from './hangman_display'
import GameResultModal from './game_result'
import NewGameButton from './NewGameButton'
import PlayerLogin from './PlayerLogin'
import PlayerStats from './PlayerStats'
import './App.css'

const words = ['REACT', 'FULLSTACK', 'ELLINGTON', 'RACCOON', 'COMPUTER']
const vowels = ['A', 'E', 'I', 'O', 'U']
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)]
}


function App() {
  const [word, setWord] = useState(getRandomWord)
  const [guessedLetters, setGuessedLetters] = useState([])
  const [vowel, setVowel] = useState(0)
  const [playerName, setPlayerName] = useState('')
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isSavingStats, setIsSavingStats] = useState(false)
  const [statsError, setStatsError] = useState('')
  const [pendingStats, setPendingStats] = useState(null)
  const [matchingPlayers, setMatchingPlayers] = useState([])


  function handleGuess(letter) {
    if (
      currentPlayer === null ||
      gameOver ||
      isSavingStats ||
      pendingStats !== null ||
      guessedLetters.includes(letter)
    ) return
  
    const nextGuesses = [...guessedLetters, letter]
    setGuessedLetters(nextGuesses)
  
    const hasWon = word.split('').every(
      character => nextGuesses.includes(character)
    )
  
    const incorrectCount = nextGuesses.filter(
      guess => !word.includes(guess)
    ).length
  
    const hasLost = incorrectCount >= maxLives
  
    if (hasWon || hasLost) {
      const updatedPlayer = {
        ...currentPlayer,
        wins: currentPlayer.wins + (hasWon ? 1 : 0),
        losses: currentPlayer.losses + (hasLost ? 1 : 0)
      }
  
      // Update React first, then send the PUT request.
      setCurrentPlayer(updatedPlayer)
      setPendingStats(updatedPlayer)
      savePlayerStats(updatedPlayer)
    }
  }

  function startNewGame() {
    if (isSavingStats || pendingStats !== null) return
    const otherWords = words.filter(candidate => candidate !== word)
    const nextWord = otherWords[
      Math.floor(Math.random() * otherWords.length)
    ]
  
    setWord(nextWord)
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

async function handleLogin(event) {
  event.preventDefault()

  const name = playerName.trim()
  if (!name || isLoggingIn) return

  setLoginError('')
  setMatchingPlayers([])
  setIsLoggingIn(true)

  try {
    const response = await fetch(
      `http://localhost:3001/players?playerName=${encodeURIComponent(name)}`
    )

    // Create a player if the name wasn't found.
    if (response.status === 404) {
      const createResponse = await fetch(
        'http://localhost:3001/players',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            playerName: name
          })
        }
      )

      if (!createResponse.ok) {
        throw new Error('Could not create the player.')
      }

      const newPlayer = await createResponse.json()
      setCurrentPlayer(newPlayer)
      startNewGame()
      return
    }

    if (!response.ok) {
      throw new Error('Could not look up the player.')
    }

    const players = await response.json()

    if (players.length === 1) {
      setCurrentPlayer(players[0])
      startNewGame()
    } else {
      setMatchingPlayers(players)
    }

  } catch (error) {
    setLoginError(error.message)
  } finally {
    setIsLoggingIn(false)
  }
}

async function savePlayerStats(player) {
  setIsSavingStats(true)
  setStatsError('')

  try {
    const response = await fetch(
      `http://localhost:3001/players/${encodeURIComponent(player.playerID)}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          wins: player.wins,
          losses: player.losses
        })
      }
    )

    if (!response.ok) {
      throw new Error('Could not save statistics. Please retry.')
    }

    setPendingStats(null)
  } catch (error) {
    setStatsError(error.message)
  } finally {
    setIsSavingStats(false)
  }
}

function selectPlayer(player) {
  setCurrentPlayer(player)
  setMatchingPlayers([])
  setLoginError('')
  startNewGame()
}

  return (
    <main>
      <h1>Hangman</h1>
      <p>Guess the word before you run out of lives!</p>

      {loginError && <p role="alert">{loginError}</p>}

      {currentPlayer === null && (
        <PlayerLogin
          playerName={playerName}
          onNameChange={setPlayerName}
          onLogin={handleLogin}
          isLoggingIn={isLoggingIn}
        />
      )}

      {currentPlayer !== null && (
        <>
          <p>Welcome, {currentPlayer.playerName}!</p>
          <PlayerStats player={currentPlayer} />
        </>
      )}

      {currentPlayer === null && matchingPlayers.length > 1 && (
        <section>
          <h2>Select your player</h2>
          <p>Multiple players have this name. Choose your record:</p>

          {matchingPlayers.map(player => (
            <div key={player.playerID}>
              <p>
                {player.playerName} — Wins: {player.wins},
                Losses: {player.losses}
              </p>
              <p>Player ID: {player.playerID}</p>

              <button
                type="button"
                onClick={() => selectPlayer(player)}
              >
                Use this player
              </button>
            </div>
          ))}
        </section>
      )}

      <WordDisplay word={word} guessedLetters={guessedLetters} />

      <GuessedLetters guessedLetters={guessedLetters} />

      <HangmanDisplay
        wrongGuessCount={wrongGuesses.length}
        livesRemaining={livesRemaining}
      />

      <LetterKeyboard
        guessedLetters={guessedLetters}
        onGuess={handleGuess}
        gameOver={gameOver || currentPlayer === null}
      />

      <GameResultModal
        gameOver={gameOver}
        isWinner={isWinner}
        word={word}
        onNewGame={startNewGame}
        isSavingStats={isSavingStats}
        statsError={statsError}
        onRetrySave={() => {
          if (pendingStats !== null && !isSavingStats) {
            savePlayerStats(pendingStats)
          }
        }}
      />

      <NewGameButton onNewGame={startNewGame} />
    </main>
  )
}

export default App