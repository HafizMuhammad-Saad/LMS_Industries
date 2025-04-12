import LoanSummaryCard from '../components/LoanSummaryCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function DashboardOverview() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3 }}>
      <LoanSummaryCard
        title="Total Portfolio"
        value="$2.4M"
        icon={AccountBalanceIcon}
        color="primary"
        trend={{ value: 12.5, text: 'vs last month' }}
      />
      
      <LoanSummaryCard
        title="Active Loans"
        value="142"
        icon={ReceiptIcon}
        color="success"
        subtitle="32 awaiting approval"
      />
      
      <LoanSummaryCard
        title="Delinquency Rate"
        value="4.2%"
        icon={TrendingUpIcon}
        color="error"
        trend={{ value: -1.8 }}
      />
    </Box>
  );
}