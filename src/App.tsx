import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthenticationGuard from "./guards/AuthenticationGuard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useUIContext } from "./context/ui/useUIContext";
import { Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DotLoader from "react-spinners/DotLoader";
import ProductsPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ProductView from "./pages/ProductView";

const GlobalLoaderOverlay = () => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      bgcolor: "rgba(255, 255, 255, 0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
    }}
  >
    <DotLoader size={80} color="primary.main" />
  </Box>
);

const App: React.FC = () => {
  const { isAppLoading } = useUIContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <ToastContainer
        position={isMobile ? "top-center" : "bottom-right"}
        autoClose={3000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={isMobile ? { width: "90%", margin: "0 auto", left: "5%" } : {}}
      />
      {isAppLoading && <GlobalLoaderOverlay />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<ProductsPage />} />
        <Route path="/category/:id" element={<ProductsPage />} />
        <Route
          path="/category/:categoryId/:slug"
          element={<AuthenticationGuard component={ProductView} />}
        />
        <Route
          path="/cart"
          element={<AuthenticationGuard component={CartPage} />}
        />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
};

export default App;
