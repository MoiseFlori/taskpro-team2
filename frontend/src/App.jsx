import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import PrivateRoute from "./components/routes/PrivateRoute";
import HomeLayout from "./layouts/HomeLayout";
import AuthPage from "./pages/AuthPage";
import VerifySuccess from "./pages/VerifySuccess";
import VerifyFail from "./pages/VerifyFail";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/auth/:id" element={<AuthPage />} />
        <Route path="/verify-success" element={<VerifySuccess />} />
        <Route path="/verify-fail" element={<VerifyFail />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomeLayout />
            </PrivateRoute>
          }
        >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
