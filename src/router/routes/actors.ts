import { Response } from "express";

import DatabaseConnection from "../../db";

export async function getActorsRoute(_: any, res: Response) {
  const actors = await DatabaseConnection.getClient().actor.findMany();
  res.json(actors);
}
