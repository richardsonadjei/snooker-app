import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const CreateNewUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    telephoneNumber: '',
    role: 'employee', // Default role
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/create-new-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('User registered successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          window.alert('User registered successfully!');
          window.location.href = '/sign-in';
        }, 3000);
      } else {
        setErrorMessage(data.message);
        setTimeout(() => {
          setErrorMessage('');
          window.alert(`Error: ${data.message}`);
          window.location.reload();
        }, );
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('An error occurred. Please try again.');
      setTimeout(() => {
        setErrorMessage('');
        window.alert('An error occurred. Please try again.');
        window.location.reload();
      }, );
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <h2 className="text-black mb-4">Sign Up</h2>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="name" className="text-black">Full Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="userName" className="text-black">Username</Label>
                  <Input
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="Enter your username"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="email" className="text-black">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="password" className="text-black">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="confirmPassword" className="text-black">Confirm Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="telephoneNumber" className="text-black">Telephone Number</Label>
                  <Input
                    type="text"
                    name="telephoneNumber"
                    id="telephoneNumber"
                    placeholder="Enter your telephone number"
                    value={formData.telephoneNumber}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="role" className="text-black">Role</Label>
                  <Input
                    type="select"
                    name="role"
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="ceo">CEO</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <Button color="primary" type="submit">Sign Up</Button>
          </Form>

          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateNewUser;
