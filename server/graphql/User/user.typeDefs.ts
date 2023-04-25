import { gql } from "apollo-server";

export const userTypeDefs = gql`
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
