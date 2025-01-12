/* eslint-disable react/prop-types */

export default function PlayerList({
  players,
  setSelectedPlayerId,
  onPlayerDeleted,
}) {

  return (
    
    <div className="playerList">
      {players.map((player) => (
        <div
          key={player.id}
          className="playerCard"
          onClick={() => setSelectedPlayerId(player.id)}
        >
          <h3>{player.name}</h3>
          <img
            className="playerImage"
            src={player.imageUrl}
            alt={`${player.name}`}
          />
          <button
            className="deleteButton"
            onClick={(e) => {
              e.stopPropagation();
              if (
                window.confirm(
                  `Are you sure you want to remove ${player.name}?`
                )
              ) {
                onPlayerDeleted(player.id);
              }
            }}
          >
            Remove Player
          </button>
        </div>
      ))}
    </div>
    
  );
  
}
