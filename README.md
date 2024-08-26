﻿# eCommerce-react-nest

### 1º Clone the repository

The following command create a clone of the Project

```bash
git clone https://github.com/GabrielDeon/eCommerce-react-nest.git
```
### 2º Set Enviroment Variables

In the .env files fill in the required values:

⪼ Back-end: Copy .env.example to .env in the Back-end folder and fill in the required values.

⪼ Front-end: Copy .env.example to .env in the Front-end folder and set the VITE_API_URL.

### 3º Install Dependencies

The following command install both fronend and backend dependencies
```bash
npm run intall:all
```

### 4º Start Database

The following command uses "docker-compose.yml" to create a DB container
and must be used with Docker running.
```bash
npm run start:db
```

### 5º Run Prisma Migrate

The following command populate the database with prisma models
```bash
npm run migrate
```

### 6º Seed the Database (Optional)

The following command creates important categories and sizes that are
used for application logic, and a few optinal categories.
```bash
npm run seed
```

### 7º Run the project

Finally, you must run the following command to start both front/back servers
```bash
 npm run start
```


