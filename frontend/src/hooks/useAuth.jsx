import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectIsRefreshing
} from '../redux/auth/authSelector.js';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  return { isLoggedIn, isRefreshing };
};