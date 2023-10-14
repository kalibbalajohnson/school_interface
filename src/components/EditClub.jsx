import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Toast from "./from/Toast";
import axios from "axios";
import { Navigate } from "react-router";
function EditClub() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [headOfClub, setHeadOfClub] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fetchClub = async () => {
    try {
      const response = await axios.get(
        `https://schoolapi-op58.onrender.com/v1/clubs/${id}`
      );
      setName(response.data.clubName);
      setHeadOfClub(response.data.headOfClub);
      // Set other state variables for other fields if needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await axios
      .put(`https://schoolapi-op58.onrender.com/v1/clubs/${id}`, {
        clubName: name,
        headOfClub: headOfClub,
      })
      .then(() => {
        setName("");
        setHeadOfClub("");
        setSuccess("Succefully edited Club");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  useEffect(() => {
    fetchClub();
  }, []);
  return (
    <div>
      {success && <Navigate to="/clubs" />}
      {error && <Toast message={error} color={"red"} />}
      <form onSubmit={handleEdit}>
        <div>
          <label>Club Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Head of club</label>
          <input
            type="text"
            value={headOfClub}
            onChange={(e) => setHeadOfClub(e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default EditClub;
