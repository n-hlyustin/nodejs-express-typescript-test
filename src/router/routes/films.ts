import { Response } from 'express';

import DatabaseConnection from "../../db";

export async function getFilmsRoute(_: any, res: Response) {
  const formattedFilms = [];
  const films = await DatabaseConnection.getClient().film.findMany({
    include: {
      actors: {
        include: {
          actor: true
        }
      }
    }
  });
  for (let i = 0; i < films.length; i++) {
    const film = films[i];
    formattedFilms.push({
      ...film,
      actors: film.actors.map((item) => item.actor)
    })
  }
  res.json(formattedFilms);
}
