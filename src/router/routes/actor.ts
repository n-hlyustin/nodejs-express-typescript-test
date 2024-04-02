import DatabaseConnection from "../../db";
import {Request, Response} from "express";

function getActorById(id: number) {
  return DatabaseConnection.getClient().actor.findUnique({
    where: { id }
  });
}

function createActor(name: string) {
  return DatabaseConnection.getClient().actor.create({
    data: {
      name
    }
  })
}

function updateActorById(id: number, name: string) {
  return DatabaseConnection.getClient().actor.update({
    where: { id },
    data: { name }
  });
}

function deleteActorById(id: number) {
  return DatabaseConnection.getClient().actor.delete({
    where: { id }
  });
}
function deleteFilmActorsByActorId(id: number) {
  return DatabaseConnection.getClient().film_actors.deleteMany({
    where: { actorId: id }
  });
}

export async function getActorRoute(req: Request, res: Response) {
  const { id } = req.params;
  const actor = await getActorById(parseInt(id, 10));
  res.json(actor);
}

export async function postActorRoute(req: Request, res: Response) {
  const { name } = req.body;
  const actor = await createActor(name);
  res.status(201).json(actor);
}

export async function patchActorRoute(req: Request, res: Response) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const actor = await updateActorById(parseInt(id, 10), name);
    res.json(actor);
  }
  catch (_) {
    res.status(404).end();
  }
}

export async function deleteActorRoute(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await deleteActorById(parseInt(id, 10));
    await deleteFilmActorsByActorId(parseInt(id, 10));
    res.json({});
  }
  catch (_) {
    res.status(404).end();
  }
}
