import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../redux/theme/themeOperation";
import { selectTheme } from "../redux/theme/themeSelector";
import { useAuth } from "./useAuth";

export const useTheme = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();
  const themeBack = useSelector(selectTheme);

  // Ia tema din server când userul se loghează
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getTheme());
    }
  }, [dispatch, isLoggedIn]);

  useLayoutEffect(() => {
    console.log("💡 Applying themeBack to html:", themeBack);
    if (themeBack && typeof themeBack === "string") {
      document.documentElement.setAttribute("data-theme", themeBack);
    }
  }, [themeBack]);

  return { themeBack };
};
