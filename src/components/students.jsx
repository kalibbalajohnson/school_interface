import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

function StudentTable() {
    const [students, setStudents] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editStudent, setEditStudent] = useState(null); // New state variable to hold the student being edited


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
        // If there's no search query, do not fetch any data
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

    // ----------------- PUT -------------------
    const handleEdit = (id) => {
        // Find the student to be edited from the students or searchResults array
        const studentToEdit = students.find((student) => student.id === id) || searchResults.find((student) => student.id === id);

        if (studentToEdit) {
            // Set the student data to the editStudent state variable
            setEditStudent(studentToEdit);
        }
    };


    const handleEditSubmit = (event) => {
        event.preventDefault();

        // Send a PUT request to update the student's information
        fetch(`https://schoolapi-op58.onrender.com/v1/students/${editStudent.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editStudent),
        })
            .then((response) => response.json())
            .then((data) => {
                // If the update was successful, refresh the students data
                if (data.message === 'Student updated successfully') {
                    fetch('https://schoolapi-op58.onrender.com/v1/students')
                        .then((response) => response.json())
                        .then((data) => {
                            setStudents(data);
                            setEditStudent(null); // Clear the editStudent state variable
                        })
                        .catch((error) => console.error('Error fetching students:', error));
                }
            })
            .catch((error) => console.error('Error updating student:', error));
    };

    return (
        <>
            <br />

            <h2 style={{ marginLeft: 520 }}>Students Table</h2>
            <hr />
            {editStudent && (
                <form onSubmit={handleEditSubmit}>
                    <h2>Edit Student</h2>
                    <div className="form-group">
                        <label htmlFor="editId">ID</label>
                        <input
                            type="text"
                            id="editId"
                            className="form-control"
                            value={editStudent.id}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editFirstName">First Name</label>
                        <input
                            type="text"
                            id="editFirstName"
                            className="form-control"
                            value={editStudent.firstName}
                            onChange={(e) => setEditStudent({ ...editStudent, firstName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editSecondName">Second Name</label>
                        <input
                            type="text"
                            id="editSecondName"
                            className="form-control"
                            value={editStudent.secondName}
                            onChange={(e) => setEditStudent({ ...editStudent, secondName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editGender">Gender</label>
                        <input
                            type="text"
                            id="editGender"
                            className="form-control"
                            value={editStudent.gender}
                            onChange={(e) => setEditStudent({ ...editStudent, gender: e.target.value })}
                        />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setEditStudent(null)}>Cancel</button>
                </form>
            )}


            <br />

            <form onSubmit={(e) => e.preventDefault()} className="form-inline mb-3" style={{ width: 500, marginLeft: 510 }}>
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
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
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
                                    <button className="btn btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
                                </td>
                                <td>
                                    <button className="btn btn-dark" onClick={() => handleEdit(student.id)}>Edit</button>
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
                                    <button  onClick={() => handleDelete(student.id)}>Delete</button>
                                </td>
                                <td>
                                    <button style={{backgroundColor: 'orange', color: 'black'}} onClick={() => handleEdit(student.id)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <button style={{ marginLeft: 50, backgroundColor:'green'}}>
                <Link style={{color:'white', textDecoration:'none'}} to="/AddStudent" className="btn btn-success">+ Add </Link>
            </button>

        </>
    );
}


export default StudentTable;
