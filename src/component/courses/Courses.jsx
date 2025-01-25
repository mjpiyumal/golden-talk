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

            <div className='course-table-container'>
                <h1 className='header-style-1'> Course Details</h1>
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
                <table {...getTableProps()} className='course-table'>
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: "#f1f1f1" }}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    key={column.id || column.accessor} // Explicitly assign key
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
                        const {key, ...rowProps} = row.getRowProps(); // Extract and remove 'key' from props
                        return (
                            <tr key={key} {...rowProps}>
                                {row.cells.map((cell) => {
                                    const {key: cellKey, ...cellProps} = cell.getCellProps(); // Do the same for cells
                                    return (
                                        <td key={cellKey} {...cellProps}
                                            style={{padding: "8px", border: "1px solid black"}}>
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
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
