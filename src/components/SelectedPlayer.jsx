/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const API_URL = "https://fsa-puppy-bowl.herokuapp.com/api/2409-GHP-ET-WEB-PT";

export default function SelectedPlayer({
  selectedPlayerId,
  setSelectedPlayerId,
}) {
  const [player, setPlayer] = useState(null);
  console.log("Player: ", player);

  useEffect(() => {
    async function fetchSelectedPlayer() {
      try {
        const response = await fetch(`${API_URL}/players/${selectedPlayerId}`);
        const result = await response.json();
        setPlayer(result);
      } catch (error) {
        console.error("Error fetching player: ", error);
      }
    }
    fetchSelectedPlayer();
  }, [selectedPlayerId]);

  return (
    <div>
      <tr>
        <td>{player.name}</td>
        <td>{player.breed}</td>
        <td>{player.imageUrl}</td>
      </tr>
      <button
        onClick={() => setSelectedPlayerId(null)}
        style={{ marginTop: "20px" }}
      >
        Back to Contact List
      </button>
    </div>
  );
}
