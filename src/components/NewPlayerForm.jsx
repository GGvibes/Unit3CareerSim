/* eslint-disable react/prop-types */
import { useState } from "react";

const API_URL = "https://fsa-puppy-bowl.herokuapp.com/api/2409-GHP-ET-WEB-PT";

export default function NewPlayerForm({ onPlayerAdded }) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const playerObj = {
      name,
      breed,
      imageUrl,
    };

    try {
      const response = await fetch(`${API_URL}/players`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playerObj),
      });
      if (response.ok) {
        const json = await response.json();
        console.log("New Player Added", json);
        if (onPlayerAdded) {
          onPlayerAdded(json.data);
        }

        setName("");
        setBreed("");
        setImageUrl("");
      } else {
        console.error("Failed to add new player", response.statusText);
      }
    } catch (err) {
      console.log("Error adding new player:", err);
    }
  };

  return (
    <form className="newPlayerForm" onSubmit={handleSubmit}>
      <h2>Add a new puppy here:</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </label>
      <label>
        Breed:
        <input
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        ></input>
      </label>
      <label>
        Image Url:
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        ></input>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
