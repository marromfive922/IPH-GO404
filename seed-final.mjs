import mysql from 'mysql2/promise';

async function seedContent() {
  let connection;
  try {
    connection = await mysql.createConnection(process.env.DATABASE_URL);

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

    console.log('Adicionando material às disciplinas...');
    for (const content of disciplineContent) {
      await connection.execute(
        'UPDATE disciplines SET material = ? WHERE id = ?',
        [content.material, content.id]
      );
      console.log(`✓ Material adicionado para disciplina ${content.id}`);
    }

    console.log('\n✅ Conteúdo adicionado com sucesso!');
  } catch (error) {
    console.error('Erro:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

seedContent();
