import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, ArrowLeft, BookOpen } from 'lucide-react';
import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';

export default function StudyMaterial() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const params = new URLSearchParams(window.location.search);
  const disciplineSlug = params.get('discipline');
  
  const [material, setMaterial] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: disciplines } = trpc.quiz.getDisciplines.useQuery();

  useEffect(() => {
    if (!disciplineSlug || !disciplines) {
      setLoading(false);
      return;
    }

    const discipline = disciplines.find(d => d.slug === disciplineSlug);
    if (discipline && discipline.material) {
      setMaterial({
        title: discipline.name,
        content: discipline.material
      });
      setError(null);
    } else {
      setError('Material não encontrado para esta disciplina.');
    }
    setLoading(false);
  }, [disciplineSlug, disciplines]);

  if (!user) {
    return (
      <div className="flex-center min-h-screen">
        <p className="text-[#5a6a7d]">Por favor, faça login para aceder ao material de estudo.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#3498db]" />
      </div>
    );
  }

  if (!material || error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={() => setLocation('/')}
            className="mb-8 text-[#0a2f44] border-[#0a2f44]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Card className="card-iph text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto text-[#3498db] mb-4" />
            <p className="text-lg text-[#5a6a7d]">{error || 'Disciplina não encontrada.'}</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a2f44] to-[#1a4b6d] text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            onClick={() => setLocation('/')}
            className="mb-4 text-white border-white hover:bg-white hover:text-[#0a2f44]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{material.title}</h1>
          <p className="text-lg opacity-90">Material de estudo e referência</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="card-iph p-8 md:p-12">
          <div className="prose prose-sm md:prose-base max-w-none text-[#0a2f44] whitespace-pre-wrap">
            {material.content}
          </div>
        </Card>
      </div>
    </div>
  );
}
