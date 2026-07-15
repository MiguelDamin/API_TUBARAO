"use client";

import { useState } from "react";
import Link from "next/link";

const CAMPO_DADOS = [
  { campo: "id", tipo: "inteiro", descricao: "Identificador exclusivo da espécie no sistema.", exemplo: "12" },
  { campo: "nome_popular", tipo: "texto", descricao: "Nome comum da espécie em português.", exemplo: "\"Tubarão-Martelo\"" },
  { campo: "nome_cientifico", tipo: "texto", descricao: "Classificação científica formal (Gênero e Espécie).", exemplo: "\"Sphyrna mokarran\"" },
  { campo: "tamanho_maximo_metros", tipo: "decimal", descricao: "Comprimento máximo registrado, em metros.", exemplo: "6.1" },
  { campo: "habitat", tipo: "texto", descricao: "Ambiente marinho onde a espécie costuma ser avistada.", exemplo: "\"Águas tropicais costeiras\"" },
  { campo: "risco_extincao", tipo: "texto", descricao: "Status de conservação segundo a lista vermelha da IUCN.", exemplo: "\"Criticamente em Perigo\"" },
  { campo: "url_foto", tipo: "texto (opcional)", descricao: "URL de uma imagem pública ilustrando o tubarão.", exemplo: "\"https://...\"" },
];

const EXEMPLOS_CODIGO = {
  curl: `curl -X GET "https://api-tubarao-2026.vercel.app/api/tubaroes" \\
     -H "Accept: application/json"`,
  javascript: `const URL_API = 'https://api-tubarao-2026.vercel.app/api/tubaroes';

fetch(URL_API)
  .then(response => {
    if (!response.ok) {
      throw new Error(\`Erro HTTP! status: \${response.status}\`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Espécies encontradas:', data.length);
    console.log(data);
  })
  .catch(error => {
    console.error('Erro ao consumir a API:', error);
  });`,
  python: `import requests

url = "https://api-tubarao-2026.vercel.app/api/tubaroes"

try:
    response = requests.get(url)
    response.raise_for_status()
    tubaroes = response.json()
    print(f"Total de tubarões: {len(tubaroes)}")
    for t in tubaroes:
        print(f"- {t['nome_popular']} ({t['nome_cientifico']})")
except requests.exceptions.RequestException as e:
    print(f"Ocorreu um erro: {e}")`,
};

type TabKey = "curl" | "javascript" | "python";

