import '../index.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Heading from './from/Heading.jsx'
// import Radio from './from/Radio.jsx'

function Student() {
    const initialFormData = {
        id: '',
        firstName: '',
        secondName: '',
        gender: '',
    };


    const [formData, setFormData] = useState(initialFormData);

    const resetForm = () => {
        setFormData(initialFormData);
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('https://schoolapi-op58.onrender.com/v1/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                resetForm();

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <div className='col' >
                <h2 style={{ marginLeft: 590 }}> Student </h2>
                <hr />
                <br />

                <Heading heading="Fill in to add new Student" />

                <form onSubmit={handleSubmit}  >
                    <div>

                        <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder=" Enter ID" />
                    </div>
                    <div>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder=" EnterFirst Name" />
                    </div>
                    <div>

                        <input type="text" name="secondName" value={formData.secondName} onChange={handleChange} placeholder=" Enter Second Name" />
                    </div>
                    

                        <div>
                            Male
                            <input type="radio" name="gender" value="male"  onChange={handleChange}  />
                            Female
                            <input type="radio" name="gender" value="female"  onChange={handleChange}  />
                        </div>

                        {/* <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder=" Enter Gender" /> */}
                  
<br/>
                    <button style={{ backgroundColor: 'green', color: 'white' }} type="submit" > Register </button>

                    <button style={{ marginLeft: 30, backgroundColor: 'red' }}>
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/Students" className="btn btn-success"> Cancel </Link>
                    </button>
                </form>
            </div>


        </>
    );
}

export default Student