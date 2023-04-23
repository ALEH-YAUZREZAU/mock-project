import { ApolloServer, gql } from "apollo-server";
import { authMiddleware } from "./authMiddleware";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient();

const typeDefs = gql`
  type Query {
    me: User!
  }

  type User {
    id: String!
    email: String!
    name: String
    image: String
    accounts: [Account!]!
  }

  type Account {
    id: String!
    userId: String!
    type: String!
    provider: String!
    providerAccountId: String!
  }
`;

interface Context {
  prisma: PrismaClient;
  user?: any;
}

const resolvers = {
  Query: {
    me: async (_: any, __: any, context: Context) => {
      if (!context.user) {
        throw new Error("Not authorized");
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

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }: any) =>
    authMiddleware({
      prisma,
      req,
    }),
});

apolloServer.listen({ port: 4000 }).then(({ url }: any) => {
  console.log(`🚀 GraphQL server ready at ${url}`);
});