export default function Home() {
  const [abaAtiva, setAbaAtiva] = useState<TabKey>("curl");

  return (
    <main className="min-h-screen bg-[#080B11] text-white font-sans">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-28 pb-24 overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <h1 className="relative text-5xl sm:text-7xl font-extralight tracking-tight text-white mb-5 leading-tight">
          API de{" "}
          <span className="font-light bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Tubarões
          </span>
        </h1>

        <p className="relative text-slate-400 text-lg max-w-xl mb-10 leading-relaxed">
          Uma API REST pública para consultar dados detalhados sobre espécies de tubarões catalogadas. Sem chave de acesso. Apenas uma requisição GET.
        </p>

        <div className="relative flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Ver galeria de tubarões
          </Link>
          <a
            href="#endpoint"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 font-medium px-5 py-3.5 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-200"
          >
            Ver documentação
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── O QUE É A API ───────────────────────────────────────────── */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
              titulo: "Sem Autenticação",
              texto: "Nenhuma chave de API ou token é necessário. Qualquer client pode fazer chamadas diretas."
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              ),
              titulo: "CORS Habilitado",
              texto: "Permite chamadas HTTP diretas a partir de qualquer domínio. Ideal para frontends e aplicações mobile."
            },
            {
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              ),
              titulo: "Resposta em JSON",
              texto: "Todos os dados retornam em formato JSON com Content-Type: application/json. Fácil de parsear em qualquer linguagem."
            },
          ].map((item) => (
            <div
              key={item.titulo}
              className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-sm hover:border-blue-500/20 transition-colors duration-300"
            >
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold text-slate-100 mb-1.5">{item.titulo}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ENDPOINT ────────────────────────────────────────────────── */}
      <section id="endpoint" className="px-6 py-16 max-w-5xl mx-auto">
        <SectionTitle badge="Endpoint" titulo="Como fazer uma requisição" />

        <div className="mt-8 bg-slate-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <span className="bg-green-500/15 border border-green-500/25 text-green-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg">
              GET
            </span>
            <code className="text-slate-200 text-sm sm:text-base font-mono bg-slate-950/60 px-4 py-2.5 rounded-xl border border-white/5 flex-1">
              /api/tubaroes
            </code>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-slate-500 w-28 shrink-0">Produção</span>
              <code className="text-blue-400 font-mono text-xs sm:text-sm">
                https://api-tubarao-2026.vercel.app/api/tubaroes
              </code>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-slate-500 w-28 shrink-0">Local</span>
              <code className="text-slate-300 font-mono text-xs sm:text-sm">
                http://localhost:3000/api/tubaroes
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* ── ESTRUTURA DOS DADOS ─────────────────────────────────────── */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <SectionTitle badge="Schema" titulo="Estrutura dos dados retornados" />

        <div className="mt-8 bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-left">
                  <th className="text-xs uppercase tracking-wider text-slate-500 font-semibold px-6 py-4 w-44">Campo</th>
                  <th className="text-xs uppercase tracking-wider text-slate-500 font-semibold px-6 py-4 w-32">Tipo</th>
                  <th className="text-xs uppercase tracking-wider text-slate-500 font-semibold px-6 py-4">Descrição</th>
                  <th className="text-xs uppercase tracking-wider text-slate-500 font-semibold px-6 py-4 hidden md:table-cell">Exemplo</th>
                </tr>
              </thead>
              <tbody>
                {CAMPO_DADOS.map((row, i) => (
                  <tr key={row.campo} className={i < CAMPO_DADOS.length - 1 ? "border-b border-white/5" : ""}>
                    <td className="px-6 py-4">
                      <code className="text-blue-400 font-mono text-xs bg-blue-500/10 px-2 py-1 rounded">
                        {row.campo}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">{row.tipo}</td>
                    <td className="px-6 py-4 text-slate-300">{row.descricao}</td>
                    <td className="px-6 py-4 text-slate-500 font-mono text-xs hidden md:table-cell">{row.exemplo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── EXEMPLOS ────────────────────────────────────────────────── */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <SectionTitle badge="Código" titulo="Exemplos de integração" />

        <div className="mt-8">
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-900/60 border border-white/5 p-1 rounded-xl w-fit mb-4">
            {(["curl", "javascript", "python"] as TabKey[]).map((aba) => (
              <button
                key={aba}
                onClick={() => setAbaAtiva(aba)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  abaAtiva === aba
                    ? "bg-slate-700 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {aba === "curl" ? "cURL" : aba.charAt(0).toUpperCase() + aba.slice(1)}
              </button>
            ))}
          </div>

          {/* Bloco de código */}
          <div className="relative bg-slate-950 border border-white/5 rounded-2xl p-6 overflow-x-auto">
            <pre className="text-sm text-slate-300 font-mono whitespace-pre leading-relaxed">
              {EXEMPLOS_CODIGO[abaAtiva]}
            </pre>
          </div>
        </div>
      </section>

      {/* ── STATUS CODES ────────────────────────────────────────────── */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <SectionTitle badge="HTTP" titulo="Códigos de retorno" />

        <div className="mt-8 flex flex-col gap-4">
          {[
            { status: "200", label: "OK", cor: "green", descricao: "Requisição bem-sucedida. O corpo da resposta contém os dados em JSON." },
            { status: "500", label: "Internal Server Error", cor: "red", descricao: "Erro no servidor ou falha na comunicação com o banco de dados." },
          ].map((item) => (
            <div
              key={item.status}
              className="flex items-start gap-5 bg-slate-900/40 border border-white/5 p-5 rounded-2xl backdrop-blur-sm"
            >
              <span className={`shrink-0 font-bold font-mono text-sm px-3 py-1.5 rounded-lg border ${
                item.cor === "green"
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}>
                {item.status}
              </span>
              <div>
                <p className="font-semibold text-slate-200 text-sm mb-0.5">{item.label}</p>
                <p className="text-slate-400 text-sm">{item.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER CTA ──────────────────────────────────────────────── */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-lg mx-auto">
          <p className="text-slate-400 mb-6 text-sm">Pronto para explorar as espécies catalogadas?</p>
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Ver galeria de tubarões
          </Link>
        </div>
      </section>

    </main>
  );
}

function SectionTitle({ badge, titulo }: { badge: string; titulo: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">{badge}</span>
      <h2 className="text-2xl font-light text-slate-100">{titulo}</h2>
    </div>
  );
}
