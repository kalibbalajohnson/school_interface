import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../index.css';


function StudentTable() {
    const [students, setStudents] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    //------------- GET -----------------
    useEffect(() => {
        // Fetch students data from the API and set it to the students state
        fetch('https://schoolapi-op58.onrender.com/v1/students')
            .then((response) => response.json())
            .then((data) => setStudents(data))
            .catch((error) => console.error('Error fetching students:', error));
    }, []);

    //------------- GET BY ID ---------------
    useEffect(() => {
        // If there's no search query, no data fetched
        if (!searchQuery) {
            setSearchResults([]); // Clear search results when search query is empty
            return;
        }

        fetch(`https://schoolapi-op58.onrender.com/v1/students/${searchQuery}`)
            .then((response) => response.json())
            .then((data) => {
                setSearchResults(data ? [data] : []); // Wrap the single student object in an array
            })
            .catch((error) => {
                console.error('Error fetching student details:', error);
                setSearchResults([]); // Set empty array to indicate no matching student found
            });
    }, [searchQuery]);


    //---------------- DELETE -------------------
    const handleDelete = (id) => {
        // Delete student with the given ID from the API
        fetch(`https://schoolapi-op58.onrender.com/v1/students/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                // If the delete was successful, update the students state without the deleted student
                if (data.message === 'Student deleted successfully') {
                    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
                }
            })
            .catch((error) => console.error('Error deleting student:', error));
    };



    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} className="form-inline mb-3" style={{ width: 500, marginLeft: 320 }}>
                <div className="form-group mx-sm-3 mb-2">
                    {/* <label htmlFor="searchQuery" className="sr-only">Search by ID</label> */}
                    <input
                        type="text"
                        id="searchQuery"
                        className="form-control"
                        placeholder="Search Student by ID"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {/* <button type="submit" className="btn btn-primary mb-2">Search</button> */}
            </form>
            <br />
            <table >
                <thead >
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Second Name</th>
                        <th>Gender</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.length > 0
                        ? searchResults.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.firstName}</td>
                                <td>{student.secondName}</td>
                                <td>{student.gender}</td>
                                <td>
                                    <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDelete(student.id)}>Delete</button>
                                </td>
                                <td>
                                    {/* <button style={{backgroundColor: 'orange', color: 'black'}} onClick={() => handleEdit(student.id)}>Edit</button> */}
                                    <Link to={`/student/${student.id}`}><button style={{ backgroundColor: 'orange', color: 'black' }} >Edit</button></Link>
                                </td>
                            </tr>
                        ))
                        : students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.firstName}</td>
                                <td>{student.secondName}</td>
                                <td>{student.gender}</td>
                                <td>
                                    <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDelete(student.id)}>Delete</button>
                                </td>
                                <td>
                                    <Link to={`/student/${student.id}`}><button style={{ backgroundColor: 'orange', color: 'black' }} >Edit</button></Link>
                                    {/* <button style={{backgroundColor: 'orange', color: 'black'}} onClick={() => handleEdit(student.id)}>Edit</button> */}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <button style={{ marginLeft: 50, backgroundColor: 'green' }}>
                <Link style={{ color: 'white', textDecoration: 'none' }} to="/AddStudent" className="btn btn-success">+ Add </Link>
            </button>

        </>
    );
}


export default StudentTable;
