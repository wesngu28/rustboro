
import { PrismaClient } from '@prisma/client'


export const prismatic = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL + "&application_name=$ docs_simplecrud_node-prisma",
      },
    },
  })
  