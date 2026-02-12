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

core.router.post("/cursos", (req, res) => {
  const { slug, nome, descricao } = req.body;
  const criado = criarCurso({ slug, nome, descricao });

  if (criado) {
    res.status(201).json({ messagem: "curso criado com sucesso." });
  } else {
    res.status(400).json({ error: "erro ao criar curso" });
  }
});
core.router.post("/aulas", (req, res) => {
  const { slug, nome, cursoSlug } = req.body;
  const criada = criarAula({ slug, nome, cursoSlug });

  if (criada) {
    res.status(201).json({ messagem: "aula criada." });
  } else {
    res.status(400).json({ error: "erro ao criar aula" });
  }
});
core.router.get("/cursos", (req, res) => {
  const cursos = pegarCursos();

  if (!cursos && !cursos.length)
    return res
      .status(404)
      .json({ messagem: "nenhum curso foi econtrado", cursos: [] });

  res.status(200).json({ cursos });
});
core.router.get("/curso", (req, res) => {
  const slug = req.query.get("slug");

  const curso = pegarCurso(slug);

  if (!curso) return res.status(404).json({ messagem: "curso não encontrado" });

  res.status(200).json({ curso });
});
core.router.get("/aulas", (req, res) => {
  const slugCurso = req.query.get("slug_curso");
  const aulas = pegarAulas(slugCurso);

  if (!aulas && !aulas.length)
    return res
      .status(404)
      .json({ messagem: "nenhuma aula foi econtrado", aulas: [] });

  res.status(200).json({ slugCurso, aulas });
});
core.router.get("/aula", (req, res) => {
  const cursoSlug = req.query.get("slug_curso");
  const aulaSlug = req.query.get("slug_aula");

  const aula = pegarAula(cursoSlug, aulaSlug);

  if (!aula) return res.status(404).json({ messagem: "aula não encontrado" });

  res.status(200).json({ aula });
});

core.router.get("/", (req, res) => {
  res.status(200).json({ hello: "Hellow", world: "World" });
});

core.init();
