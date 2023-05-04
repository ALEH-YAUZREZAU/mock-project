import { useQuery } from "@apollo/client";
import { ME_QUERY } from "@lib/queries";

import { useNetworkError } from "../providers/NetworkError";
import { useEffect } from "react";

export const useUser = () => {
  // const { setError } = useNetworkError();
  const { data, error, ...other } = useQuery(ME_QUERY);

  // useEffect(() => {
  //   if (error) {
  //     setError(error);
  //   }
  // }, [error]);

  return {
    user: data?.me,
    ...other,
  };
};
