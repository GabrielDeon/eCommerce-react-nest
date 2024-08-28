# eCommerce-react-nest

## This is a ecommerce project made using React, NestJS, Prisma, Docker and PostgreSQL.

To run the project you'll need to have Docker and Node installed, and ports 3000 and 5173 available.

The layout was not designed by me. All credits to:

https://www.figma.com/design/qm2oC5oZMtzM66pOxHowgC/Untitled?node-id=0-1&t=Tkz3NQUQJcPgrb58-0



API Documentation will be posted here soon...

---

### Steps to run the project

#### 1º Clone the repository

The following command create a clone of the Project

```bash
git clone https://github.com/GabrielDeon/eCommerce-react-nest.git
```
#### 2º Set Enviroment Variables

In the .env files fill in the required values:

⪼ Back-end: Copy .env.example to .env in the Back-end folder and fill in the required values.

#### 3º Install Dependencies

The following command install both fronend and backend dependencies
```bash
npm run intall:all
```

#### 4º Start Database

The following command uses "docker-compose.yml" to create a DB container
and must be used with Docker running.
```bash
npm run start:db
```

#### 5º Run Prisma Migrate

The following command populate the database with prisma models
```bash
npm run migrate
```

#### 6º Seed the Database (Optional)

The following command creates important categories and sizes that are
used for application logic, and a few optinal categories.
```bash
npm run seed
```

#### 7º Run the project

Finally, you must run the following command to start both front/back servers
```bash
 npm run start
```


