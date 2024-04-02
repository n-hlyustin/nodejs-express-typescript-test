import { Request, Response } from 'express';

import DatabaseConnection from "../../db";

function getFilmById(id: number) {
  return DatabaseConnection.getClient().film.findUnique({
    where: { id },
  });
}

function getAllActorsByFilmId(id: number) {
  return DatabaseConnection.getClient().film_actors.findMany({
    select: {
      actor: true
    },
    where: {
      filmId: id
    }
  });
}

function createFilm(name: string) {
  return DatabaseConnection.getClient().film.create({
    data: {
      name
    }
  });
}

function assignActorToFilm(filmId: number, actorId: number) {
  return DatabaseConnection.getClient().film_actors.create({
    data: {
      filmId,
      actorId
    }
  });
}

function assignActorsToFilm(filmId: number, actors: Array<number>) {
  const actorsAssigment = [];
  for (let i = 0; i < actors.length; i++) {
    const actorId = actors[i];
    actorsAssigment.push(assignActorToFilm(filmId, actorId));
  }
  return actorsAssigment;
}

function updateFilmById(id: number, name: string) {
  return DatabaseConnection.getClient().film.update({
    where: { id },
    data: { name }
  });
}

function deleteFilmById(id: number) {
  return DatabaseConnection.getClient().film.delete({
    where: { id }
  });
}

function deleteFilmActorsByFilmId(id: number) {
  return DatabaseConnection.getClient().film_actors.deleteMany({
    where: { filmId: id }
  });
}

export async function getFilmRoute(req: Request, res: Response) {
  const { id } = req.params;
  const film = await getFilmById(parseInt(id, 10));
  const actors = await getAllActorsByFilmId(parseInt(id, 10));
  res.json({
    ...film,
    actors: actors.map((item) => item.actor)
  });
}

export async function postFilmRoute(req: Request, res: Response) {
  const { name, actors: reqActors } = req.body;
  const film = await createFilm(name);
  try {
    await Promise.all(assignActorsToFilm(film.id, reqActors));
    const actors = await getAllActorsByFilmId(film.id);
    res.status(201).json({
      ...film,
      actors: actors.map((item) => item.actor)
    });
  }
  catch (e) {
    console.error('Unable to assign actors to film:', e);
    res.end(500);
  }
}

export async function patchFilmRoute(req: Request, res: Response) {
  const { id } = req.params;
  const { name, actors: reqActors } = req.body;
  try {
    const film = await getFilmById(parseInt(id, 10));
    if (film) {
      if (name) {
        await updateFilmById(film.id, name);
        film.name = name;
      }
      if (reqActors) {
        await deleteFilmActorsByFilmId(parseInt(id, 10));
        try {
          await Promise.all(assignActorsToFilm(film.id, reqActors));
        }
        catch (e) {
          console.error('Unable to assign actors to film:', e);
          res.end(500);
        }
      }
      const actors = await getAllActorsByFilmId(parseInt(id, 10));
      res.json({
        ...film,
        actors: actors.map((item) => item.actor)
      }).status(200);
    }
  }
  catch (_) {
    res.status(404).end();
  }
}

export async function deleteFilmRoute(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await deleteFilmById(parseInt(id, 10));
    await deleteFilmActorsByFilmId(parseInt(id, 10));
    res.json({});
  }
  catch (_) {
    res.status(404).end();
  }
}
