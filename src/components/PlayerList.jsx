/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function PlayerList({ players, onPlayerDeleted }) {
  

  return (
    <>
      <h2>Current Players:</h2>
      <h3>Click on a puppy&apos;s name for more info!</h3>
      <div className="playerList">
        {players.map((player) => (
          <div
            key={player.id}
            className="playerCard"
          >
            <Link className="nameLink" to={`/players/${player.id}`}>
            {player.name}
            </Link>
            <img
              className="playerImage"
              src={player.imageUrl}
              alt={`${player.name}`}
            />
            <a
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
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
