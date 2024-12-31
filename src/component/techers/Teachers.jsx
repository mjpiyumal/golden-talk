import  { useState, useEffect } from "react";
import axios from "axios";
import "./Teacher.css"


const Teachers = () => {
    const [teachers, setTeachers] = useState([]); // State for teacher data
    const [filteredTeachers, setFilteredTeachers] = useState([]); // State for filtered data
    const [sectionFilter, setSectionFilter] = useState("PTE"); // Default section filter
    const [sectionIdFilter, setSectionIdFilter] = useState(""); // Filter for Section ID
    const [teacherIdFilter, setTeacherIdFilter] = useState(""); // Filter for Teacher ID
    const [editingTeacher, setEditingTeacher] = useState(null); // Track the teacher being edited

    // Fetch data from API
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get("http://localhost:9090/gt/api/v1/teachers");
                setTeachers(response.data);
                applyFilters(response.data);
            } catch (error) {
                console.error("Error fetching teacher data:", error);
            }
        };
        fetchTeachers();
    }, []);

    // Apply filters
    const applyFilters = (data) => {
        let filtered = data;

        // Apply section filter
        if (sectionFilter) {
            filtered = filtered.filter((teacher) => teacher.sectionName === sectionFilter);
        }

        // Apply Section ID filter
        if (sectionIdFilter) {
            filtered = filtered.filter((teacher) =>
                teacher.id.toString().includes(sectionIdFilter)
            );
        }

        // Apply Teacher ID filter
        if (teacherIdFilter) {
            filtered = filtered.filter((teacher) =>
                teacher.id.toString().includes(teacherIdFilter)
            );
        }

        setFilteredTeachers(filtered);
    };

    // Update filters whenever the state changes
    useEffect(() => {
        applyFilters(teachers);
    }, [sectionFilter, sectionIdFilter, teacherIdFilter, teachers]);

    // Handle update request
    const handleUpdateTeacher = async (updatedTeacher) => {
        try {
            const response = await axios.put(
                `http://localhost:9090/gt/api/v1/teachers/${updatedTeacher.id}`,
                updatedTeacher
            );
            alert("Teacher updated successfully!");
            const updatedTeachers = teachers.map((teacher) =>
                teacher.id === updatedTeacher.id ? response.data : teacher
            );
            setTeachers(updatedTeachers);
            setEditingTeacher(null); // Close the edit form
        } catch (error) {
            console.error("Error updating teacher:", error);
            alert("Failed to update teacher.");
        }
    };

    // Handle edit button click
    const handleEditClick = (teacher) => {
        setEditingTeacher({ ...teacher });
    };

    const handleFieldChange = (field, value) => {
        setEditingTeacher((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div style={{ padding: "20px", /*backgroundColor: "#f8f9fa",*/ minHeight: "100vh" }}>
            <h1 className='header'>Teachers - {sectionFilter}</h1>

            {/* Filter Section */}
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
                {/* Section Filter */}
                {["IELTS", "PTE", "OET"].map((section) => (
                    <button
                        key={section}
                        onClick={() => setSectionFilter(section)}
                        style={{
                            padding: "10px 20px",
                            margin: "0 10px",
                            cursor: "pointer",
                            backgroundColor: section === sectionFilter ? "#007bff" : "#e9ecef",
                            color: section === sectionFilter ? "white" : "black",
                            border: "none",
                            borderRadius: "5px",
                        }}
                    >
                        {section}
                    </button>
                ))}
                {/* Section ID Filter */}
                <input
                    type="text"
                    placeholder="Filter by Section ID"
                    value={sectionIdFilter}
                    onChange={(e) => setSectionIdFilter(e.target.value)}
                    style={styles.filterInput}
                />
                {/* Teacher ID Filter */}
                <input
                    type="text"
                    placeholder="Filter by Teacher ID"
                    value={teacherIdFilter}
                    onChange={(e) => setTeacherIdFilter(e.target.value)}
                    style={styles.filterInput}
                />
            </div>

            {/* Teachers Table */}
            <div style={{ overflowX: "auto", backgroundColor: "white", padding: "20px", borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                    <tr style={{ backgroundColor: "#f1f1f1" }}>
                        <th style={styles.tableHeader}>ID</th>
                        <th style={styles.tableHeader}>Name</th>
                        <th style={styles.tableHeader}>NIC</th>
                        <th style={styles.tableHeader}>Phone Number</th>
                        <th style={styles.tableHeader}>Section Name</th>
                        <th style={styles.tableHeader}>Courses</th>
                        <th style={styles.tableHeader}>Qualifications</th>
                        <th style={styles.tableHeader}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTeachers.length > 0 ? (
                        filteredTeachers.map((teacher) => (
                            <tr key={teacher.id}>
                                <td style={styles.tableCell}>{teacher.id}</td>
                                <td style={styles.tableCell}>{teacher.name}</td>
                                <td style={styles.tableCell}>{teacher.nic}</td>
                                <td style={styles.tableCell}>{teacher.phoneNumber}</td>
                                <td style={styles.tableCell}>{teacher.sectionName}</td>
                                <td style={styles.tableCell}>{teacher.courseNames.join(", ")}</td>
                                <td style={styles.tableCell}>{teacher.qualifications.join(", ")}</td>
                                <td style={styles.tableCell}>
                                    <button
                                        onClick={() => handleEditClick(teacher)}
                                        style={{ padding: "5px 10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" style={styles.noDataMessage}>
                                No teachers available for the selected filters.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Edit Form Modal */}
            {editingTeacher && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h2>Edit Teacher</h2>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={editingTeacher.name}
                                onChange={(e) => handleFieldChange("name", e.target.value)}
                            />
                        </label>
                        <label>
                            NIC:
                            <input
                                type="text"
                                value={editingTeacher.nic}
                                onChange={(e) => handleFieldChange("nic", e.target.value)}
                            />
                        </label>
                        <label>
                            Phone Number:
                            <input
                                type="text"
                                value={editingTeacher.phoneNumber}
                                onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
                            />
                        </label>
                        <label>
                            Section Name:
                            <select
                                value={editingTeacher.sectionName}
                                onChange={(e) => handleFieldChange("sectionName", e.target.value)}
                            >
                                <option value="IELTS">IELTS</option>
                                <option value="PTE">PTE</option>
                                <option value="OET">OET</option>
                            </select>
                        </label>
                        <button onClick={() => handleUpdateTeacher(editingTeacher)} style={styles.saveButton}>
                            Save
                        </button>
                        <button onClick={() => setEditingTeacher(null)} style={styles.cancelButton}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    filterInput: {
        padding: "8px",
        margin: "0 10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
    },
    tableHeader: {
        padding: "10px",
        borderBottom: "2px solid #ddd",
        fontWeight: "bold",
    },
    tableCell: {
        padding: "10px",
        borderBottom: "1px solid #ddd",
    },
    noDataMessage: {
        padding: "20px",
        textAlign: "center",
        color: "#888",
        fontStyle: "italic",
    },
    modal: {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "400px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    saveButton: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
    },
    cancelButton: {
        backgroundColor: "#ccc",
        color: "black",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginLeft: "10px",
        marginTop: "10px",
    },
};


export default Teachers
