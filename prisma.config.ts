import { defineConfig } from '@prisma/config'

export default defineConfig({
  datasource: {
    // Aqui garantimos que ele leia do seu arquivo .env
    url: process.env.DATABASE_URL || "mysql://root:@localhost:3306/ruralsync",
  },
})