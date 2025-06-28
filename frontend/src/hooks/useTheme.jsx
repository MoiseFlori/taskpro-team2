import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../redux/theme/themeOperation';
import { selectTheme } from '../redux/theme/themeSelector';
import { useAuth } from './useAuth';

export const useTheme = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();

  const themeBack = useSelector(selectTheme);

  // 🔁 Inițializare din localStorage dacă Redux nu oferă temă
  useEffect(() => {
    const localTheme = localStorage.getItem('app-theme');
    if (localTheme && !themeBack) {
      console.log('[useTheme] No theme in Redux, restoring from localStorage:', localTheme);
      document.documentElement.setAttribute('data-theme', localTheme);
    }
  }, [themeBack]);

  // 🚀 La autentificare, ia tema din server
  useEffect(() => {
    if (isLoggedIn) {
      console.log('[useTheme] User is logged in — dispatching getTheme()');
      dispatch(getTheme());
    }
  }, [dispatch, isLoggedIn]);

  // 🎯 Aplică tema din store când se schimbă
  useLayoutEffect(() => {
    if (themeBack && typeof themeBack === 'string') {
      console.log('[useTheme] Applying Redux theme:', themeBack);
      document.documentElement.setAttribute('data-theme', themeBack);
      localStorage.setItem('app-theme', themeBack);
    }
  }, [themeBack]);

  return { themeBack };
};
