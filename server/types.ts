import { PrismaClient } from "@prisma/client";
import { Role } from "./graphqlTypes";

export interface Context {
  prisma: PrismaClient;
  user: {
    id: string;
    role: Role;
  };
}
