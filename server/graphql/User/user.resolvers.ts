import { Context } from "../../types";
import { checkAuth } from "../../utils";

export const userResolvers = {
  Query: {
    me: async (_: any, __: any, context: Context) => {
      checkAuth(context);

      const currentUser = await context.prisma.user.findUnique({
        where: { id: context.user.id },
        include: { accounts: true },
      });

      if (!currentUser) {
        throw new Error("User not found");
      }

      return currentUser;
    },
  },
};
