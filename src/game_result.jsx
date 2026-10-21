import NewGameButton from './NewGameButton'

function GameResultModal({ gameOver, isWinner, word, onNewGame }) {
    if (!gameOver) return null
  
    return (
      <div className="modal-overlay">
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="game-result-title"
        >
          <h2 id="game-result-title" className={isWinner ? 'win-text' : 'lose-text'}>
            {isWinner ? "You Won!" : "You Lost!"}
          </h2>
  
          <p>
            The word was: {word}
          </p>
          
          <NewGameButton onNewGame={onNewGame} />
        </div>
      </div>
    )
  }
  
  export default GameResultModal