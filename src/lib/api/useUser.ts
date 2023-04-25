import { useQuery } from "@apollo/client";
import { ME_QUERY } from "@lib/queries";

export const useUser = () => {
  const { data, ...other } = useQuery(ME_QUERY);

  return {
    user: data?.me,
    ...other,
  };
};
