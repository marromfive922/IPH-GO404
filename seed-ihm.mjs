import mysql from 'mysql2/promise';

const ihmMaterial = 'INTERAÇÃO HOMEM-MÁQUINA\n\n1. CONCEITOS FUNDAMENTAIS\n- IHM: Estudo da interação entre humanos e computadores\n- Usabilidade: Facilidade de uso\n- Acessibilidade: Uso por pessoas com deficiências\n- Experiência do Utilizador (UX)\n\n2. PRINCÍPIOS DE DESIGN\n- Visibilidade: Feedback claro\n- Restrição: Limitar ações inválidas\n- Mapeamento: Relação entre controles e efeitos\n- Consistência: Padrões uniformes\n- Recuperação de Erros: Mensagens claras\n- Prevenção de Erros: Evitar problemas\n\n3. INTERFACES DE UTILIZADOR\n- CLI (Command Line Interface)\n- GUI (Graphical User Interface)\n- NUI (Natural User Interface)\n- VUI (Voice User Interface)\n- Touchscreen, Gestos\n\n4. USABILIDADE\n- Eficiência: Realização rápida de tarefas\n- Eficácia: Alcance de objetivos\n- Satisfação: Experiência agradável\n- Testes de Usabilidade\n- Heurísticas de Nielsen\n\n5. ACESSIBILIDADE\n- WCAG (Web Content Accessibility Guidelines)\n- Contraste de cores\n- Navegação por teclado\n- Leitores de tela\n- Legendas, Descrições de áudio\n\n6. DESIGN RESPONSIVO\n- Mobile-first\n- Breakpoints\n- Flexibilidade\n- Toque vs. Clique\n\n7. PSICOLOGIA COGNITIVA\n- Memória: Curta, Longa\n- Atenção: Foco, Distração\n- Percepção: Visual, Auditiva\n- Carga Cognitiva\n- Modelos Mentais';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

await connection.execute(
  'UPDATE disciplines SET material = ? WHERE slug = ?',
  [ihmMaterial, 'ihm']
);

console.log('✓ Material adicionado para Interação Homem-Máquina!');
await connection.end();
