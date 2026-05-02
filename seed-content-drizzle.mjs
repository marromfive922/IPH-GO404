import { drizzle } from 'drizzle-orm/mysql2/driver';
import mysql from 'mysql2/promise';
import { disciplines, questions } from './drizzle/schema.ts';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const disciplineContent = [
  { id: 1, material: '# Arquitetura de Computadores\n\nEstudo da estrutura e organização dos sistemas computacionais.' },
  { id: 2, material: '# Teoria da Computação\n\nPrincípios matemáticos que fundamentam a computação.' },
  { id: 3, material: '# Sistemas Operativos\n\nGerenciamento de recursos do computador.' },
  { id: 4, material: '# Protocolos de Rede\n\nRegras de comunicação entre computadores.' },
  { id: 5, material: '# Redes de Computador\n\nInterconexão de computadores e dispositivos.' },
  { id: 6, material: '# Programação Orientada a Objetos\n\nParadigma de programação baseado em objetos.' },
  { id: 7, material: '# Algoritmos e Estrutura de Dados\n\nMétodos de resolução de problemas e organização de dados.' },
  { id: 8, material: '# Base de Dados\n\nArmazenamento e gestão organizada de dados.' },
  { id: 9, material: '# Compiladores\n\nTradução de código fonte para código máquina.' },
  { id: 10, material: '# Inteligência Artificial\n\nSimulação de inteligência em máquinas.' },
  { id: 11, material: '# Sistemas Distribuídos e Paralelos\n\nComputação em múltiplos processadores.' },
  { id: 12, material: '# Sistema de Informação\n\nConjunto integrado de componentes para processar dados.' },
  { id: 13, material: '# Sistema de Gestão de Dados\n\nGestão do ciclo de vida dos dados.' },
  { id: 14, material: '# Computação Gráfica\n\nCriação e manipulação de imagens digitais.' },
  { id: 15, material: '# Integração de Sistemas\n\nConexão de sistemas diferentes.' },
  { id: 16, material: '# Multimédia\n\nCombinação de diferentes tipos de mídia.' },
  { id: 17, material: '# Engenharia de Software\n\nProcesso de desenvolvimento de software.' }
];

