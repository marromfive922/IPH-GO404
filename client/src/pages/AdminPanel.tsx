import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Download, Upload, Trash2, ArrowLeft, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

export default function AdminPanel() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'manage' | 'disciplines'>('manage');
  const [disciplineForm, setDisciplineForm] = useState({
    name: '',
    slug: '',
    icon: 'fa-book',
    description: '',
  });
  const [uploadData, setUploadData] = useState({
    disciplineId: '',
    title: '',
    year: new Date().getFullYear().toString(),
    type: 'frequency' as 'frequency' | 'final' | 'resource',
  });

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      setLocation('/');
    }
  }, [user, setLocation]);

  // Show loading while checking auth
  if (!user) {
    return (
      <div className="flex-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#3498db]" />
      </div>
    );
  }

  // Get all exams
  const { data: exams, isLoading, refetch } = trpc.exams.listAll.useQuery();

  // Get disciplines for upload form
  const { data: disciplines, refetch: refetchDisciplines } = trpc.quiz.getDisciplines.useQuery();

  // Create discipline mutation
  const createDisciplineMutation = trpc.quiz.createDiscipline.useMutation({
    onSuccess: () => {
      toast.success('Disciplina criada com sucesso!');
      setDisciplineForm({ name: '', slug: '', icon: 'fa-book', description: '' });
      refetchDisciplines();
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao criar disciplina');
    },
  });

  // Upload mutation
  const uploadMutation = trpc.exams.upload.useMutation({
    onSuccess: () => {
      toast.success('Exame enviado com sucesso!');
      setSelectedFile(null);
      setPreviewUrl(null);
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
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviewUrl(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadData.disciplineId || !uploadData.title) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = (reader.result as string).split(',')[1];
      uploadMutation.mutate({
        disciplineId: parseInt(uploadData.disciplineId),
        title: uploadData.title,
        year: parseInt(uploadData.year),
        type: uploadData.type,
        fileData: base64Data,
        fileName: selectedFile.name,
      });
    };
    reader.onerror = () => {
      toast.error('Erro ao ler o ficheiro');
    };
    reader.readAsDataURL(selectedFile);
  };

  const groupedExams = exams?.reduce((acc, exam) => {
    const discipline = disciplines?.find((d) => d.id === exam.disciplineId);
    const name = discipline?.name || 'Sem Disciplina';
    if (!acc[name]) acc[name] = [];
    acc[name].push(exam);
    return acc;
  }, {} as Record<string, typeof exams>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a2f44] to-[#1a4b6d] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <Button
              variant="outline"
              onClick={() => setLocation('/')}
              className="mb-4 text-white border-white hover:bg-white hover:text-[#0a2f44]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-4xl font-bold mb-2">Painel de Administração</h1>
            <p className="text-lg opacity-90">Gerir exames e conteúdos da plataforma</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#e1e8ef]">
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'manage'
                ? 'border-[#3498db] text-[#3498db]'
                : 'border-transparent text-[#5a6a7d] hover:text-[#0a2f44]'
            }`}
          >
            Gerir Exames
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'upload'
                ? 'border-[#3498db] text-[#3498db]'
                : 'border-transparent text-[#5a6a7d] hover:text-[#0a2f44]'
            }`}
          >
            Enviar Novo Exame
          </button>
          <button
            onClick={() => setActiveTab('disciplines')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'disciplines'
                ? 'border-[#3498db] text-[#3498db]'
                : 'border-transparent text-[#5a6a7d] hover:text-[#0a2f44]'
            }`}
          >
            Criar Disciplina
          </button>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="max-w-2xl">
            <Card className="card-iph p-8">
              <div className="space-y-6">
                {/* Discipline Select */}
                <div>
                  <label className="block text-sm font-medium text-[#0a2f44] mb-2">Disciplina *</label>
                  <Select value={uploadData.disciplineId} onValueChange={(value) => setUploadData({ ...uploadData, disciplineId: value })}>
                    <SelectTrigger className="border-[#e1e8ef]">
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

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-[#0a2f44] mb-2">Título do Exame *</label>
                  <Input
                    placeholder="Ex: Exame Final 2024"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                    className="border-[#e1e8ef]"
                  />
                </div>

                {/* Year and Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0a2f44] mb-2">Ano *</label>
                    <Input
                      type="number"
                      value={uploadData.year}
                      onChange={(e) => setUploadData({ ...uploadData, year: e.target.value })}
                      className="border-[#e1e8ef]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0a2f44] mb-2">Tipo *</label>
                    <Select value={uploadData.type} onValueChange={(value) => setUploadData({ ...uploadData, type: value as any })}>
                      <SelectTrigger className="border-[#e1e8ef]">
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

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-[#0a2f44] mb-2">Ficheiro (PDF ou Imagem) *</label>
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={handleFileSelect}
                    className="block w-full text-sm text-[#5a6a7d] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#ecf3fa] file:text-[#3498db] hover:file:bg-[#d4e8f7]"
                  />
                </div>

                {/* Preview */}
                {previewUrl && (
                  <div>
                    <p className="text-sm font-medium text-[#0a2f44] mb-2">Pré-visualização</p>
                    <img src={previewUrl} alt="Preview" className="max-h-64 rounded-lg border border-[#e1e8ef]" />
                  </div>
                )}

                {/* Upload Button */}
                <Button onClick={handleUpload} disabled={uploadMutation.isPending} className="btn-iph-primary w-full">
                  {uploadMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Enviar Exame
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Manage Tab */}
        {activeTab === 'manage' && (
          <div>
            {isLoading ? (
              <div className="flex-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#3498db]" />
              </div>
            ) : Object.keys(groupedExams || {}).length === 0 ? (
              <Card className="card-iph text-center py-12">
                <p className="text-[#5a6a7d] mb-4">Nenhum exame disponível no momento.</p>
                <Button onClick={() => setActiveTab('upload')} className="btn-iph-primary">
                  <Upload className="w-4 h-4 mr-2" />
                  Enviar Primeiro Exame
                </Button>
              </Card>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedExams || {}).map(([disciplineName, disciplineExams]) => (
                  <div key={disciplineName}>
                    <h2 className="text-2xl font-bold text-[#0a2f44] mb-4">{disciplineName}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {disciplineExams?.map((exam) => (
                        <Card key={exam.id} className="card-iph overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                          {/* Thumbnail */}
                          <div className="h-32 bg-gradient-to-br from-[#3498db] to-[#2980b9] flex-center text-white">
                            {exam.fileUrl?.toLowerCase().endsWith('.pdf') ? (
                              <div className="text-center">
                                <i className="fas fa-file-pdf text-4xl mb-2"></i>
                                <p className="text-xs">PDF</p>
                              </div>
                            ) : (
                              <div className="text-center">
                                <i className="fas fa-image text-4xl mb-2"></i>
                                <p className="text-xs">Imagem</p>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-[#0a2f44] mb-1 line-clamp-2">{exam.title}</h3>
                            <p className="text-sm text-[#5a6a7d] mb-3">
                              {exam.year} • {exam.type === 'frequency' ? 'Frequência' : exam.type === 'final' ? 'Exame Final' : 'Recurso'}
                            </p>
                            
                            {/* Actions */}
                            <div className="flex gap-2 pt-3 border-t border-[#e1e8ef] mt-auto">
                              <a href={exam.fileUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                                <Button variant="outline" size="sm" className="w-full">
                                  <Eye className="w-4 h-4 mr-1" />
                                  Ver
                                </Button>
                              </a>
                              <a href={exam.fileUrl} download className="flex-1">
                                <Button variant="outline" size="sm" className="w-full">
                                  <Download className="w-4 h-4 mr-1" />
                                  Descarregar
                                </Button>
                              </a>
                              <Button
                                onClick={() => deleteMutation.mutate({ examId: exam.id })}
                                disabled={deleteMutation.isPending}
                                variant="destructive"
                                size="sm"
                                className="flex-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Disciplines Tab */}
        {activeTab === 'disciplines' && (
          <div className="max-w-2xl">
            <Card className="card-iph p-8">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#0a2f44] mb-2">Nome da Disciplina *</label>
                  <Input
                    placeholder="Ex: Programação Web"
                    value={disciplineForm.name}
                    onChange={(e) => setDisciplineForm({ ...disciplineForm, name: e.target.value })}
                    className="border-[#e1e8ef]"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-[#0a2f44] mb-2">Slug (URL-friendly) *</label>
                  <Input
                    placeholder="Ex: prog-web"
                    value={disciplineForm.slug}
                    onChange={(e) => setDisciplineForm({ ...disciplineForm, slug: e.target.value })}
                    className="border-[#e1e8ef]"
                  />
                </div>

                {/* Icon */}
                <div>
                  <label className="block text-sm font-medium text-[#0a2f44] mb-2">Ícone (FontAwesome) *</label>
                  <Input
                    placeholder="Ex: fa-code"
                    value={disciplineForm.icon}
                    onChange={(e) => setDisciplineForm({ ...disciplineForm, icon: e.target.value })}
                    className="border-[#e1e8ef]"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-[#0a2f44] mb-2">Descrição</label>
                  <Input
                    placeholder="Descrição breve da disciplina"
                    value={disciplineForm.description}
                    onChange={(e) => setDisciplineForm({ ...disciplineForm, description: e.target.value })}
                    className="border-[#e1e8ef]"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  onClick={() => createDisciplineMutation.mutate(disciplineForm)}
                  disabled={createDisciplineMutation.isPending || !disciplineForm.name || !disciplineForm.slug}
                  className="btn-iph-primary w-full"
                >
                  {createDisciplineMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Criando...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Criar Disciplina
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
