// Home.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input, Alert, Modal, ModalHeader, ModalBody } from 'reactstrap';

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [saleAmount, setSaleAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [saleData, setSaleData] = useState(null);

  const handleSaleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/add-snooker-sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numberOfGames: parseInt(saleAmount, 10),
          recordedBy: currentUser ? currentUser.userName : '',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Sale recorded successfully');

        // Set the sale data and show modal after 3 seconds
        setTimeout(() => {
          // Use the correct data structure
          setSaleData(data.data);
          setShowModal(true);
        }, 1000);

        setSaleAmount('');
      } else {
        setErrorMessage(`Error: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error recording sale:', error);
      setErrorMessage('Internal Server Error');
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleModalClosed = () => {
    setShowModal(false);
    setSaleAmount('');
    setSuccessMessage(null);
    setErrorMessage(null);

    // Reload the home page
    window.location.reload();
  };

  useEffect(() => {
    // Add event listener for modal close event
    const modalElement = document.querySelector('.modal-custom-style');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', handleModalClosed);
    }

    return () => {
      // Remove event listener on component unmount
      if (modalElement) {
        modalElement.removeEventListener('hidden.bs.modal', handleModalClosed);
      }
    };
  }, []);

  return (
    <div className="home-container">
      <div className="mb-4">
        <Card className="custom-card-style">
          <CardBody >
            <CardTitle tag="h5">Record Sale</CardTitle>
            {successMessage && <Alert color="success" className="mt-3">{successMessage}</Alert>}
            {errorMessage && <Alert color="danger" className="mt-3">{errorMessage}</Alert>}
            <Form onSubmit={handleSaleSubmit}>
              <FormGroup>
                <Label for="saleAmount">Number of Games</Label>
                <Input
                  type="number"
                  name="saleAmount"
                  id="saleAmount"
                  value={saleAmount}
                  onChange={(e) => setSaleAmount(e.target.value)}
                  className="custom-input-style"
                />
              </FormGroup>

              {/* Added Recorded By field */}
              <FormGroup>
                <Label for="recordedBy">Recorded By</Label>
                <Input
                  type="text"
                  name="recordedBy"
                  id="recordedBy"
                  value={currentUser ? currentUser.userName : ''}
                  readOnly
                  className="custom-input-style"
                />
              </FormGroup>

              <Button color="primary" type="submit">
                Record Sale
              </Button>
            </Form>
          
          </CardBody>
        </Card>
      </div>

      {/* Modal for showing sale data */}
      <Modal isOpen={showModal} toggle={toggleModal} className="modal-custom-style" onClosed={handleModalClosed}>
  <ModalHeader toggle={toggleModal}>Game Details</ModalHeader>
  <ModalBody>
    {/* Render the sale data here */}
    {saleData && (
      <>
        <p>Game ID: {saleData.transactionID}</p>
        <p>Number of Games: {saleData.numberOfGames}</p>
        <p>Total Amount: {saleData.totalAmount}</p>
        <p>Recorded By: {saleData.recordedBy}</p>
        {/* Add more details as needed */}
      </>
    )}
  </ModalBody>
</Modal>

    </div>
  );
};

export default Home;
