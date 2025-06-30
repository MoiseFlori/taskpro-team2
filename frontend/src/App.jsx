import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import WelcomePage from "./pages/WelcomePage";
import PrivateRoute from "./components/routes/PrivateRoute";
import HomeLayout from "./layouts/HomeLayout";
import AuthPage from "./pages/AuthPage";
import VerifySuccess from "./pages/VerifySuccess";
import VerifyFail from "./pages/VerifyFail";
import GoogleLoginFail from "./components/google-fail/GoogleLoginFail";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/auth/:id" element={<AuthPage />} />
          <Route path="/verify-success" element={<VerifySuccess />} />
          <Route path="/verify-fail" element={<VerifyFail />} />

          <Route path="/google-login-fail" element={<GoogleLoginFail />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomeLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
