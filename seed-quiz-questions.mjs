import mysql from 'mysql2/promise';

const questionsData = [
  { disciplineId: 30001, questions: [
    { text: 'Qual é o modelo de referência para redes?', options: ['OSI', 'TCP/IP', 'ISO', 'IEEE'], correct: 0 },
    { text: 'Qual camada do OSI é responsável pelo roteamento?', options: ['Física', 'Enlace', 'Rede', 'Transporte'], correct: 2 },
    { text: 'Qual protocolo é orientado a conexão?', options: ['UDP', 'TCP', 'ICMP', 'ARP'], correct: 1 },
    { text: 'Quantos octetos tem um endereço IPv4?', options: ['2', '3', '4', '8'], correct: 2 },
    { text: 'Qual é a função de um firewall?', options: ['Roteamento', 'Controle de tráfego', 'Compressão', 'Criptografia'], correct: 1 },
  ]},
  { disciplineId: 30002, questions: [
    { text: 'O que é uma classe em POO?', options: ['Um objeto', 'Um template para objetos', 'Uma função', 'Uma variável'], correct: 1 },
    { text: 'Qual é o modificador de acesso mais restritivo?', options: ['public', 'protected', 'private', 'default'], correct: 2 },
    { text: 'O que é herança em POO?', options: ['Reutilização de código', 'Ocultação de dados', 'Múltiplas formas', 'Inicialização'], correct: 0 },
    { text: 'Qual é a diferença entre sobrescrita e sobrecarga?', options: ['Nenhuma', 'Sobrescrita muda assinatura, sobrecarga não', 'Sobrescrita é em subclasses, sobrecarga não', 'Sobrecarga é em subclasses, sobrescrita não'], correct: 2 },
    { text: 'Pode-se instanciar uma classe abstrata?', options: ['Sim, sempre', 'Não, nunca', 'Apenas com herança', 'Apenas com interfaces'], correct: 1 },
  ]},
  { disciplineId: 30003, questions: [
    { text: 'Qual é a complexidade da busca binária?', options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'], correct: 2 },
    { text: 'Qual estrutura de dados é LIFO?', options: ['Fila', 'Pilha', 'Array', 'Lista'], correct: 1 },
    { text: 'Qual algoritmo de ordenação é O(n log n)?', options: ['Bubble Sort', 'Quick Sort', 'Selection Sort', 'Insertion Sort'], correct: 1 },
    { text: 'O que é programação dinâmica?', options: ['Linguagem dinâmica', 'Memoização', 'Força bruta', 'Recursão'], correct: 1 },
    { text: 'Qual é a diferença entre DFS e BFS?', options: ['Nenhuma', 'DFS usa pilha, BFS usa fila', 'DFS é mais rápido', 'BFS é mais rápido'], correct: 1 },
  ]},
  { disciplineId: 30004, questions: [
    { text: 'O que é um SGBD?', options: ['Banco de dados', 'Sistema de gerenciamento de BD', 'Linguagem SQL', 'Tabela'], correct: 1 },
    { text: 'Qual é a forma normal mais restritiva?', options: ['1NF', '2NF', '3NF', 'BCNF'], correct: 3 },
    { text: 'O que significa ACID?', options: ['Ácido', 'Atomicidade, Consistência, Isolamento, Durabilidade', 'Algoritmo', 'Aplicação'], correct: 1 },
    { text: 'Qual comando SQL insere dados?', options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'], correct: 1 },
    { text: 'O que é uma chave estrangeira?', options: ['Chave de outro país', 'Relaciona tabelas', 'Identifica registros', 'Acelera buscas'], correct: 1 },
  ]},
  { disciplineId: 30005, questions: [
    { text: 'Qual é a primeira fase de um compilador?', options: ['Sintática', 'Léxica', 'Semântica', 'Geração'], correct: 1 },
    { text: 'O que é tokenização?', options: ['Quebra em tokens', 'Verifica sintaxe', 'Gera código', 'Otimiza'], correct: 0 },
    { text: 'Qual é a função da análise semântica?', options: ['Verifica tokens', 'Verifica sintaxe', 'Verifica tipos', 'Gera código'], correct: 2 },
    { text: 'O que é uma árvore sintática?', options: ['Estrutura de dados', 'Representação hierárquica', 'Tabela de símbolos', 'Código intermediário'], correct: 1 },
    { text: 'Qual é a diferença entre compilador e interpretador?', options: ['Nenhuma', 'Compilador traduz, interpretador executa', 'Interpretador traduz, compilador executa', 'São iguais'], correct: 1 },
  ]},
  { disciplineId: 30006, questions: [
    { text: 'O que é Machine Learning?', options: ['Máquina de aprender', 'Aprendizado a partir de dados', 'Rede neural', 'Algoritmo'], correct: 1 },
    { text: 'Qual é o tipo de aprendizado com dados rotulados?', options: ['Não supervisionado', 'Supervisionado', 'Por reforço', 'Semi-supervisionado'], correct: 1 },
    { text: 'O que é backpropagation?', options: ['Propagação para trás', 'Treinamento de redes neurais', 'Algoritmo de busca', 'Otimização'], correct: 1 },
    { text: 'Qual é a arquitetura moderna de IA?', options: ['Perceptron', 'CNN', 'RNN', 'Transformers'], correct: 3 },
    { text: 'O que é clustering?', options: ['Classificação', 'Agrupamento', 'Regressão', 'Predição'], correct: 1 },
  ]},
  { disciplineId: 30007, questions: [
    { text: 'O que é um sistema distribuído?', options: ['Um computador', 'Múltiplos computadores conectados', 'Rede local', 'Internet'], correct: 1 },
    { text: 'Qual é a diferença entre síncrono e assíncrono?', options: ['Nenhuma', 'Síncrono espera, assíncrono não', 'Assíncrono espera, síncrono não', 'São iguais'], correct: 1 },
    { text: 'O que é replicação?', options: ['Cópia de dados', 'Sincronização', 'Comunicação', 'Falha'], correct: 0 },
    { text: 'O que é quorum?', options: ['Maioria', 'Minoria', 'Todos', 'Um'], correct: 0 },
    { text: 'O que é deadlock?', options: ['Falha', 'Impasse', 'Sincronização', 'Comunicação'], correct: 1 },
  ]},
  { disciplineId: 30008, questions: [
    { text: 'O que é um Sistema de Informação?', options: ['Um computador', 'Conjunto de componentes para coletar e processar informações', 'Um banco de dados', 'Uma rede'], correct: 1 },
    { text: 'Qual é o componente mais importante de um SI?', options: ['Hardware', 'Software', 'Dados', 'Todos são igualmente importantes'], correct: 3 },
    { text: 'O que é ERP?', options: ['Erro', 'Planejamento de recursos empresariais', 'Rede', 'Banco de dados'], correct: 1 },
    { text: 'Qual é o tripé da segurança da informação?', options: ['Hardware, Software, Dados', 'Confidencialidade, Integridade, Disponibilidade', 'Usuários, Processos, Tecnologia', 'Planejamento, Implementação, Monitoramento'], correct: 1 },
    { text: 'O que é transformação digital?', options: ['Mudança de formato', 'Adoção de tecnologias digitais', 'Criptografia', 'Backup'], correct: 1 },
  ]},
  { disciplineId: 30009, questions: [
    { text: 'O que é gestão de dados?', options: ['Armazenar dados', 'Administração do ciclo de vida dos dados', 'Criptografar dados', 'Deletar dados'], correct: 1 },
    { text: 'Qual é a primeira etapa do ciclo de vida dos dados?', options: ['Armazenamento', 'Processamento', 'Coleta', 'Análise'], correct: 2 },
    { text: 'O que é qualidade de dados?', options: ['Dados grandes', 'Dados corretos e completos', 'Dados criptografados', 'Dados antigos'], correct: 1 },
    { text: 'O que é LGPD?', options: ['Lei de dados', 'Lei Geral de Proteção de Dados', 'Linguagem de programação', 'Protocolo'], correct: 1 },
    { text: 'Qual é o "V" do Big Data que significa quantidade?', options: ['Velocidade', 'Variedade', 'Volume', 'Veracidade'], correct: 2 },
  ]},
  { disciplineId: 30010, questions: [
    { text: 'O que é um pixel?', options: ['Imagem', 'Menor unidade de imagem', 'Cor', 'Resolução'], correct: 1 },
    { text: 'Qual é o modelo de cor mais usado em computação gráfica?', options: ['CMYK', 'HSV', 'RGB', 'LAB'], correct: 2 },
    { text: 'O que é projeção perspectiva?', options: ['Sem perspectiva', 'Com perspectiva', 'Ortogonal', 'Paralela'], correct: 1 },
    { text: 'O que é ray tracing?', options: ['Rasterização', 'Traçado de raios', 'Texturização', 'Iluminação'], correct: 1 },
    { text: 'O que é mapeamento de textura?', options: ['Criação de textura', 'Aplicação de imagem a superfície', 'Efeito de relevo', 'Suavização'], correct: 1 },
  ]},
  { disciplineId: 30011, questions: [
    { text: 'O que é integração de sistemas?', options: ['Conexão entre sistemas', 'Um sistema', 'Rede', 'Banco de dados'], correct: 0 },
    { text: 'Qual é o padrão mais simples de integração?', options: ['Hub-and-Spoke', 'Point-to-Point', 'Message Bus', 'Service-Oriented'], correct: 1 },
    { text: 'O que é REST?', options: ['Descanso', 'Representational State Transfer', 'Protocolo', 'Formato'], correct: 1 },
    { text: 'O que é ETL?', options: ['Erro', 'Extração, Transformação, Carga', 'Protocolo', 'Formato'], correct: 1 },
    { text: 'Qual formato é mais usado em APIs modernas?', options: ['XML', 'CSV', 'JSON', 'Protocol Buffers'], correct: 2 },
  ]},
  { disciplineId: 30012, questions: [
    { text: 'O que é multimédia?', options: ['Múltiplas mídias', 'Um tipo de mídia', 'Imagem', 'Vídeo'], correct: 0 },
    { text: 'Qual é a diferença entre raster e vetor?', options: ['Nenhuma', 'Raster é pixel, vetor é matemático', 'Vetor é pixel, raster é matemático', 'São iguais'], correct: 1 },
    { text: 'O que é frame rate?', options: ['Taxa de quadros', 'Qualidade de imagem', 'Compressão', 'Resolução'], correct: 0 },
    { text: 'O que é codec?', options: ['Código', 'Codificador/decodificador', 'Formato', 'Compressão'], correct: 1 },
    { text: 'O que é bitrate adaptativo?', options: ['Taxa fixa', 'Qualidade variável', 'Compressão', 'Streaming'], correct: 1 },
  ]}
];

const connection = await mysql.createConnection(process.env.DATABASE_URL);

for (const disc of questionsData) {
  // Delete existing questions
  await connection.execute('DELETE FROM questions WHERE disciplineId = ?', [disc.disciplineId]);
  
  // Insert new questions
  for (const q of disc.questions) {
    await connection.execute(
      'INSERT INTO questions (disciplineId, text, options, correctOptionIndex) VALUES (?, ?, ?, ?)',
      [disc.disciplineId, q.text, JSON.stringify(q.options), q.correct]
    );
  }
  console.log(`✓ ${disc.disciplineId}: ${disc.questions.length} questões adicionadas`);
}

console.log('\n✓ Todas as questões foram adicionadas!');
await connection.end();
