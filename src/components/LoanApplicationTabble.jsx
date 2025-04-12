import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
  } from '@mui/material';
  
  // Sample loan application type
  /**
   * @typedef {Object} LoanApplication
   * @property {number} id
   * @property {string} name
   * @property {number} amount
   * @property {'pending' | 'approved' | 'rejected'} status
   * @property {string} date
   */
  
  // Sample mock data (replace with real API later)
  const mockData = [
    {
      id: 1,
      name: 'John Doe',
      amount: 5000,
      status: 'approved',
      date: '2025-04-10',
    },
    {
      id: 2,
      name: 'Jane Smith',
      amount: 7500,
      status: 'pending',
      date: '2025-04-09',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      amount: 10000,
      status: 'rejected',
      date: '2025-04-08',
    },
  ];
  
  export default function LoanApplicationsTable() {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Loan Applications
        </Typography>
  
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Applicant Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Application Date</TableCell>
              </TableRow>
            </TableHead>
  
            <TableBody>
              {mockData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>${row.amount.toLocaleString()}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
  