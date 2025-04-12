import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Link } from 'react-router';
import {
  Account,
  AccountPreview,
  AccountPopoverFooter,
  // SignOutButton,
} from '@toolpad/core/Account';
import SignOutButton from '../components/SignOutButton';
import {useContext} from 'react'
import {AuthContext} from '../context/Context'
import { Navigate } from 'react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { PackageIcon, UserIcon,} from 'lucide-react';
import HorizontalLinearStepper from '@/components/Stepper';
// import DataTable from '@/components/table';
import { GridAddIcon } from '@mui/x-data-grid';
import { Grid } from 'lucide-react';

// import { DashboardOverview } from './DashboardOverview';
import LoanSummaryCard from '@/components/LoanSummaryCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LoanApplicationsTable from '../components/LoanApplicationTabble';
import LoanApplicationStepper from '../components/LoanApplicationStepper';


const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'loanrequest',
    title: 'My Loan Requests',
    icon: <PackageIcon />,
  },
  {
    segment: 'newloan',
    title: 'New Loan',
    icon: <GridAddIcon />,
  },
  {
    segment: 'profile',
    title: 'Profile',
    icon: <UserIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});




// import LoanApplicationsTable from './LoanApplicationsTable';
// import LoanApplicationStepper from './LoanApplicationStepper';

export function DemoPageContent({ pathname }) {

  const {user} = useContext(AuthContext)
  return (
    <Box sx={{ p: 3 }}>
      {pathname === '/dashboard' && (
        <>
          <Typography variant="h3" gutterBottom>
            Dashboard Overview 
            {/* change color of name */}
            <span style={{ color: '#1E88E5', fontWeight: 'bold', marginLeft: '8px' }}> 
            {user?.user_metadata?.full_name || user?.email}

            </span>
          </Typography>

          <Typography variant="p" gutterBottom>
            Welcome to the Loan Management System. Here you can manage your loans and requests. 
            Please select an option from the sidebar.
          </Typography>

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
        </>
      )}

      {pathname === '/loanrequest' && (
        <LoanApplicationsTable />
      )}

      {pathname === '/newloan' && (
        <LoanApplicationStepper />
      )}

      {pathname === '/profile' && (
        <Stack spacing={2}>
          <Typography variant="h4" gutterBottom>
            Profile
            </Typography>
          <Typography variant="h5" gutterBottom>
            Name: {user?.user_metadata?.full_name || user?.email}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Email: {user?.email}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Role: {user?.role || 'Loan Officer'}
            </Typography>
          <Typography variant="h5" gutterBottom>
            Last login: {new Date().toLocaleDateString()}
          </Typography>
         
          </Stack>
)}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function AccountSidebarPreview(props) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? 'condensed' : 'expanded'}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

AccountSidebarPreview.propTypes = {
  /**
   * The handler used when the preview is expanded
   */
  handleClick: PropTypes.func,
  mini: PropTypes.bool.isRequired,
  /**
   * The state of the Account popover
   * @default false
   */
  open: PropTypes.bool,
};

// const accounts = [
//   {
//     id: 1,
//     name: 'Bharat Kashyap',
//     email: 'bharatkashyap@outlook.com',
//     image: 'https://avatars.githubusercontent.com/u/19550456',
//     projects: [
//       {
//         id: 3,
//         title: 'Project X',
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: 'Bharat MUI',
//     email: 'bharat@mui.com',
//     color: '#8B4513', // Brown color
//     projects: [{ id: 4, title: 'Project A' }],
//   },
// ];


function SidebarFooterAccountPopover() {
  const {user , session} = useContext(AuthContext)

  const account = {
    id: user?.id,
    name: user?.user_metadata?.full_name || user?.email,
    email: user?.email,
    color: '#1E88E5',
    image: user?.user_metadata?.avatar_url || '',
  }
  console.log("account", account);
  

  return (
    

      <Stack direction="column">
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2">{user?.role || 'Loan Officer'}</Typography>
          <Typography variant="caption">Last login: {new Date().toLocaleDateString()}</Typography>
        </Box>
        <Divider />
        
        {/* Rest of account popover */}
        <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Account
      </Typography>
      <MenuList>
          <MenuItem
            key={account.id}
            component="button"
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              columnGap: 2,
            }}
          >
            <ListItemIcon>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.95rem',
                  bgcolor: account.color,
                }}
                src={account.image}
                alt={account.name}
              >
                {account?.name[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
              }}
              primary={account.name}
              secondary={account.email}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </MenuItem>
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton/>
      </AccountPopoverFooter>
    </Stack>
        
      </Stack>
    );
}

const createPreviewComponent = (mini) => {
  function PreviewComponent(props) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};

function SidebarFooterAccount({ mini }) {
  const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: SidebarFooterAccountPopover,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: 'left', vertical: 'bottom' },
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                mt: 1,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
}

SidebarFooterAccount.propTypes = {
  mini: PropTypes.bool.isRequired,
};

const demoSession = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
  },
};

function DashboardLayoutBasic(props) {
  const { window } = props;
  const myContext  = useContext(AuthContext)
  const {user, setUser, session, setSession} = myContext
  

  const [pathname, setPathname] = React.useState('/dashboard');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user || null)
    })
  
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user || null)
    })
  
    return () => subscription.unsubscribe()
  }, [])

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  // const [session, setSession] = React.useState(demoSession);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        // setSession(session);
      },
      signOut: async () => {
        await supabase.auth.signOut()
        setSession(null)
        setUser(null)
        Navigate('/authsignin');
      },
    };
  }, []);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      authentication={authentication}
      session={session}
    >
      <DashboardLayout
        slots={{ toolbarAccount: () => null, sidebarFooter: SidebarFooterAccount }}
      >
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  
  window: PropTypes.func,
};

export default DashboardLayoutBasic;