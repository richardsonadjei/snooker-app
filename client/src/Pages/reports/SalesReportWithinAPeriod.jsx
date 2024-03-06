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
        const groupedSales = groupSalesByDate(data.data);
        setSalesReport(groupedSales);

        // Calculate summary report
        const summary = groupedSales.reduce(
          (acc, salesByDate) => {
            acc.totalGamesSold += salesByDate.totalGamesSold;
            acc.totalAmount += salesByDate.totalAmount;
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

  const groupSalesByDate = (salesData) => {
    const groupedSales = {};
    salesData.forEach((sale) => {
      const saleDate = new Date(sale.saleDate);
      const formattedDate = saleDate.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      if (!groupedSales[formattedDate]) {
        groupedSales[formattedDate] = [];
      }
      groupedSales[formattedDate].push(sale);
    });

    // Calculate total games sold and total amount for each date
    return Object.entries(groupedSales).map(([date, sales]) => {
      const totalGamesSold = sales.reduce((acc, sale) => acc + sale.numberOfGames, 0);
      const totalAmount = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);
      return { date, sales, totalGamesSold, totalAmount };
    });
  };

  const formatDateRange = () => {
    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      const startDateFormatted = startDateObj.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const endDateFormatted = endDateObj.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      return `Sales Report for ${startDateFormatted} till ${endDateFormatted}`;
    }
    return '';
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-4">{formatDateRange()}</h2>
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
              {salesReport.map((salesByDate) => (
                <div key={salesByDate.date} style={{ margin: '20px 0', border: '1px solid #ccc', padding: '10px' }}>
                  <h4 className="mt-4">Sales for {salesByDate.date}</h4>
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
                      {salesByDate.sales.map((sale, index) => (
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
                  <h4>Total Games: {salesByDate.totalGamesSold}</h4>
                  <h4>Total Amount: {salesByDate.totalAmount}</h4>
                </div>
              ))}
              <div className="summary-report text-center" style={{ color: 'blue !important' }}>
                <h4 className="mt-4"><strong>Summary Report</strong></h4>
                <Table responsive striped>
                  <tbody>
                    <tr>
                      <td>Total Games</td>
                      <td><strong>{summaryReport.totalGamesSold}</strong></td>
                    </tr>
                    <tr>
                      <td>Total Amount</td>
                      <td><strong>{summaryReport.totalAmount}</strong></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SalesReportWithinAPeriod;
