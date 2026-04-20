import { useState, useEffect } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, ChevronRight, Trophy, RotateCcw } from 'lucide-react';
import { useLocation } from 'wouter';

interface Question {
  id: number;
  text: string;
  options: string[];
  explanation?: string;
}

export default function Quiz() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [disciplineId, setDisciplineId] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Get disciplines
  const { data: disciplines, isLoading: disciplinesLoading } = trpc.quiz.getDisciplines.useQuery();

  // Get questions for selected discipline
  const { data: questions, isLoading: questionsLoading } = trpc.quiz.getQuestions.useQuery(
    { disciplineId: disciplineId || 0 },
    { enabled: disciplineId !== null }
  );

  // Submit answer mutation
  const submitAnswerMutation = trpc.quiz.submitAnswer.useMutation();

  // Get user score
  const { data: userScore } = trpc.quiz.getUserScore.useQuery(
    { disciplineId: disciplineId || 0 },
    { enabled: disciplineId !== null }
  );

  const currentQuestion = questions?.[currentQuestionIndex];
  const progress = disciplineId && questions ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const handleSelectDiscipline = (id: number) => {
    setDisciplineId(id);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setTotalAttempts(0);
    setShowResults(false);
  };

  const handleSelectAnswer = async (optionIndex: number) => {
    if (answered || !currentQuestion) return;

    setSelectedAnswer(optionIndex);
    setAnswered(true);

    try {
      const result = await submitAnswerMutation.mutateAsync({
        disciplineId: disciplineId!,
        questionId: currentQuestion.id,
        selectedOptionIndex: optionIndex,
      });

      // Server returns the correct answer index
      setCorrectAnswerIndex(result.correctOptionIndex);
      setScore(result.score);
      setTotalAttempts(result.totalAttempts);

      // Auto-advance after 1.5s if correct
      if (result.isCorrect) {
        setTimeout(() => {
          handleNextQuestion();
        }, 1500);
      }
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  const handleNextQuestion = () => {
    if (!questions) return;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setCorrectAnswerIndex(null);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setTotalAttempts(0);
    setShowResults(false);
  };

  const handleBackToDisciplines = () => {
    setDisciplineId(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  // If not authenticated, show login message
  if (!user) {
    return (
      <div className="flex-center min-h-screen">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Autenticação Necessária</h2>
          <p className="text-muted-foreground mb-6">
            Faça login para aceder aos quizzes e guardar o seu progresso.
          </p>
          <Button onClick={() => setLocation('/login')}>Fazer Login</Button>
        </Card>
      </div>
    );
  }

  // Show disciplines selection
  if (!disciplineId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0a2f44] mb-2">Quizzes Interativos</h1>
            <p className="text-lg text-[#5a6a7d]">Escolha uma disciplina para começar</p>
          </div>

          {disciplinesLoading ? (
            <div className="flex-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#3498db]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {disciplines?.map((discipline) => (
                <Card
                  key={discipline.id}
                  className="card-iph cursor-pointer hover:shadow-xl transform hover:-translate-y-1 transition-all"
                  onClick={() => handleSelectDiscipline(discipline.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#f0f4f8] flex-center text-2xl text-[#0a2f44]">
                      <i className={`fas ${discipline.icon}`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#0a2f44] mb-2">{discipline.name}</h3>
                      <p className="text-[#5a6a7d] mb-4">{discipline.description}</p>
                      <div className="flex items-center text-[#3498db] font-semibold">
                        Iniciar Quiz <ChevronRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show results screen
  if (showResults && questions) {
    const percentage = Math.round((score / (questions.length * 10)) * 100);
    const discipline = disciplines?.find((d) => d.id === disciplineId);

    return (
      <div className="flex-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Card className="card-iph max-w-md w-full text-center">
          <div className="mb-6">
            <Trophy className="w-16 h-16 text-[#f4c542] mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-[#0a2f44] mb-2">Quiz Concluído!</h2>
            <p className="text-[#5a6a7d]">Você completou o módulo de {discipline?.name}</p>
          </div>

          <div className="bg-[#f0f4f8] rounded-2xl p-8 mb-6">
            <div className="text-5xl font-bold text-[#0a2f44] mb-2">{percentage}%</div>
            <div className="text-[#5a6a7d]">Aproveitamento</div>
          </div>

          <p className="text-[#5a6a7d] mb-8">
            Você acertou <span className="font-bold text-[#0a2f44]">{score / 10}</span> de{' '}
            <span className="font-bold text-[#0a2f44]">{questions.length}</span> questões.
          </p>

          <div className="flex gap-4">
            <Button onClick={handleRestartQuiz} variant="outline" className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
            <Button onClick={handleBackToDisciplines} className="btn-iph-primary flex-1">
              Voltar
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Show quiz interface
  if (!currentQuestion) {
    return (
      <div className="flex-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#3498db]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button onClick={handleBackToDisciplines} variant="ghost" className="mb-4">
            ← Voltar
          </Button>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-[#0a2f44]">
              {disciplines?.find((d) => d.id === disciplineId)?.name}
            </h1>
            <div className="badge-iph">
              Questão {currentQuestionIndex + 1} de {questions?.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-iph">
            <div className="progress-fill-iph" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Score Display */}
        <Card className="card-iph mb-6 bg-gradient-to-r from-[#0a2f44] to-[#1a4b6d] text-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Pontuação Atual</p>
              <p className="text-3xl font-bold">{score}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Acertos</p>
              <p className="text-3xl font-bold">{score / 10}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Tentativas</p>
              <p className="text-3xl font-bold">{totalAttempts}</p>
            </div>
          </div>
        </Card>

        {/* Question */}
        <Card className="card-iph mb-8">
          <h2 className="text-2xl font-bold text-[#0a2f44] mb-8">{currentQuestion.text}</h2>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                onClick={() => !answered && handleSelectAnswer(index)}
                className={`option-card-iph ${
                  selectedAnswer === index ? 'selected' : ''
                } ${answered && index === correctAnswerIndex ? 'correct' : ''} ${answered && selectedAnswer === index && index !== correctAnswerIndex ? 'incorrect' : ''}`}
              >
                <span className="font-bold text-lg mr-3">{String.fromCharCode(65 + index)}.</span>
                <span>{option}</span>
              </div>
            ))}
          </div>

          {/* Feedback */}
          {answered && (
            <div className={selectedAnswer === correctAnswerIndex ? 'feedback-success-iph' : 'feedback-error-iph'}>
              <i className={`fas ${selectedAnswer === correctAnswerIndex ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
              <div>
                {selectedAnswer === correctAnswerIndex ? 'Resposta correta!' : 'Resposta incorreta.'}
                {currentQuestion.explanation && (
                  <p className="text-sm mt-2 opacity-90">{currentQuestion.explanation}</p>
                )}
              </div>
            </div>
          )}
        </Card>

        {/* Next Button */}
        {answered && (
          <div className="flex justify-end">
            <Button onClick={handleNextQuestion} className="btn-iph-primary">
              {currentQuestionIndex === (questions?.length || 0) - 1 ? 'Ver Resultados' : 'Próxima Questão'}{' '}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
