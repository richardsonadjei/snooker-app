import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const AllExpenseReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch data from the backend
      const response = await fetch(`/api/all-expen?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();

      if (response.ok) {
        setReportData(data);
      } else {
        console.error('Error fetching Expense Report:', data.error);
      }
    } catch (error) {
      console.error('Error fetching PE Report:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-4">Profit and Expense Report</h2>

          <Form onSubmit={handleFormSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="startDate">Start Date</Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    placeholder="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="endDate">End Date</Label>
                  <Input
                    type="date"
                    name="endDate"
                    id="endDate"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" type="submit">
              Generate Report
            </Button>
          </Form>

          {reportData && (
            <>
              {/* Report Table */}
              <h4 className="mt-4">Report</h4>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(reportData.totalExpenditure).map(([category, totalAmount]) => (
                    <tr key={category}>
                      <td>{category}</td>
                      <td>${totalAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Summary Report */}
              <h4 className="mt-4">Summary Report</h4>
              <Table responsive striped>
                <tbody>
                  <tr>
                    <td>Total Maintenance Expense</td>
                    <td>${reportData.totalExpenditure.maintenance}</td>
                  </tr>
                  <tr>
                    <td>Total Other Expense</td>
                    <td>${reportData.totalExpenditure.other}</td>
                  </tr>
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AllExpenseReport;
