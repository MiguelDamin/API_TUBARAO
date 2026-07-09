"use client";

import { useEffect, useState } from "react";

interface Tubarao {
  id: number;
  nome_popular: string;
  nome_cientifico: string;
  tamanho_maximo_metros: number;
  habitat: string;
  risco_extincao: string;
  url_foto?: string;
}

export default function Home() {
  const [tubaroes, setTubaroes] = useState<Tubarao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarTubaroes() {
      try {
        const resposta = await fetch("/api/tubaroes");
        if (!resposta.ok) {
          throw new Error("Não foi possível carregar os dados da API.");
        }
        const dados = await resposta.json();
        setTubaroes(dados);
      } catch (erroQualquer) {
        console.error("Falha ao consumir a API:", erroQualquer);
        setErro("Não foi possível carregar a lista de tubarões. Verifique se o servidor de desenvolvimento está ativo.");
      } finally {
        setCarregando(false);
      }
    }

    carregarTubaroes();
  }, []);

  // Exibiremos todos os tubarões para teste.
  const primeirosCinco = tubaroes.slice(0, 55);

  return (
    <main className="min-h-screen bg-[#080B11] text-white p-8 font-sans flex flex-col items-center">
      {/* Cabeçalho */}
      <header className="mb-12 text-center max-w-xl">
        <h1 className="text-4xl font-extralight tracking-wider text-slate-100 mb-2">
          Galeria de Tubarões
        </h1>
        <p className="text-slate-400 text-sm">
          Teste de Integração (Exibindo {tubaroes.length} de {tubaroes.length} espécies cadastradas)
        </p>
      </header>

      {/* Carregamento */}
      {carregando && (
        <div className="text-slate-400 animate-pulse text-lg mt-8">
          Conectando ao banco do Supabase...
        </div>
      )}

      {/* Erro */}
      {erro && !carregando && (
        <div className="bg-red-950/40 border border-red-500/20 text-red-200 px-6 py-4 rounded-xl max-w-lg text-center mt-8 backdrop-blur-sm">
          <p className="font-semibold mb-1">Ops! Ocorreu um problema</p>
          <p className="text-xs text-red-300/80">{erro}</p>
        </div>
      )}

      {/* Grid de Cards */}
      {!carregando && !erro && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {primeirosCinco.map((tubarao) => (
            <div
              key={tubarao.id}
              className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30"
            >
              {/* Imagem do Tubarão */}
              <div className="h-48 w-full overflow-hidden bg-slate-950 relative">
                {tubarao.url_foto ? (
                  <img
                    src={tubarao.url_foto}
                    alt={tubarao.nome_popular}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
                    Sem imagem disponível
                  </div>
                )}
              </div>

              {/* Informações do Tubarão */}
              <div className="p-6">
                <span className="text-[10px] uppercase tracking-widest text-blue-400 font-semibold">
                  ID: #{tubarao.id}
                </span>
                <h2 className="text-xl font-medium text-slate-100 mt-1">
                  {tubarao.nome_popular}
                </h2>
                <p className="text-sm italic text-slate-400 mt-0.5">
                  {tubarao.nome_cientifico}
                </p>

                <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-1.5 text-xs text-slate-300">
                  <div>
                    <strong className="text-slate-400">Habitat:</strong> {tubarao.habitat}
                  </div>
                  <div>
                    <strong className="text-slate-400">Risco de Extinção:</strong> {tubarao.risco_extincao}
                  </div>
                  {tubarao.tamanho_maximo_metros && (
                    <div>
                      <strong className="text-slate-400">Tamanho Máximo:</strong> {tubarao.tamanho_maximo_metros} metros
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
