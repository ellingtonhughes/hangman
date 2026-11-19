import NewGameButton from './NewGameButton'

function GameResultModal({
  gameOver,
  isWinner,
  word,
  onNewGame,
  isSavingStats,
  statsError,
  onRetrySave
}) {
  if (!gameOver) return null

  return (
    <div className="modal-overlay">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-result-title"
      >
        <h2
          id="game-result-title"
          className={isWinner ? 'win-text' : 'lose-text'}
        >
          {isWinner ? 'You Won!' : 'You Lost!'}
        </h2>

        <p>The word was: {word}</p>

        {isSavingStats && <p>Saving statistics...</p>}

        {statsError && (
          <div>
            <p role="alert">{statsError}</p>
            <button
              type="button"
              onClick={onRetrySave}
              disabled={isSavingStats}
            >
              Retry Save
            </button>
          </div>
        )}

        {!isSavingStats && !statsError && (
          <NewGameButton onNewGame={onNewGame} />
        )}
      </div>
    </div>
  )
}

export default GameResultModal