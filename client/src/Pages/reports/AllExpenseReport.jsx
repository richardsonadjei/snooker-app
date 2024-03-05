import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Form, FormGroup } from 'reactstrap';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

const AllExpenseRecord = () => {
  const [maintenanceExpenses, setMaintenanceExpenses] = useState([]);
  const [otherExpenses, setOtherExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Fetch expenses data
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      // Check if both startDate and endDate are valid dates
      if (!isNaN(Date.parse(startDate)) && !isNaN(Date.parse(endDate))) {
        // Perform API call to fetch expenses
        const response = await fetch(`/api/all-expenses?startDate=${startDate}&endDate=${endDate}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch expenses. Status: ${response.status}`);
        }
        
        const data = await response.json();
        setMaintenanceExpenses(data.maintenanceExpenses || []);
        setOtherExpenses(data.otherExpenses || []);
      } else {
        console.error('Invalid date format for startDate or endDate');
      }
    } catch (error) {
      console.error('Error fetching expenses:', error.message);
    }
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const handleEditClick = (expense) => {
    setSelectedExpense(expense);
    toggleEditModal();
  };

  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    toggleDeleteModal();
  };

  const handleEditSubmit = async () => {
    try {
      // Perform API call to update expense
      const response = await fetch(`/api/update-expense/${selectedExpense._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedExpense),
      });

      if (!response.ok) {
        throw new Error('Failed to update expense');
      }

      console.log('Editing expense:', selectedExpense);
      toggleEditModal();
      fetchExpenses(); // Fetch updated expenses data
    } catch (error) {
      console.error('Error editing expense:', error.message);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      // Determine the category based on the selectedExpense
      const category = selectedExpense.category;
  
      // Perform API call to delete expense
      const response = await fetch(`/api/delete-expense/${selectedExpense._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category }), // Include the category field in the request body
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }
  
     
      toggleDeleteModal();
      fetchExpenses(); // Fetch updated expenses data
    } catch (error) {
      console.error('Error deleting expense:', error.message);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h2 className="my-3 text-center">All Expense Records</h2>
          <div className="d-flex justify-content-center">
            <div className="form-inline">
              <div className="form-group mr-2">
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="date"
                  id="startDate"
                  className="form-control ml-2"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="form-group mr-2">
                <label htmlFor="endDate">End Date:</label>
                <input
                  type="date"
                  id="endDate"
                  className="form-control ml-2"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={fetchExpenses}>Search</button>
            </div>
          </div>
          {maintenanceExpenses.length > 0 && (
            <div className="table-responsive mt-3">
              <h3 className="text-center">Maintenance Expenses</h3>
              <table className="table table-bordered">
                {/* Table Header */}
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Expense Type</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {maintenanceExpenses.map((expense, index) => (
                    <tr key={expense._id}>
                      <td>{index + 1}</td>
                      <td>{formatDate(expense.date)}</td>
                      <td>{expense.type}</td>
                      <td>{expense.amount}</td>
                      <td>
                        <BsPencilSquare className="edit-icon" onClick={() => handleEditClick(expense)} />
                        <BsTrash className="delete-icon ml-2" onClick={() => handleDeleteClick(expense)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {otherExpenses.length > 0 && (
            <div className="table-responsive mt-3">
              <h3 className="text-center">Other Expenses</h3>
              <table className="table table-bordered">
                {/* Table Header */}
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>purchasedBy</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                  {otherExpenses.map((expense, index) => (
                    <tr key={expense._id}>
                      <td>{index + 1}</td>
                      <td>{formatDate(expense.date)}</td>
                      <td>{expense.description}</td>
                      <td>{expense.amount}</td>
                      <td>{expense.purchasedBy}</td>
                      <td>
                        <BsPencilSquare className="edit-icon" onClick={() => handleEditClick(expense)} />
                        <BsTrash className="delete-icon ml-2" onClick={() => handleDeleteClick(expense)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Expense</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                type="date"
                name="date"
                id="date"
                value={selectedExpense?.date || ''}
                onChange={(e) => setSelectedExpense({ ...selectedExpense, date: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="type">Expense Type</Label>
              <Input
                type="text"
                name="type"
                id="type"
                value={selectedExpense?.type || ''}
                onChange={(e) => setSelectedExpense({ ...selectedExpense, type: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="amount">Amount</Label>
              <Input
                type="number"
                name="amount"
                id="amount"
                value={selectedExpense?.amount || ''}
                onChange={(e) => setSelectedExpense({ ...selectedExpense, amount: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
  <Label for="description">Description</Label>
  <Input
    type="text"
    name="description"
    id="description"
    value={selectedExpense?.description || ''}
    onChange={(e) => setSelectedExpense({ ...selectedExpense, description: e.target.value })}
  />
</FormGroup>
<FormGroup>
  <Label for="purchasedBy">Purchased By</Label>
  <Input
    type="text"
    name="purchasedBy"
    id="purchasedBy"
    value={selectedExpense?.purchasedBy || ''}
    onChange={(e) => setSelectedExpense({ ...selectedExpense, purchasedBy: e.target.value })}
  />
</FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEditSubmit}>Save</Button>
          <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModalOpen} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Delete Expense</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this expense?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDeleteSubmit}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllExpenseRecord;
