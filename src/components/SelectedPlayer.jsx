/* eslint-disable react/prop-types */

import { useParams, useNavigate } from 'react-router-dom'


export default function SelectedPlayer({
  players
}) {
  
  const navigate=useNavigate();
  const { id } = useParams();
  const player = players.find((p) => p.id === parseInt(id))
  console.log("Player: ", player);

  return (
    <div className='singlePlayerCard'>
      
        <h1>{player.name}</h1>
        <h3>{player.breed}</h3>
        <img className="singlePlayerImg" src={player.imageUrl} alt={player.name}></img>
      
      <button
        onClick={() => {navigate("/")}}
        style={{ marginTop: "20px" }}
      >
        Back to Player List
      </button>
    </div>
  );
}
