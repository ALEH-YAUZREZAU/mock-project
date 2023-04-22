const { ApolloServer, gql } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

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

apolloServer.listen({ port: 4000 }).then(({ url }: { url: string }) => {
  console.log(`🚀 GraphQL server ready at ${url}`);
});
