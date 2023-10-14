import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Clubs() {
  const [clubData, setClubData] = useState([]);

  const fetchClubs = () => {
    //get data from the db
    fetch("https://schoolapi-op58.onrender.com/v1/clubs/")
      .then((response) => response.json())
      .then((data) => {
        setClubData(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const deleteClub = (id) => {
    axios
      .delete(`https://schoolapi-op58.onrender.com/v1/clubs/${id}`)
      .then(() => {
        // setClubData(clubData.filter((club) => club.id !== id));
        fetchClubs();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  return (
    <>
      <h3>Clubs</h3>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Club</th>
            <th>Head of Club</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {clubData.map((item) => (
            <tr key={item._id}>
              <td>{item.clubName}</td>
              <td>{item.headOfClub}</td>
              <td>
                <Link to={`/clubs/${item._id}`}>
                  <button>Edit</button>
                </Link>
              </td>
              <td>
                <button className="delete" onClick={() => deleteClub(item._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add/club">
        <button>Add Club</button>
      </Link>
    </>
  );
}
export default Clubs;
