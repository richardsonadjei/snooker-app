import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

const SalesAndExpensesWithinPeriod = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salesAndExpenses, setSalesAndExpenses] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/get-sales-and-expenses?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      const data = await response.json();
      setSalesAndExpenses(data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      fetchData();
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  const handleSubmit = () => {
    setFormSubmitted(true);
  };

  // Function to format date as "Monday 7th January 2024"
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate total sales amount
  const totalSalesAmount = salesAndExpenses ? salesAndExpenses.sales.reduce((acc, sale) => acc + sale.totalAmount, 0) : 0;

  // Calculate total expenses amount
  const totalExpensesAmount = salesAndExpenses ?
    salesAndExpenses.maintenanceExpenses.reduce((acc, expense) => acc + expense.amount, 0) +
    salesAndExpenses.otherExpenses.reduce((acc, expense) => acc + expense.amount, 0)
    : 0;

  // Calculate profit
  const profit = totalSalesAmount - totalExpensesAmount;

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h2 className="my-3 text-center">Sales and Expenses Within Period</h2>
          <div className="date-inputs d-flex justify-content-center">
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
              <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
          {loading && <div className="text-center mt-3">Loading...</div>}
          {error && <div className="text-center mt-3">Error: {error}</div>}
          {salesAndExpenses && (
            <div className="table-container">
              <div className="profit">
                <h3>Profit</h3>
                <p>Total Sales: <span style={{ color: 'blue', fontWeight: 'bold' }}>{totalSalesAmount}</span></p>
                <p>Total Expenses: <span style={{ color: 'red', fontWeight: 'bold' }}>{totalExpensesAmount}</span></p>
                <p style={{ color: 'green', fontWeight: 'bold' }}>Profit: {profit}</p>
              </div>
              <div className="sales-table">
                <h3 style={{ color: 'blue', fontWeight: 'bold', fontSize: '1.2em' }}>All Sales</h3>
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesAndExpenses.sales && salesAndExpenses.sales.map((sale, index) => (
                      <tr key={index}>
                        <td>{formatDate(sale.createdAt)}</td>
                        <td>{sale.totalAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="expenses-table">
                <h3 style={{ color: 'red', fontWeight: 'bold', fontSize: '1.2em' }}>All Expenses</h3>
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesAndExpenses.maintenanceExpenses && salesAndExpenses.maintenanceExpenses.map((expense, index) => (
                      <tr key={index}>
                        <td>{formatDate(expense.date)}</td>
                        <td>{expense.amount}</td>
                        <td>Maintenance Expense</td>
                      </tr>
                    ))}
                    {salesAndExpenses.otherExpenses && salesAndExpenses.otherExpenses.map((expense, index) => (
                      <tr key={index}>
                        <td>{formatDate(expense.date)}</td>
                        <td>{expense.amount}</td>
                        <td>Other Expense</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SalesAndExpensesWithinPeriod;
