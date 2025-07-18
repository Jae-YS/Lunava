import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import { Box } from "@mui/material";

type AuthenticationGuardProps = {
  component: React.ComponentType;
};

const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  component,
}) => {
  const location = useLocation();
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DotLoader size={80} color="#A85E3B" />
      </Box>
    ),
    returnTo: location.pathname + location.search,
  });

  return <Component />;
};

export default AuthenticationGuard;
