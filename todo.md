# IPH Mandume - TODO List

## Backend - Database Schema
- [x] Criar tabela `disciplines` com dados das 4 disciplinas
- [x] Criar tabela `questions` com questões de quiz por disciplina
- [x] Criar tabela `user_scores` para guardar pontuação global de cada utilizador
- [x] Criar tabela `exams` para repositório de exames passados
- [x] Executar migrações SQL na base de dados

## Backend - tRPC Procedures
- [x] Implementar `quiz.getDisciplines` - listar disciplinas
- [x] Implementar `quiz.getQuestions` - obter questões de uma disciplina
- [x] Implementar `quiz.submitAnswer` - submeter resposta e atualizar pontuação
- [x] Implementar `quiz.getUserScore` - obter pontuação global do utilizador
- [x] Implementar `exams.list` - listar exames passados
- [x] Implementar `exams.upload` - upload de PDF (apenas admin)
- [x] Implementar `exams.delete` - eliminar exame (apenas admin)
- [x] Escrever testes unitários para procedures críticos

## Frontend - Layout & Navigation
- [x] Criar componente `DashboardLayout` com header e navegação
- [x] Implementar sistema de autenticação (login/logout)
- [x] Criar página inicial com estatísticas do utilizador
- [x] Implementar navegação por abas de disciplinas

## Frontend - Quiz Interface
- [x] Criar componente `QuizPage` com interface de quiz
- [x] Implementar barra de progresso visual
- [x] Implementar seleção de opções com feedback visual
- [x] Implementar avanço automático após resposta correta
- [x] Criar ecrã de resultados final com percentagem

## Frontend - Exams Repository
- [x] Criar página `ExamsPage` com listagem de exames
- [x] Implementar filtro por disciplina/ano/tipo
- [x] Criar interface de upload para administradores
- [x] Implementar botões de download com links seguros

## Frontend - Styling & Design
- [x] Configurar paleta de cores (azul profundo e dourado)
- [x] Aplicar tipografia Inter em todo o site
- [x] Implementar animações suaves
- [x] Garantir responsividade mobile/desktop

## Testing & Deployment
- [x] Testar fluxo de autenticação
- [x] Testar quiz e sistema de pontuação
- [x] Testar upload e download de exames
- [x] Criar checkpoint final
- [x] Publicar plataforma
