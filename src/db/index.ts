import { PrismaClient } from "@prisma/client";

class Database {
  _client: PrismaClient

  constructor() {
    this._client = new PrismaClient();
  }

  initConnection() {
    return this._client.$connect();
  }

  getClient() {
    return this._client;
  }
}

const DatabaseConnection = new Database();

export default DatabaseConnection;
