//import React from 'react'
import { Route, Routes } from "react-router";

//components


import Staff from "./components/Stafftable.jsx";
import Nav from "./components/Nav.jsx";
import Clubs from "./components/Clubs.jsx";
import Courses from "./components/Courses.jsx";
import StudentTable from "./components/students.jsx";
import AddDepartment from "./components/AddDepartment.jsx";
import EditDepartment from "./components/EditDepartment.jsx";
import Departments from "./components/Departments.jsx";
import AddClub from "./components/AddClub.jsx";
import AddCoures from "./components/AddCoures.jsx";
import EditStaff from "./components/EditStaff.jsx";
import AddStaff from "./components/AddStaff.jsx";
import EditClub from "./components/EditClub.jsx";
import Student from './components/AddStudent.jsx';
import EditStudent from './components/EditStudent.jsx'

function App() {
  return (
    <>
      <div className="main">
        <Nav />
        <div className="view">

          <Routes>
          
            <Route path="/staff/:id" element={<EditStaff />} />
            <Route path="/AddStaff" element={<AddStaff />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/students" element={<StudentTable />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/clubs/:id" element={<EditClub />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/:id" element={<EditDepartment />} />
            <Route path="/AddDepartment" element={<AddDepartment />} />
            <Route path="/add/club" element={<AddClub />} />
            <Route path="/AddCoures" element={<AddCoures />} />
            <Route path='/AddStudent' element={<Student/>} />
            <Route path='/student/:id' element={<EditStudent />} />

          </Routes>


        </div>
      </div>


    </>
  );
}

export default App;