const questionsData = {
  1: [
    { text: 'O que é a CPU?', options: JSON.stringify(['Memória do computador', 'Unidade Central de Processamento', 'Disco rígido', 'Placa de vídeo']), correctIndex: 1 },
    { text: 'Qual é a ordem correta do ciclo de instruções?', options: JSON.stringify(['Fetch, Decode, Execute, Write-back', 'Execute, Fetch, Decode, Write-back', 'Decode, Fetch, Execute, Write-back', 'Write-back, Execute, Decode, Fetch']), correctIndex: 0 },
  ],
  2: [
    { text: 'O que é uma Máquina de Turing?', options: JSON.stringify(['Um computador real', 'Um modelo matemático de computação', 'Uma linguagem de programação', 'Um sistema operativo']), correctIndex: 1 },
    { text: 'Qual é a diferença entre DFA e NFA?', options: JSON.stringify(['DFA é mais rápido', 'NFA pode estar em múltiplos estados', 'Não há diferença', 'DFA é mais poderoso']), correctIndex: 1 },
  ],
  3: [
    { text: 'Qual é a função principal de um SO?', options: JSON.stringify(['Executar programas', 'Gerenciar recursos', 'Ambas as anteriores', 'Nenhuma das anteriores']), correctIndex: 2 },
    { text: 'O que é paginação?', options: JSON.stringify(['Divisão de memória em páginas', 'Criação de ficheiros', 'Compressão de dados', 'Criptografia']), correctIndex: 0 },
  ],
  4: [
    { text: 'Quantas camadas tem o modelo OSI?', options: JSON.stringify(['5', '6', '7', '8']), correctIndex: 2 },
    { text: 'O que é TCP/IP?', options: JSON.stringify(['Um protocolo de rede', 'Um sistema operativo', 'Um navegador web', 'Uma linguagem de programação']), correctIndex: 0 },
  ],
  5: [
    { text: 'O que é uma LAN?', options: JSON.stringify(['Rede Local', 'Rede Ampla', 'Rede Sem Fio', 'Rede Metropolitana']), correctIndex: 0 },
    { text: 'Qual é a função de um Router?', options: JSON.stringify(['Conectar computadores', 'Rotear pacotes entre redes', 'Armazenar dados', 'Processar dados']), correctIndex: 1 },
  ],
  6: [
    { text: 'O que é encapsulamento?', options: JSON.stringify(['Proteção de dados', 'Herança de classes', 'Polimorfismo', 'Abstração']), correctIndex: 0 },
    { text: 'Quantos pilares tem a POO?', options: JSON.stringify(['2', '3', '4', '5']), correctIndex: 2 },
  ],
  7: [
    { text: 'Qual é a complexidade do Quick Sort no melhor caso?', options: JSON.stringify(['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)']), correctIndex: 1 },
    { text: 'O que é uma pilha?', options: JSON.stringify(['FIFO', 'LIFO', 'FILO', 'LIFI']), correctIndex: 1 },
  ],
  8: [
    { text: 'O que é SQL?', options: JSON.stringify(['Linguagem de programação', 'Linguagem de consulta de BD', 'Sistema operativo', 'Protocolo de rede']), correctIndex: 1 },
    { text: 'O que significa ACID?', options: JSON.stringify(['Ácido', 'Atomicidade, Consistência, Isolamento, Durabilidade', 'Algoritmo', 'Aplicação']), correctIndex: 1 },
  ],
  9: [
    { text: 'Qual é a primeira fase da compilação?', options: JSON.stringify(['Análise Sintática', 'Análise Léxica', 'Geração de Código', 'Otimização']), correctIndex: 1 },
    { text: 'O que é AST?', options: JSON.stringify(['Árvore de Sintaxe Abstrata', 'Algoritmo de Busca', 'Análise de Segurança', 'Aplicação de Sistema']), correctIndex: 0 },
  ],
  10: [
    { text: 'O que é Machine Learning?', options: JSON.stringify(['Aprendizado automático', 'Máquina de aprender', 'Linguagem de máquina', 'Modelo de aprendizado']), correctIndex: 0 },
    { text: 'Qual é a diferença entre IA Fraca e IA Forte?', options: JSON.stringify(['Velocidade', 'Memória', 'Simulação vs Inteligência Real', 'Custo']), correctIndex: 2 },
  ],
  11: [
    { text: 'O que é paralelismo de dados?', options: JSON.stringify(['Dados em paralelo', 'Mesmo código, dados diferentes', 'Tarefas diferentes', 'Nenhuma das anteriores']), correctIndex: 1 },
    { text: 'Qual é um desafio em sistemas distribuídos?', options: JSON.stringify(['Velocidade', 'Sincronização', 'Memória', 'Armazenamento']), correctIndex: 1 },
  ],
  12: [
    { text: 'O que é um ERP?', options: JSON.stringify(['Enterprise Resource Planning', 'Enterprise Reporting Program', 'Error Recovery Protocol', 'Electronic Resource Protocol']), correctIndex: 0 },
    { text: 'Qual é um componente de um SI?', options: JSON.stringify(['Hardware', 'Software', 'Dados', 'Todas as anteriores']), correctIndex: 3 },
  ],
  13: [
    { text: 'O que é ETL?', options: JSON.stringify(['Extract, Transform, Load', 'Error, Test, Launch', 'Encrypt, Transmit, Log', 'Evaluate, Track, Link']), correctIndex: 0 },
    { text: 'O que é um Data Warehouse?', options: JSON.stringify(['Armazém de dados', 'Proteção de dados', 'Processamento de dados', 'Visualização de dados']), correctIndex: 0 },
  ],
  14: [
    { text: 'O que é um pixel?', options: JSON.stringify(['Imagem pequena', 'Unidade básica de imagem', 'Cor', 'Transformação']), correctIndex: 1 },
    { text: 'Qual é a diferença entre Rasterização e Ray Tracing?', options: JSON.stringify(['Velocidade', 'Qualidade', 'Método de renderização', 'Aplicação']), correctIndex: 2 },
  ],
  15: [
    { text: 'O que é SOA?', options: JSON.stringify(['Service-Oriented Architecture', 'System Operating Architecture', 'Software Organization Architecture', 'Security Oriented Architecture']), correctIndex: 0 },
    { text: 'Qual é um padrão de integração?', options: JSON.stringify(['Point-to-Point', 'Hub-and-Spoke', 'Message Bus', 'Todas as anteriores']), correctIndex: 3 },
  ],
  16: [
    { text: 'O que é compressão sem perda?', options: JSON.stringify(['ZIP, PNG, FLAC', 'JPEG, MP3', 'Ambas', 'Nenhuma']), correctIndex: 0 },
    { text: 'Qual é um formato de vídeo?', options: JSON.stringify(['MP4', 'AVI', 'MOV', 'Todas as anteriores']), correctIndex: 3 },
  ],
  17: [
    { text: 'O que é Engenharia de Software?', options: JSON.stringify(['Reparação de software', 'Processo de desenvolvimento de software', 'Linguagem de programação', 'Hardware']), correctIndex: 1 },
    { text: 'Qual é uma metodologia ágil?', options: JSON.stringify(['Waterfall', 'Scrum', 'V-Model', 'Nenhuma']), correctIndex: 1 },
  ]
};

try {
  console.log('Adicionando material às disciplinas...');
  for (const content of disciplineContent) {
    await connection.execute(
      'UPDATE disciplines SET material = ? WHERE id = ?',
      [content.material, content.id]
    );
    console.log(`✓ Material adicionado para disciplina ${content.id}`);
  }

  console.log('\nAdicionando questões...');
  for (const [disciplineId, qs] of Object.entries(questionsData)) {
    for (const q of qs) {
      await connection.execute(
        'INSERT INTO questions (disciplineId, text, options, correctOptionIndex) VALUES (?, ?, ?, ?)',
        [parseInt(disciplineId), q.text, q.options, q.correctIndex]
      );
    }
    console.log(`✓ ${qs.length} questões adicionadas para disciplina ${disciplineId}`);
  }

  console.log('\n✅ Conteúdo e questões adicionados com sucesso!');
} catch (error) {
  console.error('Erro:', error.message);
} finally {
  await connection.end();
}
