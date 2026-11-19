function PlayerLogin({ playerName, onNameChange, onLogin, isLoggingIn }) {
    return (
      <form onSubmit={onLogin}>
        <label htmlFor="player-name">Player name</label>
  
        <input
          id="player-name"
          type="text"
          value={playerName}
          onChange={(event) => onNameChange(event.target.value)}
          required
        />
  
        <button type="submit" disabled={isLoggingIn}>
        {isLoggingIn ? 'Looking up player...' : 'Log In'}
        </button>
      </form>
    )
  }
  
  export default PlayerLogin