// Liga a interface aos módulos do tutorial.
import "./style.css";
import { aoMudarSessao, cadastrar, entrar, sair } from "./auth.js";
import { apagarNota, atualizarNota, criarNota, listarNotas } from "./notas.js";
import { apagarAnexo, enviarAnexo, linkDoAnexo } from "./anexos.js";
import { escutarNotas, pararDeEscutar } from "./realtime.js";
import { exportarNotas } from "./exportar.js";

const $ = (id) => document.getElementById(id);
const formLogin = $("form-login");
const formNota = $("form-nota");
const lista = $("lista-notas");

let usuario = null;
let notas = [];

function mensagem(texto, erro = false) {
  $("mensagem").textContent = texto;
  $("mensagem").className = erro ? "erro" : "";
}

async function tentar(acao) {
  try {
    mensagem("");
    await acao();
  } catch (e) {
    mensagem(e.message ?? String(e), true);
  }
}

// ---------- Sessão ----------

aoMudarSessao((session) => {
  usuario = session?.user ?? null;
  $("tela-login").hidden = !!usuario;
  $("tela-notas").hidden = !usuario;
  $("usuario").hidden = !usuario;
  $("usuario-email").textContent = usuario?.email ?? "";

  if (usuario) {
    // Adia para fora do callback de auth, como recomenda o supabase-js.
    setTimeout(() => {
      tentar(recarregar);
      escutarNotas(() => tentar(recarregar), mostrarStatusRealtime);
    }, 0);
  } else {
    pararDeEscutar();
    notas = [];
    renderizar();
  }
});

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const { email, senha } = Object.fromEntries(new FormData(formLogin));
  const acao = e.submitter?.dataset.acao;
  tentar(async () => {
    if (acao === "cadastrar") {
      const { precisaConfirmar } = await cadastrar(email, senha);
      if (precisaConfirmar) mensagem("Conta criada! Confirme pelo link enviado ao seu e-mail.");
    } else {
      await entrar(email, senha);
    }
  });
});

$("sair").addEventListener("click", () => tentar(sair));

// ---------- Notas ----------

async function recarregar() {
  notas = await listarNotas();
  renderizar();
}

function renderizar() {
  lista.replaceChildren(
    ...notas.map((nota) => {
      const li = document.createElement("li");

      const titulo = document.createElement("strong");
      titulo.textContent = nota.titulo;
      const conteudo = document.createElement("p");
      conteudo.textContent = nota.conteudo;
      const data = document.createElement("small");
      data.textContent = new Date(nota.atualizado_em).toLocaleString("pt-BR");

      const acoes = document.createElement("div");
      acoes.className = "acoes";
      if (nota.anexo_path) acoes.append(botao("📎 Anexo", () => abrirAnexo(nota)));
      acoes.append(botao("Editar", () => editar(nota)), botao("Apagar", () => apagar(nota)));

      li.append(titulo, conteudo, data, acoes);
      return li;
    }),
  );
  if (!notas.length && usuario) lista.innerHTML = "<li class='vazio'>Nenhuma nota ainda.</li>";
}

function botao(texto, aoClicar) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "secundario";
  b.textContent = texto;
  b.addEventListener("click", () => tentar(aoClicar));
  return b;
}

formNota.addEventListener("submit", (e) => {
  e.preventDefault();
  const dados = new FormData(formNota);
  const id = dados.get("id");
  const campos = { titulo: dados.get("titulo"), conteudo: dados.get("conteudo") };
  const arquivo = dados.get("anexo");

  tentar(async () => {
    const nota = id ? await atualizarNota(Number(id), campos) : await criarNota(campos);

    if (arquivo && arquivo.size > 0) {
      const anterior = nota.anexo_path;
      const caminho = await enviarAnexo(usuario.id, nota.id, arquivo);
      await atualizarNota(nota.id, { anexo_path: caminho });
      if (anterior) await apagarAnexo(anterior);
    }

    limparFormulario();
    await recarregar();
  });
});

function editar(nota) {
  formNota.id.value = nota.id;
  formNota.titulo.value = nota.titulo;
  formNota.conteudo.value = nota.conteudo;
  $("salvar").textContent = "Salvar alterações";
  $("cancelar").hidden = false;
  formNota.titulo.focus();
}

function limparFormulario() {
  formNota.reset();
  formNota.id.value = "";
  $("salvar").textContent = "Adicionar nota";
  $("cancelar").hidden = true;
}

$("cancelar").addEventListener("click", limparFormulario);

async function apagar(nota) {
  if (!confirm(`Apagar "${nota.titulo}"?`)) return;
  if (nota.anexo_path) await apagarAnexo(nota.anexo_path);
  await apagarNota(nota.id);
  await recarregar();
}

async function abrirAnexo(nota) {
  window.open(await linkDoAnexo(nota.anexo_path), "_blank", "noopener");
}

// ---------- Realtime e Edge Function ----------

function mostrarStatusRealtime(status) {
  const conectado = status === "SUBSCRIBED";
  $("realtime-status").textContent = conectado ? "● realtime conectado" : `● realtime: ${status.toLowerCase()}`;
  $("realtime-status").classList.toggle("ok", conectado);
}

$("exportar").addEventListener("click", () => tentar(exportarNotas));
