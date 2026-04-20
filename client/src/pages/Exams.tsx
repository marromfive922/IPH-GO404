import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Download, Upload, Trash2, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function Exams() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadData, setUploadData] = useState({
    disciplineId: '',
    title: '',
    year: new Date().getFullYear().toString(),
    type: 'frequency' as 'frequency' | 'final' | 'resource',
  });

  // Get all exams
  const { data: exams, isLoading, refetch } = trpc.exams.listAll.useQuery();

  // Get disciplines for upload form
  const { data: disciplines } = trpc.quiz.getDisciplines.useQuery();

  // Upload mutation
  const uploadMutation = trpc.exams.upload.useMutation({
    onSuccess: () => {
      toast.success('Exame enviado com sucesso!');
      setSelectedFile(null);
      setUploadData({
        disciplineId: '',
        title: '',
        year: new Date().getFullYear().toString(),
        type: 'frequency',
      });
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao enviar exame');
    },
  });

  // Delete mutation
  const deleteMutation = trpc.exams.delete.useMutation({
    onSuccess: () => {
      toast.success('Exame eliminado com sucesso!');
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao eliminar exame');
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      toast.error('Por favor, selecione um ficheiro PDF válido');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadData.disciplineId || !uploadData.title) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileData = e.target?.result as string;
      const base64Data = fileData.split(',')[1];

      await uploadMutation.mutateAsync({
        disciplineId: parseInt(uploadData.disciplineId),
        title: uploadData.title,
        year: parseInt(uploadData.year),
        type: uploadData.type,
        fileData: base64Data,
        fileName: selectedFile.name,
      });
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDelete = (examId: number) => {
    if (confirm('Tem a certeza que deseja eliminar este exame?')) {
      deleteMutation.mutate({ examId });
    }
  };

  const groupedExams = exams?.reduce(
    (acc, exam) => {
      const discipline = disciplines?.find((d) => d.id === exam.disciplineId);
      const key = discipline?.name || 'Desconhecida';
      if (!acc[key]) acc[key] = [];
      acc[key].push(exam);
      return acc;
    },
    {} as Record<string, typeof exams>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#0a2f44] mb-2">Exames Passados</h1>
              <p className="text-lg text-[#5a6a7d]">Repositório de avaliações anteriores para estudo</p>
            </div>
            {user?.role === 'admin' && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="btn-iph-primary">
                    <Upload className="w-4 h-4 mr-2" />
                    Enviar Exame
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Enviar Novo Exame</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[#0a2f44]">Disciplina</label>
                      <Select value={uploadData.disciplineId} onValueChange={(value) => setUploadData({ ...uploadData, disciplineId: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma disciplina" />
                        </SelectTrigger>
                        <SelectContent>
                          {disciplines?.map((d) => (
                            <SelectItem key={d.id} value={d.id.toString()}>
                              {d.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-[#0a2f44]">Título</label>
                      <Input
                        placeholder="Ex: Exame Final 2024"
                        value={uploadData.title}
                        onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-[#0a2f44]">Ano</label>
                        <Input
                          type="number"
                          min="2000"
                          max={new Date().getFullYear()}
                          value={uploadData.year}
                          onChange={(e) => setUploadData({ ...uploadData, year: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#0a2f44]">Tipo</label>
                        <Select value={uploadData.type} onValueChange={(value) => setUploadData({ ...uploadData, type: value as any })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="frequency">Frequência</SelectItem>
                            <SelectItem value="final">Exame Final</SelectItem>
                            <SelectItem value="resource">Recurso</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-[#0a2f44]">Ficheiro PDF</label>
                      <Input type="file" accept=".pdf" onChange={handleFileSelect} />
                      {selectedFile && <p className="text-sm text-[#27ae60] mt-2">✓ {selectedFile.name}</p>}
                    </div>

                    <Button onClick={handleUpload} disabled={uploadMutation.isPending} className="btn-iph-primary w-full">
                      {uploadMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Enviar
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Exams List */}
        {isLoading ? (
          <div className="flex-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#3498db]" />
          </div>
        ) : Object.keys(groupedExams || {}).length === 0 ? (
          <Card className="card-iph text-center py-12">
            <p className="text-[#5a6a7d] mb-4">Nenhum exame disponível no momento.</p>
            {user?.role === 'admin' && <p className="text-sm text-[#5a6a7d]">Comece enviando um novo exame.</p>}
          </Card>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedExams || {}).map(([disciplineName, disciplineExams]) => (
              <div key={disciplineName}>
                <h2 className="text-2xl font-bold text-[#0a2f44] mb-4">{disciplineName}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {disciplineExams?.map((exam) => (
                    <Card key={exam.id} className="card-iph flex flex-col">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-[#fdeaea] flex-center text-[#e74c3c]">
                            <i className="fas fa-file-pdf"></i>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-[#0a2f44]">{exam.title}</h3>
                            <p className="text-sm text-[#5a6a7d]">
                              {exam.year} • {exam.type === 'frequency' ? 'Frequência' : exam.type === 'final' ? 'Exame Final' : 'Recurso'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-[#e1e8ef]">
                        <a href={exam.fileUrl} download className="flex-1">
                          <Button variant="outline" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </a>
                        {user?.role === 'admin' && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(exam.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Box */}
        <Card className="card-iph mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <div className="flex gap-4">
            <div className="text-3xl">💡</div>
            <div>
              <h3 className="font-bold text-[#0a2f44] mb-2">Dica de Estudo</h3>
              <p className="text-[#5a6a7d]">
                Resolver exames de anos anteriores é uma das formas mais eficazes de se preparar para as avaliações reais. Tente resolver sem consultar os apontamentos primeiro!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
