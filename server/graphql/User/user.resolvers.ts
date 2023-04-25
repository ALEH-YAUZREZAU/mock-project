import { Context } from "../../types";

export const userResolvers = {
  Query: {
    me: async (_: any, __: any, context: Context) => {
      if (!context.user) {
        throw new Error("User Unauthorized");
      }

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
