import React, {useState, useEffect} from "react";
import axios from "axios";
import {baseUrl} from "../../assets/assets";
import "./Student.css";

const AddCourseModal = ({studentId, onClose, onSuccess}) => {
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState("");
    const [firstPaymentAmount, setFirstPaymentAmount] = useState(0);
    const [secondPaymentAmount, setSecondPaymentAmount] = useState(0);
    const [earlyBird, setEarlyBird] = useState(false);

    useEffect(() => {
        axios.get(`${baseUrl}courses`)
            .then(res => setCourses(res.data))
            .catch(err => console.error("Error fetching courses", err));
    }, []);

    const handleSubmit = () => {
        const payload = {
            firstPaymentAmount: parseFloat(firstPaymentAmount),
            secondPaymentAmount: parseFloat(secondPaymentAmount),
            course: parseInt(course),
            earlyBird: earlyBird
        };

        axios.post(`${baseUrl}students/${studentId}/`, payload)
            .then(() => {
                onSuccess(); // refresh parent data
                onClose();
            })
            .catch(err => console.error("Error adding course", err));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add Course</h2>
                <select value={course} onChange={(e) => setCourse(e.target.value)}>
                    <option value="">Select Course</option>
                    {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.courseName}</option>
                    ))}
                </select>
                <label>
                    First Payment
                    <input
                        type="number"
                        placeholder="First Payment Amount"
                        value={firstPaymentAmount}
                        onChange={(e) => setFirstPaymentAmount(e.target.value)}
                    /></label>
                <label>Second Payment
                <input
                    type="number"
                    placeholder="Second Payment Amount"
                    value={secondPaymentAmount}
                    onChange={(e) => setSecondPaymentAmount(e.target.value)}
                /></label>

                <label>Early Bird
                    <input
                        type="checkbox"
                        checked={earlyBird}
                        onChange={(e) => setEarlyBird(e.target.checked)}
                    />

                </label>

                <div className="modal-actions">
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddCourseModal;
