// context/NetworkErrorContext.tsx
import React, { createContext, useState, useContext } from "react";
import { Snackbar, Alert } from "@mui/material";

interface NetworkErrorContextValue {
  setError: (error: Error | null) => void;
}

const NetworkErrorContext = createContext<NetworkErrorContextValue | undefined>(undefined);

const NetworkErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);
  return (
    <NetworkErrorContext.Provider value={{ setError }}>
      {error && (
        <Snackbar open={!!error} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "left" }}>
          <Alert severity="error" sx={{ width: "100%" }}>
            There was a problem with the network. Please check your connection.
          </Alert>
        </Snackbar>
      )}
      {children}
    </NetworkErrorContext.Provider>
  );
};

function useNetworkError() {
  const context = useContext(NetworkErrorContext);
  if (context === undefined) {
    throw new Error("useNetworkError must be used within a NetworkErrorProvider");
  }
  return context;
}

export { NetworkErrorProvider, useNetworkError };
