import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@hooks/index";

export const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuth: React.FC = ({ ...props }) => {
    const { loading } = useAuth();

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return WithAuth;
};

export default withAuth;
