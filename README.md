## How to run this project ??

-   create a .env file in the project's root (you can follow the .env.example)

After that, run the following commands:

-   npm install, to install dependencies
-   npm run prepare, to setup husky + lintstaged
-   npm run dbgenerate, to generate the database's connection (note that the DB must already exists and the .env file must already be created)
-   npm run migrations
-   npm run build
-   npm run start or npm start
