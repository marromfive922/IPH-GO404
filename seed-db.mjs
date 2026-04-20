import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Disciplinas
const disciplines = [
  {
    name: 'Arquitetura de Computadores',
    slug: 'arquitetura',
    icon: 'fa-server',
    description: 'Estude os fundamentos da arquitetura de computadores, processadores e memória.'
  },
  {
    name: 'Teoria da Computação',
    slug: 'teoria',
    icon: 'fa-project-diagram',
    description: 'Explore autómatos, linguagens formais e computabilidade.'
  },
  {
    name: 'Sistemas Operativos',
    slug: 'so',
    icon: 'fa-linux',
    description: 'Aprenda sobre gestão de processos, memória e I/O.'
  },
  {
    name: 'Protocolos de Comunicação',
    slug: 'protocolos',
    icon: 'fa-network-wired',
    description: 'Domine os protocolos de rede e comunicação de dados.'
  }
];

// Inserir disciplinas
let disciplineIds = {};
for (const disc of disciplines) {
  const [result] = await connection.execute(
    'INSERT INTO disciplines (name, slug, icon, description) VALUES (?, ?, ?, ?)',
    [disc.name, disc.slug, disc.icon, disc.description]
  );
  disciplineIds[disc.slug] = result.insertId;
}

console.log('Disciplinas criadas:', disciplineIds);

// Questões por disciplina
const questions = {
  arquitetura: [
    {
      text: 'Qual a função principal da Unidade de Controlo (UC)?',
      options: ['Executar operações aritméticas', 'Coordenar o fluxo de dados e instruções', 'Armazenar dados permanentemente', 'Realizar operações de ponto flutuante'],
      correctOptionIndex: 1,
      explanation: 'A Unidade de Controlo coordena o fluxo de dados e instruções no processador.'
    },
    {
      text: 'O que caracteriza a arquitetura de Von Neumann?',
      options: ['Memórias separadas para dados e instruções', 'Uso exclusivo de processadores RISC', 'Memória única para dados e instruções', 'Ausência de unidade de controlo'],
      correctOptionIndex: 2,
      explanation: 'A arquitetura de Von Neumann utiliza uma memória única para dados e instruções.'
    },
    {
      text: 'O que é o Pipeline num processador?',
      options: ['Um tubo de arrefecimento', 'Execução paralela de diferentes fases de várias instruções', 'Um tipo de memória cache', 'O barramento principal de dados'],
      correctOptionIndex: 1,
      explanation: 'Pipeline permite a execução paralela de diferentes fases de várias instruções.'
    },
    {
      text: 'Qual a principal vantagem da Memória Cache?',
      options: ['Maior capacidade que o disco rígido', 'Baixo custo de fabrico', 'Velocidade de acesso próxima da do processador', 'Não é volátil'],
      correctOptionIndex: 2,
      explanation: 'A cache oferece velocidade de acesso muito próxima à do processador.'
    },
    {
      text: 'O que significa a sigla RISC?',
      options: ['Reduced Instruction Set Computer', 'Rapid Instruction Serial Core', 'Random Instruction Set Controller', 'Refined Integrated System Code'],
      correctOptionIndex: 0,
      explanation: 'RISC significa Reduced Instruction Set Computer.'
    }
  ],
  teoria: [
    {
      text: 'O que define um Autómato Finito Determinista (AFD)?',
      options: ['Pode estar em vários estados simultaneamente', 'Para cada estado e símbolo, há exatamente uma transição', 'Não possui estados finais', 'Aceita apenas linguagens sensíveis ao contexto'],
      correctOptionIndex: 1,
      explanation: 'Um AFD tem exatamente uma transição para cada estado e símbolo.'
    },
    {
      text: 'Quem é considerado o pai da Ciência da Computação teórica?',
      options: ['Bill Gates', 'Alan Turing', 'Steve Jobs', 'Ada Lovelace'],
      correctOptionIndex: 1,
      explanation: 'Alan Turing é considerado o pai da Ciência da Computação teórica.'
    },
    {
      text: 'O que é uma Gramática Livre de Contexto?',
      options: ['Uma gramática que não segue regras', 'Um sistema para gerar linguagens regulares', 'Uma gramática onde as produções são do tipo A -> α', 'Um algoritmo de compressão'],
      correctOptionIndex: 2,
      explanation: 'Uma Gramática Livre de Contexto tem produções do tipo A -> α.'
    }
  ],
  so: [
    {
      text: 'O que é o Kernel de um Sistema Operativo?',
      options: ['A interface gráfica do utilizador', 'O núcleo que gere os recursos do hardware', 'Um editor de texto avançado', 'O navegador de internet padrão'],
      correctOptionIndex: 1,
      explanation: 'O Kernel é o núcleo que gere os recursos do hardware.'
    },
    {
      text: 'O que é o fenómeno de Thrashing?',
      options: ['Aceleração repentina do sistema', 'Excesso de paginação que degrada o desempenho', 'Limpeza automática de ficheiros temporários', 'Um tipo de ataque informático'],
      correctOptionIndex: 1,
      explanation: 'Thrashing é o excesso de paginação que degrada o desempenho.'
    },
    {
      text: 'Qual a função do Escalonador (Scheduler)?',
      options: ['Organizar ficheiros no disco', 'Decidir qual processo utiliza a CPU', 'Verificar atualizações de software', 'Gere as ligações de rede'],
      correctOptionIndex: 1,
      explanation: 'O Scheduler decide qual processo utiliza a CPU.'
    }
  ],
  protocolos: [
    {
      text: 'Em que camada do modelo OSI opera o protocolo IP?',
      options: ['Camada de Aplicação', 'Camada de Transporte', 'Camada de Rede', 'Camada Física'],
      correctOptionIndex: 2,
      explanation: 'O protocolo IP opera na Camada de Rede (camada 3).'
    },
    {
      text: 'Qual a principal diferença entre TCP e UDP?',
      options: ['TCP é mais rápido', 'UDP garante a entrega dos dados', 'TCP é orientado à conexão e fiável', 'Não há diferença'],
      correctOptionIndex: 2,
      explanation: 'TCP é orientado à conexão e garante a entrega fiável dos dados.'
    },
    {
      text: 'O que faz o protocolo DNS?',
      options: ['Transfere ficheiros', 'Resolve nomes de domínio em endereços IP', 'Gere o envio de e-mails', 'Criptografa a navegação web'],
      correctOptionIndex: 1,
      explanation: 'DNS resolve nomes de domínio em endereços IP.'
    }
  ]
};

// Inserir questões
for (const [slug, qs] of Object.entries(questions)) {
  const disciplineId = disciplineIds[slug];
  for (const q of qs) {
    await connection.execute(
      'INSERT INTO questions (disciplineId, text, options, correctOptionIndex, explanation) VALUES (?, ?, ?, ?, ?)',
      [disciplineId, q.text, JSON.stringify(q.options), q.correctOptionIndex, q.explanation]
    );
  }
  console.log(`${qs.length} questões inseridas para ${slug}`);
}

await connection.end();
console.log('Base de dados populada com sucesso!');
