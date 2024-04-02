import express, { Express } from "express";
import bodyParser from 'body-parser';

import InitAppRouter from "./router";
import DatabaseConnection from "./db";

const app: Express = express();
const port = process.env.PORT || 3013;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

DatabaseConnection.initConnection().then(() => {
  InitAppRouter(app);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
})
