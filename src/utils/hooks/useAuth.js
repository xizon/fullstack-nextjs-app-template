import { useContext } from 'react';
import AuthContext from '@/contexts/JWTAuthContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;
