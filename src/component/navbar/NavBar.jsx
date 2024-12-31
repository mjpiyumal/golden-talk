// import {useEffect, useState} from 'react'
import {images} from "../../assets/assets.js";
import './Navbar.css';
import {useState} from "react";
import {Link} from "react-router-dom";

const NavBar = () => {
    const [dropdown, setDropdown] = useState(null);

    const toggleDropdown = (menu) => {
        if (dropdown === menu) {
            setDropdown(null); // Close dropdown if already open
        } else {
            setDropdown(menu); // Open the clicked dropdown
        }
    };

    return (
        <nav className='nav-container'>
            <img src={images.logo} alt="Logo" className='logo'/>
            <ul className="nav-list">
                <li>
                    <Link to="/">
                        <img src={images.home} alt="home" className='home'/>
                    </Link>
                </li>
                <div className='list-align'>
                    {/*Students*/}
                    <li>
                        <li><Link to="/students">STUDENTS</Link></li>
                    </li>
                    {/*Teachers*/}
                    <li>
                        <li><Link to="/teachers">TEACHERS</Link></li>
                    </li>

                    {/*Courses*/}
                    <li
                        onMouseEnter={() => toggleDropdown("COURSES")}
                        onMouseLeave={() => toggleDropdown(null)}
                        className="nav-item"
                    >
                        <Link to="#">COURSES</Link>
                        {dropdown === "COURSES" && (
                            <ul className="dropdown-menu">
                                <li><Link to="/courses">All Courses</Link></li>
                                <li><Link to="/create-courses">Create New Course</Link></li>
                            </ul>
                        )}
                    </li>

                    {/* IELTS Dropdown */}
                    <li
                        onMouseEnter={() => toggleDropdown("IELTS")}
                        onMouseLeave={() => toggleDropdown(null)}
                        className="nav-item"
                    >
                        <Link to="#">IELTS</Link>
                        {dropdown === "IELTS" && (
                            <ul className="dropdown-menu">
                                <li><Link to="/student-register-ielts">Student Register</Link></li>
                                <li><Link to="/teacher-register-ielts">Teacher Register</Link></li>
                            </ul>
                        )}
                    </li>

                    {/* PTE Dropdown */}
                    <li
                        onMouseEnter={() => toggleDropdown("PTE")}
                        onMouseLeave={() => toggleDropdown(null)}
                        className="nav-item"
                    >
                        <Link to="#">PTE</Link>
                        {dropdown === "PTE" && (
                            <ul className="dropdown-menu">
                                <li><Link to="/student-register-pte">Student Register</Link></li>
                                <li><Link to="/teacher-register-pte">Teacher Register</Link></li>
                            </ul>
                        )}
                    </li>

                    {/*/!* OET Dropdown *!/*/}
                    <li
                        onMouseEnter={() => toggleDropdown("OET")}
                        onMouseLeave={() => toggleDropdown(null)}
                        className="nav-item"
                    >
                        <Link to="#">OET</Link>
                        {dropdown === "OET" && (
                            <ul className="dropdown-menu">
                                <li><Link to="/student-register-oet">Student Register</Link></li>
                                <li><Link to="/teacher-register-oet">Teacher Register</Link></li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <button className='btn'>Sign Up</button>
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default NavBar;
