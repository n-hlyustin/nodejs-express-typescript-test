-- CreateTable
CREATE TABLE "actor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "film" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "film_actors" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filmId" INTEGER,
    "actorId" INTEGER,
    CONSTRAINT "film_actors_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "film" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "film_actors_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "actor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "film_name_key" ON "film"("name");
