// ENG.RASHEED ALWAHBANY @2024
import { gql } from 'apollo-server-micro';

// Define typeDefs
export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    updateUser(id: ID!, name: String, email: String): User!
    deleteUser(id: ID!): User!
  }
`;

// Define resolvers
export const resolvers = {
  Query: {
    users: async (_parent, _args, context) => {
      try {
        return await context.prisma.users.findMany();
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
      }
    },
    user: async (_parent, args, context) => {
      try {
        return await context.prisma.users.findUnique({
          where: { id: parseInt(args.id) },
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
      }
    },
  },
  Mutation: {
    createUser: async (_parent, args, context) => {
      try {
        return await context.prisma.users.create({
          data: {
            name: args.name,
            email: args.email,
          },
        });
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
      }
    },
    updateUser: async (_parent, args, context) => {
      try {
        return await context.prisma.users.update({
          where: { id: parseInt(args.id) },
          data: { name: args.name, email: args.email },
        });
      } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
      }
    },
    deleteUser: async (_parent, args, context) => {
      try {
        return await context.prisma.users.delete({
          where: { id: parseInt(args.id) },
        });
      } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user');
      }
    },
  },
};
// ENG.RASHEED ALWAHBANY @2024
