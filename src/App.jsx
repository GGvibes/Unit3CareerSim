import { useState, useEffect } from "react";
import "./App.css";
import PlayerList from "./components/PlayerList";
import SelectedPlayer from "./components/SelectedPlayer";
import NewPlayerForm from "./components/NewPlayerForm";
import { Routes, Route } from "react-router-dom";

const API_URL = "https://fsa-puppy-bowl.herokuapp.com/api/2409-GHP-ET-WEB-PT";

export default function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch(`${API_URL}/players`);
        if (response.ok) {
          const json = await response.json();
          setPlayers(json.data.players);
        } else {
          console.error("Failed to fetch players:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching players: ", error);
      }
    }
    fetchPlayers();
  }, []);

  const handlePlayerAdded = (playerData) => {
    if (!playerData || !playerData.newPlayer) return;
    const newPlayer = playerData.newPlayer;
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
  };

  const handlePlayerDeleted = async (playerId) => {
    try {
      const response = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/2409-GHP-ET-WEB-PT/players/${playerId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setPlayers((prevPlayers) =>
          prevPlayers.filter((player) => player.id !== playerId)
        );
      } else {
        console.error("Failed to delete player:", response.statusText);
      }
    } catch (err) {
      console.error("Error deleting player:", err);
    }
  };

  return (
    <>
      <h1 className="header">Puppy Bowl</h1>
      <NewPlayerForm onPlayerAdded={handlePlayerAdded} />
      <div>
        <Routes>
          <Route path="/" element={<PlayerList players={players} onPlayerDeleted={handlePlayerDeleted}/>}></Route>
          <Route
            path="/players/:id"
            element={<SelectedPlayer players={players} />}
          ></Route>
        </Routes>
      </div>
      
    </>
  );
}
