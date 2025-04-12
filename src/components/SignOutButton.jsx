import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../context/Context'; // update this path as per your project
import { Button } from '@mui/material';
import { supabase } from '@/utils/supabaseClient'; // adjust the import

function SignOutButton() {
  // const navigate = useNavigate();
  const { setSession, setUser } = useContext(AuthContext);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    window.location.href = '/authsignin'; // fallback (not recommended if using client-side routing)
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="text"
      color="error"
      sx={{ mt: 1, ml: 2 }}
    >
      Sign Out
    </Button>
  );
}

export default SignOutButton;
