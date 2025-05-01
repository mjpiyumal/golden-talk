import React, {useState, useEffect} from "react";
import axios from "axios";
import {baseUrl} from "../../assets/assets";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Student.css";

const AddCourseModal = ({studentId, courseId, onClose, onSuccess}) => {
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

        if (!course) {
            toast.error("Please select a course before submitting.");
            return;
        }

        const payload = {
            firstPaymentAmount: parseFloat(firstPaymentAmount),
            secondPaymentAmount: parseFloat(secondPaymentAmount),
            course: parseInt(course),
            earlyBird: earlyBird
        };

        axios.post(`${baseUrl}students/${studentId}/courses/${course}`, payload)
            .then(() => {
                onSuccess(); // refresh parent data
                toast.success("Form submitted successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                onClose();
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    console.log("Error response:", err.response.data); // helpful for debugging

                    const { errorMessage } = err.response.data;
                    toast.error(errorMessage, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                } else {
                    console.error("Unexpected error", err);
                    toast.error("An unexpected error occurred. Please try again.");
                }
            });
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
            <ToastContainer/>
        </div>
    );
};

export default AddCourseModal;
