import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const SalesReportWithinAPeriod = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salesReport, setSalesReport] = useState([]);
  const [summaryReport, setSummaryReport] = useState({
    totalGamesSold: 0,
    totalAmount: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch sales report within the specified period
      const response = await fetch(`/api/sales-within-period?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();

      if (response.ok) {
        setSalesReport(data.data);

        // Calculate summary report
        const summary = data.data.reduce(
          (acc, sale) => {
            acc.totalGamesSold += sale.numberOfGames;
            acc.totalAmount += sale.totalAmount;
            return acc;
          },
          { totalGamesSold: 0, totalAmount: 0 }
        );

        setSummaryReport(summary);
      } else {
        console.error('Error fetching sales report within period:', data.message);
      }
    } catch (error) {
      console.error('Error fetching sales report within period:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-4">Sales Report Within a Period</h2>
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="startDate">Start Date</Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
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
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" type="submit">
              Generate Report
            </Button>
          </Form>

          {salesReport.length > 0 && (
            <>
              <h4 className="mt-4">Sales Report</h4>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Game ID</th>
                    <th>Number of Games</th>
                    <th>Total Amount</th>
                    <th>Recorded By</th>
                  </tr>
                </thead>
                <tbody>
                  {salesReport.map((sale, index) => (
                    <tr key={sale._id}>
                      <td>{index + 1}</td>
                      <td>{sale.transactionID}</td>
                      <td>{sale.numberOfGames}</td>
                      <td>{sale.totalAmount}</td>
                      <td>{sale.recordedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <h4 className="mt-4">Summary Report</h4>
              <Table responsive striped>
                <tbody>
                  <tr>
                    <td>Total Games</td>
                    <td>{summaryReport.totalGamesSold}</td>
                  </tr>
                  <tr>
                    <td>Total Amount</td>
                    <td>{summaryReport.totalAmount}</td>
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

export default SalesReportWithinAPeriod;
