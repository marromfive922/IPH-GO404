import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// Novas disciplinas
const newDisciplines = [
  {
    name: 'Redes de Computador',
    slug: 'redes',
    icon: 'fa-network-wired',
    description: 'Fundamentos de redes, protocolos TCP/IP e arquitetura de redes.'
  },
  {
    name: 'Programação Orientada a Objetos',
    slug: 'poo',
    icon: 'fa-cube',
    description: 'Conceitos de OOP, classes, herança, polimorfismo e encapsulamento.'
  },
  {
    name: 'Algoritmos e Estrutura de Dados',
    slug: 'algoritmos',
    icon: 'fa-code',
    description: 'Análise de algoritmos, estruturas de dados e complexidade computacional.'
  },
  {
    name: 'Base de Dados',
    slug: 'bd',
    icon: 'fa-database',
    description: 'Modelagem de dados, SQL, normalização e otimização de queries.'
  },
  {
    name: 'Compiladores',
    slug: 'compiladores',
    icon: 'fa-cogs',
    description: 'Análise léxica, sintática, semântica e geração de código.'
  },
  {
    name: 'Inteligência Artificial',
    slug: 'ia',
    icon: 'fa-brain',
    description: 'Machine Learning, redes neurais, busca e otimização.'
  },
  {
    name: 'Sistemas Distribuídos e Paralelos',
    slug: 'distribuidos',
    icon: 'fa-project-diagram',
    description: 'Computação distribuída, sincronização e processamento paralelo.'
  },
  {
    name: 'Sistema de Informação',
    slug: 'si',
    icon: 'fa-info-circle',
    description: 'Gestão de SI, análise de sistemas e engenharia de software.'
  },
  {
    name: 'Gestão de Dados',
    slug: 'gestao-dados',
    icon: 'fa-chart-bar',
    description: 'Data Warehouse, Big Data, análise e visualização de dados.'
  },
  {
    name: 'Computação Gráfica',
    slug: 'cg',
    icon: 'fa-image',
    description: 'Renderização, transformações geométricas e processamento de imagens.'
  },
  {
    name: 'Integração de Sistemas',
    slug: 'integracao',
    icon: 'fa-link',
    description: 'APIs, middleware, SOA e integração de aplicações empresariais.'
  },
  {
    name: 'Multimédia',
    slug: 'multimedia',
    icon: 'fa-film',
    description: 'Processamento de áudio, vídeo, compressão e streaming.'
  }
];

// Inserir novas disciplinas
for (const disc of newDisciplines) {
  try {
    const [result] = await connection.execute(
      'INSERT INTO disciplines (name, slug, icon, description) VALUES (?, ?, ?, ?)',
      [disc.name, disc.slug, disc.icon, disc.description]
    );
    console.log(`✓ Disciplina criada: ${disc.name} (ID: ${result.insertId})`);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log(`⚠ Disciplina já existe: ${disc.name}`);
    } else {
      console.error(`✗ Erro ao criar ${disc.name}:`, error.message);
    }
  }
}

console.log('\n✓ Seed de novas disciplinas concluído!');
await connection.end();
