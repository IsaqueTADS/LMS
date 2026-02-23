import { Core } from "./core/core.ts";

import { bodyJson } from "./core/middleware/body-json.ts";
import { logger } from "./core/middleware/logger.ts";
import { RouteError } from "./core/utils/route-error.ts";

const core = new Core();

core.router.use([logger]);

core.db.exec(/*sql*/ `
  CREATE TABLE IF NOT EXISTS "cursos"
  (
    "id" INTEGER PRIMARY KEY,
    "slug" TEXT NOT NULL COLLATE NOCASE UNIQUE,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL
  ) STRICT;

  INSERT OR IGNORE INTO "cursos" ("slug", "nome", "descricao")
  VALUES (
    'nodejs-fundamentos',
    'Node.js Fundamentos',
    'Curso introdutório sobre Node.js e conceitos básicos de backend.'
  );
`);

core.router.get(
  "/curso/:slug",
  (req, res) => {
    const { slug } = req.params;

    const curso = core.db
      .query(`SELECT * FROM "cursos" WHERE "slug" = ?`)
      .get(slug);

    if (!curso) throw new RouteError(404, "curso não encontrado");

    res.status(200).json({ curso });
  },
  [],
);
core.router.get("/curso/:curso/delete", (req, res) => {
  const slug = req.query.get("slug");

  if (!slug) return res.status(404).json({ messagem: "curso não encontrado" });

  res.status(200).json({ slug });
});
core.router.get("/aula/:aula", (req, res) => {
  res.status(200).json({ hello: "Hellow", world: "World" });
});

core.router.get(
  "/",
  (req, res) => {
    res.status(200).json({ hello: "Hellow", world: "World" });
  },
  [],
);

core.init();
