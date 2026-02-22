import { Core } from "./core/core.ts";
import {
  criarAula,
  criarCurso,
  pegarAula,
  pegarAulas,
  pegarCurso,
  pegarCursos,
} from "./core/db/database.ts";
import { bodyJson } from "./core/middleware/body-json.ts";
import { logger } from "./core/middleware/logger.ts";
import { RouteError } from "./core/utils/route-error.ts";

const core = new Core();

core.router.use([logger]);

core.router.get(
  "/curso/:slug",
  (req, res) => {
    const { slug } = req.params;

    const curso = pegarCurso(slug);

    if (!curso) throw new RouteError(404, "curso não encontrado");

    res.status(200).json({ slug });
  },
  [],
);
core.router.get("/curso/:curso/delete", (req, res) => {
  const slug = req.query.get("slug");

  const curso = pegarCurso(slug);

  if (!curso) return res.status(404).json({ messagem: "curso não encontrado" });

  res.status(200).json({ curso });
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
