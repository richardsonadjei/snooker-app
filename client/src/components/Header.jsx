// Header.js
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute (60,000 milliseconds)

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Link to="/" className="logo-container">
          <Navbar.Brand className="logo d-flex align-items-center">
            <img
              src="/snooker logo.png" // Replace with the actual path to your logo
              alt="Logo"
              className="logo-img"
            />
            <span className="logo-text">Arty Snooker</span>
          </Navbar.Brand>
        </Link>

        {/* Date and time at the center of the vw (for smaller screens) */}
        <div className="current-date-time d-lg-none order-lg-2">
          {currentDateTime.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>

        {/* Date and time at the center of the vw (for larger screens) */}
        <div className="current-date-time d-none d-lg-block">
          {currentDateTime.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="menu-items justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/" className="text-dark">
              Home
            </Nav.Link>

            {/* Reports dropdown */}
            <NavDropdown title="Reports" id="reports-dropdown" className="text-dark">
              <NavDropdown.Item as={Link} to="/total-daily-sales">
                Total Daily Sales
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/sales-report-within-a-period">
                Sales Report
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/all-expense-report">
                Expenditure Report 
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/profit">
                Profit Report
              </NavDropdown.Item>
              {/* Add more reports as needed */}
            </NavDropdown>

            {/* Expense dropdown */}
            <NavDropdown title="Expense" id="expense-dropdown" className="text-dark">
              <NavDropdown.Item as={Link} to="/add-maintenance-expense">
                Record Maintenance Expenditure
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/add-other-expense">
              Record Other Expenditure
              </NavDropdown.Item>
              {/* Add more expense items as needed */}
            </NavDropdown>

            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/profile" className="text-dark">
                  <span>{currentUser.userName}</span>
                </Nav.Link>

                <Nav.Link as={Link} to="/sign-out" className="text-dark">
                  Sign Out
                </Nav.Link>

                {currentUser.role === 'ceo' && (
                  <Nav.Link as={Link} to="/sign-up" className="text-dark">
                    Create New User
                  </Nav.Link>
                )}
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/sign-in" className="text-dark">
                  Sign In
                </Nav.Link>

                {/* Show "Sign Up" only if the role is not "employee" or "manager" */}
                {currentUser?.role !== 'employee' && currentUser?.role !== 'manager' && (
                  <Nav.Link as={Link} to="/sign-up" className="text-dark">
                    Create New User
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
