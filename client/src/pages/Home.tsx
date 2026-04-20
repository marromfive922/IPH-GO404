import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, BookOpen, Award, Users, Zap } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();

  // Get user's global score if authenticated
  const { data: globalScore } = trpc.quiz.getGlobalScore.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Get disciplines for stats
  const { data: disciplines } = trpc.quiz.getDisciplines.useQuery();

  if (loading) {
    return (
      <div className="flex-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#3498db]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-[#0a2f44] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#f4c542] flex-center text-[#0a2f44] font-bold text-lg">
              <i className="fas fa-microchip"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold">IPH Mandume</h1>
              <p className="text-xs opacity-80">Plataforma de Estudos</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm opacity-80">Olá, {user?.name}</span>
                <Button
                  onClick={() => logout()}
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-[#0a2f44]"
                >
                  Sair
                </Button>
              </>
            ) : (
              <Button
                onClick={() => window.location.href = getLoginUrl()}
                className="bg-[#f4c542] text-[#0a2f44] hover:bg-yellow-400"
              >
                Fazer Login
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0a2f44] to-[#1a4b6d] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Prepare-se para o Sucesso
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Plataforma interativa de estudo para Engenharia Informática. Quizzes, exames passados e acompanhamento de progresso em tempo real.
              </p>
              <div className="flex gap-4">
                {isAuthenticated ? (
                  <>
                    <Button
                      onClick={() => setLocation("/quiz")}
                      className="bg-[#f4c542] text-[#0a2f44] hover:bg-yellow-400 font-bold"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Iniciar Quiz
                    </Button>
                    <Button
                      onClick={() => setLocation("/exams")}
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-[#0a2f44]"
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Exames Passados
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => window.location.href = getLoginUrl()}
                    className="bg-[#f4c542] text-[#0a2f44] hover:bg-yellow-400 font-bold"
                  >
                    Começar Agora
                  </Button>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="text-6xl text-center opacity-20">
                <i className="fas fa-graduation-cap"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {isAuthenticated && (
        <div className="bg-white py-12 border-b border-[#e1e8ef]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="card-iph text-center">
                <div className="text-4xl font-bold text-[#3498db] mb-2">{globalScore || 0}</div>
                <p className="text-[#5a6a7d]">Pontos Acumulados</p>
              </Card>
              <Card className="card-iph text-center">
                <div className="text-4xl font-bold text-[#f4c542] mb-2">{disciplines?.length || 0}</div>
                <p className="text-[#5a6a7d]">Disciplinas</p>
              </Card>
              <Card className="card-iph text-center">
                <div className="text-4xl font-bold text-[#27ae60] mb-2">∞</div>
                <p className="text-[#5a6a7d]">Questões Disponíveis</p>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a2f44] text-center mb-12">
            Por Que Escolher IPH Mandume?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-iph text-center">
              <div className="w-12 h-12 rounded-lg bg-[#ecf3fa] flex-center text-2xl text-[#3498db] mx-auto mb-4">
                <BookOpen />
              </div>
              <h3 className="font-bold text-[#0a2f44] mb-2">Quizzes Interativos</h3>
              <p className="text-[#5a6a7d] text-sm">
                Pratique com questões embaralhadas e feedback imediato
              </p>
            </Card>

            <Card className="card-iph text-center">
              <div className="w-12 h-12 rounded-lg bg-[#ecf3fa] flex-center text-2xl text-[#3498db] mx-auto mb-4">
                <Award />
              </div>
              <h3 className="font-bold text-[#0a2f44] mb-2">Exames Passados</h3>
              <p className="text-[#5a6a7d] text-sm">
                Acesso a avaliações anteriores para preparação
              </p>
            </Card>

            <Card className="card-iph text-center">
              <div className="w-12 h-12 rounded-lg bg-[#ecf3fa] flex-center text-2xl text-[#3498db] mx-auto mb-4">
                <Zap />
              </div>
              <h3 className="font-bold text-[#0a2f44] mb-2">Progresso em Tempo Real</h3>
              <p className="text-[#5a6a7d] text-sm">
                Acompanhe sua pontuação e evolução
              </p>
            </Card>

            <Card className="card-iph text-center">
              <div className="w-12 h-12 rounded-lg bg-[#ecf3fa] flex-center text-2xl text-[#3498db] mx-auto mb-4">
                <Users />
              </div>
              <h3 className="font-bold text-[#0a2f44] mb-2">Comunidade</h3>
              <p className="text-[#5a6a7d] text-sm">
                Estude com colegas e compartilhe conhecimento
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Disciplines Section */}
      {disciplines && disciplines.length > 0 && (
        <div className="bg-white py-16 md:py-24 border-t border-[#e1e8ef]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a2f44] text-center mb-12">
              Disciplinas Disponíveis
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {disciplines.map((discipline) => (
                <Card key={discipline.id} className="card-iph">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#f0f4f8] flex-center text-2xl text-[#0a2f44]">
                      <i className={`fas ${discipline.icon}`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[#0a2f44] mb-1">{discipline.name}</h3>
                      <p className="text-[#5a6a7d] text-sm mb-3">{discipline.description}</p>
                      {isAuthenticated && (
                        <Button
                          onClick={() => setLocation("/quiz")}
                          variant="outline"
                          size="sm"
                          className="text-[#3498db] border-[#3498db] hover:bg-blue-50"
                        >
                          Estudar
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-[#0a2f44] to-[#1a4b6d] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para Começar?</h2>
            <p className="text-lg opacity-90 mb-8">
              Faça login para aceder aos quizzes, exames passados e acompanhe seu progresso.
            </p>
            <Button
              onClick={() => window.location.href = getLoginUrl()}
              className="bg-[#f4c542] text-[#0a2f44] hover:bg-yellow-400 font-bold text-lg px-8 py-3"
            >
              Fazer Login
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#0a2f44] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="opacity-80">
            © 2024 IPH Mandume - Plataforma de Estudos. Todos os direitos reservados.
          </p>
          <p className="text-sm opacity-60 mt-2">
            Engenharia Informática • Universidade Mandume Ya Ndemufayo
          </p>
        </div>
      </footer>
    </div>
  );
}
