import { useSession } from "next-auth/react";

export const useUserSession = () => {
  const { data: session, status } = useSession();

  return {
    session,
    loading: status === "loading",
  };
};
