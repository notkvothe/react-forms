import { useState } from "react";

function Authenticate({ token }) { 
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [usernameData, setUsernameData] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();

      if (result.success) {
        setSuccessMessage(result.message);
        setUsernameData(result.data.username);
        setError(null);
      } else {
        setError(result.message);
        setSuccessMessage(null);
        setUsernameData(null);
      }
    } catch (error) {
      setError(error.message);
      setSuccessMessage(null);
      setUsernameData(null);
    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p className="success">{successMessage}</p>}
      {error && <p className="error">{error}</p>}
      {usernameData && <p>Username: {usernameData}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}

export default Authenticate;