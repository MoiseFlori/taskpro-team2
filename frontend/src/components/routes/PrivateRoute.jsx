import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setToken, setUser, setIsLoggedIn } from "../../redux/auth/authSlice";
import axios, { setAuthToken } from "../../utils/axiosConfig";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      setAuthToken(token);

      dispatch(setToken(token));
      dispatch(setIsLoggedIn(true));

      axios
        .get("/users/current")
        .then((res) => {
          dispatch(setUser(res.data.user));
        })
        .catch(() => {
          dispatch(setIsLoggedIn(false));
        });

      navigate(location.pathname, { replace: true });
    }
  }, [location.search, dispatch, navigate, location.pathname]);

  return isLoggedIn ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
