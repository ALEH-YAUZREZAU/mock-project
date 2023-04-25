import { ApolloServer, gql } from "apollo-server";
import { mergeResolvers } from "@graphql-tools/merge";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

import { authMiddleware } from "./authMiddleware";

import { userTypeDefs, userResolvers } from "./graphql/User";

dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient();

const typeDefs = [userTypeDefs];
const resolvers = mergeResolvers(userResolvers);

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
