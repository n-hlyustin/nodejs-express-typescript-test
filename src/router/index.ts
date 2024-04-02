import { Application } from "express";

import { getFilmsRoute } from "./routes/films";
import {
  getFilmRoute,
  postFilmRoute,
  patchFilmRoute,
  deleteFilmRoute
} from "./routes/film";
import { getActorsRoute } from "./routes/actors";
import {
  getActorRoute,
  postActorRoute,
  patchActorRoute,
  deleteActorRoute
} from "./routes/actor";

export default function InitAppRouter(app: Application) {
  // films
  app.get('/api/films', getFilmsRoute);
  app.get('/api/film/:id', getFilmRoute);
  app.post('/api/film', postFilmRoute);
  app.patch('/api/film/:id', patchFilmRoute);
  app.delete('/api/film/:id', deleteFilmRoute);
  // actors
  app.get('/api/actors', getActorsRoute);
  app.get('/api/actor/:id', getActorRoute);
  app.post('/api/actor', postActorRoute);
  app.patch(`/api/actor/:id`, patchActorRoute);
  app.delete(`/api/actor/:id`, deleteActorRoute);
}
