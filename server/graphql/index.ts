import { gql } from "apollo-server";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { userTypeDefs } from "./User";

export const combinedTypeDefs = mergeTypeDefs([userTypeDefs]);

export default combinedTypeDefs;
