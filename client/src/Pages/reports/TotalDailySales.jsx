import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';

const TotalDailySalesReport = () => {
  const [totalSales, setTotalSales] = useState([]);
  const [summaryReport, setSummaryReport] = useState({
    totalGamesSold: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    // Fetch total daily sales report and summary on component mount
    fetchTotalDailySalesReport();
  }, []);

  const fetchTotalDailySalesReport = async () => {
    try {
      // Fetch total daily sales report
      const response = await fetch('/api/sales-today');
      const data = await response.json();

      if (response.ok) {
        setTotalSales(data.data);

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
        console.error('Error fetching total daily sales report:', data.message);
      }
    } catch (error) {
      console.error('Error fetching total daily sales report:', error);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
        <h2 className="mb-4">Sales made for {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</h2>


          {/* Total Sales Table */}
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
              {totalSales.map((sale, index) => (
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

          {/* Summary Report */}
          <h4 className="mt-4">Summary Report</h4>
          <Table responsive striped>
            <tbody>
              <tr>
                <td>Total Games Played</td>
                <td>{summaryReport.totalGamesSold}</td>
              </tr>
              <tr>
                <td>Total Sales</td>
                <td>{summaryReport.totalAmount}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default TotalDailySalesReport;
