function PlayerStats({ player }) {
    const totalGames = player.wins + player.losses
  
    const winPercentage = totalGames === 0
      ? 0
      : (player.wins / totalGames) * 100
  
    return (
      <section>
        <h2>{player.playerName}'s Statistics</h2>
        <p>Wins: {player.wins}</p>
        <p>Losses: {player.losses}</p>
        <p>Winning percentage: {winPercentage.toFixed(1)}%</p>
      </section>
    )
  }
  
  export default PlayerStats