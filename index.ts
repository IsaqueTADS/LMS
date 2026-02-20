import { Core } from "./core/core.ts";
import {
  criarAula,
  criarCurso,
  pegarAula,
  pegarAulas,
  pegarCurso,
  pegarCursos,
} from "./core/db/database.ts";

const core = new Core();

core.router.get("/curso/:slug", (req, res) => {
  const { slug } = req.params;

  console.log(slug);
  // const curso = pegarCurso(slug);

  // if (!curso) return res.status(404).json({ messagem: "curso não encontrado" });

  res.status(200).json({ slug });
});
core.router.get("/curso/:curso/delete", (req, res) => {
  const slug = req.query.get("slug");

  const curso = pegarCurso(slug);

  if (!curso) return res.status(404).json({ messagem: "curso não encontrado" });

  res.status(200).json({ curso });
});
core.router.get("/aula/:aula", (req, res) => {
  res.status(200).json({ hello: "Hellow", world: "World" });
});

core.router.get("/", (req, res) => {
  res.status(200).json({ hello: "Hellow", world: "World" });
});

core.init();
