import { ApolloServer, gql } from "apollo-server-micro";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const typeDefs = gql`
  type Query {
    users: [User!]!
  }

  type User {
    id: Int!
    email: String!
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany({
        select: {
          id: true,
          email: true,
        },
      });
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: any, res: any) => {
  return apolloServer.createHandler({ path: "/api/graphql" })(req, res);
};
