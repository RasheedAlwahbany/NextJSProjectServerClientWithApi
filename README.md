## NextJS Project Server Client With Api
This is NextJS Project Server Client With API



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## Setup Prisma
### Install the package
```
npm install @prisma/client
npm install prisma
```
### Configure Prisma
```
DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
```
### schema.prisma
```
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```
### Migrate the Database
```
npx prisma migrate dev --name init
```

## Set Up Apollo Client
### Install  the package
```
pnpm install @apollo/client graphql
pnpm install graphql apollo-server-micro
```
The configuration have to be like this:
- Create Apollo Client `lib/apolloClient.js`
- Create GraphQL API Routes `pages/api/graphql.js`
- Query Data in Your Next.js Pages `pages/_app.js`
- Use Apollo Client in Your Components `pages/index.js`


## Test the project
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
