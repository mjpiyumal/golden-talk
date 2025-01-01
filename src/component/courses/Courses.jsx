import React, {useEffect, useState} from "react";
import {useTable} from "react-table";
import axios from "axios";
import "./Course.css"
import {baseUrl} from "../../assets/assets.js";


const Courses = () => {
    const [data, setData] = useState([]);
    const [filterText, setFilterText] = useState("");

    // Fetch data from the endpoint
    useEffect(() => {
        axios
            .get(baseUrl+"courses")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    // Filter data based on Course ID
    const filteredData = data.filter(course =>
        course.id.toString().includes(filterText)
    );

    // Define columns
    const columns = React.useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Category",
                accessor: "category",
            },
            {
                Header: "Course Name",
                accessor: "courseName",
            },
            {
                Header: "Teacher Name",
                accessor: "teacherName",
                Cell: ({value}) => (value ? value : "Not Assigned"),
            },
            {
                Header: "Student Count",
                accessor: "studentCount",
            },
            {
                Header: "Course Fee",
                accessor: "courseFee",
                Cell: ({value}) => `Rs. ${value.toFixed(2)}`, // Format fee
            },
            {
                Header: "Installment Available",
                accessor: "installment",
                Cell: ({value}) => (value ? "Yes" : "No"),
            },
        ],
        []
    );

    // Initialize the table instance
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data: filteredData});

    return (
        <div className='headers' style={{padding: "53px", minHeight: "100vh"}}>
            {/*<h1 >Course Table</h1>*/}

            {/* Filter Section */}
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
                {/*<label htmlFor="filter">Filter by Course ID: </label>*/}
                <input
                    id="filter"
                    placeholder="Filter by Course ID"
                    type="text"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    style={{marginBottom: "10px", padding: "5px"}}
                />
            </div>

            <div style={{
                overflowX: "auto", backgroundColor: "white", padding: "20px", borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <table
                    {...getTableProps()}
                    style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
                >
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: "#f1f1f1" }}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    style={{
                                        borderBottom: "2px solid black",
                                        background: "#f2f2f2",
                                        padding: "8px",
                                    }}
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: "8px",
                                            border: "1px solid black",
                                        }}
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default Courses
