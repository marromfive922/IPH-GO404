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


## Correções e Melhorias Solicitadas

- [x] Corrigir tela de login: mudar "IPH Mandume" para "IPH GO" (nota: tela OAuth gerida por Manus)
- [x] Remover texto "fornecido por manus" da tela de login (nota: gerido por Manus)
- [x] Corrigir navegação de exames passados ao selecionar disciplina
- [x] Implementar painel de admin para upload de exames (PDF/Imagem)
- [x] Implementar visualização de exames no painel de admin
- [x] Implementar exclusão de exames no painel de admin
- [x] Testar fluxo completo de admin
- [x] Criar checkpoint final


## Novas Funcionalidades - Disciplinas e Estudo

- [x] Adicionar 12 novas disciplinas à base de dados
- [x] Criar seed script com todas as disciplinas
- [x] Implementar funcionalidade de criar disciplina no painel de admin
- [x] Criar página de estudo (StudyMaterial.tsx) com matéria explicada
- [x] Adicionar botão "Estudar" nas disciplinas que leva para a página de matéria
- [x] Testar fluxo completo de disciplinas e estudo
- [x] Criar checkpoint final


## Correções Prioritárias - Bugs Reportados

- [x] Diagnosticar e corrigir erro de upload de exames
- [x] Modificar botão Quiz para abrir direto o quiz da disciplina
- [x] Testar upload de exames com PDF e imagens
- [x] Testar navegação direta para quiz
- [x] Criar checkpoint com correções


## Correções Adicionais - Conteúdo e Navegação

- [x] Diagnosticar e corrigir erro ao clicar em disciplinas
- [x] Adicionar conteúdo de material para todas as 17 disciplinas
- [x] Adicionar questões de quiz para todas as 17 disciplinas
- [x] Remover botão Quiz da navegação ao lado de Exames Passados
- [x] Testar navegação e carregamento de conteúdo
- [x] Criar checkpoint final


## Correções Finais - Bugs e Funcionalidades

- [x] Corrigir erro "não encontrada" ao clicar em Material de disciplinas
- [x] Restaurar botão Quiz nas disciplinas
- [x] Remover botão "Iniciar Quiz" do topo (ao lado de Exames Passados)
- [x] Adicionar conteúdo de matéria para disciplinas faltantes
- [x] Adicionar quiz para disciplinas faltantes
- [x] Testar navegação de Material e Quiz
- [x] Criar checkpoint final


## Correções de UI/UX - Sessão Atual

- [x] Corrigir delay visual no feedback de quiz (mostrar verde imediato sem vermelho)
- [x] Corrigir mapeamento de 'Interação Homem-Máquina' (ihm)
- [x] Adicionar material educativo para Protocolo de Comunicação
- [x] Adicionar material educativo para Sistemas Operativos
- [x] Adicionar material educativo para Arquitetura de Computadores
- [x] Renomear 'gestão-men' para 'gestão-dados' no sistema
- [x] Testar fluxo completo end-to-end
- [x] Criar checkpoint final
