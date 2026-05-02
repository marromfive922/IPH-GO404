import mysql from 'mysql2/promise';

async function seedQuestions() {
  let connection;
  try {
    connection = await mysql.createConnection(process.env.DATABASE_URL);

    const questionsData = [
      { disciplineId: 1, text: 'O que é a CPU?', options: JSON.stringify(['Memória do computador', 'Unidade Central de Processamento', 'Disco rígido', 'Placa de vídeo']), correctIndex: 1 },
      { disciplineId: 1, text: 'Qual é a ordem correta do ciclo de instruções?', options: JSON.stringify(['Fetch, Decode, Execute, Write-back', 'Execute, Fetch, Decode, Write-back', 'Decode, Fetch, Execute, Write-back', 'Write-back, Execute, Decode, Fetch']), correctIndex: 0 },
      { disciplineId: 2, text: 'O que é uma Máquina de Turing?', options: JSON.stringify(['Um computador real', 'Um modelo matemático de computação', 'Uma linguagem de programação', 'Um sistema operativo']), correctIndex: 1 },
      { disciplineId: 2, text: 'Qual é a diferença entre DFA e NFA?', options: JSON.stringify(['DFA é mais rápido', 'NFA pode estar em múltiplos estados', 'Não há diferença', 'DFA é mais poderoso']), correctIndex: 1 },
      { disciplineId: 3, text: 'Qual é a função principal de um SO?', options: JSON.stringify(['Executar programas', 'Gerenciar recursos', 'Ambas as anteriores', 'Nenhuma das anteriores']), correctIndex: 2 },
      { disciplineId: 3, text: 'O que é paginação?', options: JSON.stringify(['Divisão de memória em páginas', 'Criação de ficheiros', 'Compressão de dados', 'Criptografia']), correctIndex: 0 },
      { disciplineId: 4, text: 'Quantas camadas tem o modelo OSI?', options: JSON.stringify(['5', '6', '7', '8']), correctIndex: 2 },
      { disciplineId: 4, text: 'O que é TCP/IP?', options: JSON.stringify(['Um protocolo de rede', 'Um sistema operativo', 'Um navegador web', 'Uma linguagem de programação']), correctIndex: 0 },
      { disciplineId: 5, text: 'O que é uma LAN?', options: JSON.stringify(['Rede Local', 'Rede Ampla', 'Rede Sem Fio', 'Rede Metropolitana']), correctIndex: 0 },
      { disciplineId: 5, text: 'Qual é a função de um Router?', options: JSON.stringify(['Conectar computadores', 'Rotear pacotes entre redes', 'Armazenar dados', 'Processar dados']), correctIndex: 1 },
      { disciplineId: 6, text: 'O que é encapsulamento?', options: JSON.stringify(['Proteção de dados', 'Herança de classes', 'Polimorfismo', 'Abstração']), correctIndex: 0 },
      { disciplineId: 6, text: 'Quantos pilares tem a POO?', options: JSON.stringify(['2', '3', '4', '5']), correctIndex: 2 },
      { disciplineId: 7, text: 'Qual é a complexidade do Quick Sort no melhor caso?', options: JSON.stringify(['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)']), correctIndex: 1 },
      { disciplineId: 7, text: 'O que é uma pilha?', options: JSON.stringify(['FIFO', 'LIFO', 'FILO', 'LIFI']), correctIndex: 1 },
      { disciplineId: 8, text: 'O que é SQL?', options: JSON.stringify(['Linguagem de programação', 'Linguagem de consulta de BD', 'Sistema operativo', 'Protocolo de rede']), correctIndex: 1 },
      { disciplineId: 8, text: 'O que significa ACID?', options: JSON.stringify(['Ácido', 'Atomicidade, Consistência, Isolamento, Durabilidade', 'Algoritmo', 'Aplicação']), correctIndex: 1 },
      { disciplineId: 9, text: 'Qual é a primeira fase da compilação?', options: JSON.stringify(['Análise Sintática', 'Análise Léxica', 'Geração de Código', 'Otimização']), correctIndex: 1 },
      { disciplineId: 9, text: 'O que é AST?', options: JSON.stringify(['Árvore de Sintaxe Abstrata', 'Algoritmo de Busca', 'Análise de Segurança', 'Aplicação de Sistema']), correctIndex: 0 },
      { disciplineId: 10, text: 'O que é Machine Learning?', options: JSON.stringify(['Aprendizado automático', 'Máquina de aprender', 'Linguagem de máquina', 'Modelo de aprendizado']), correctIndex: 0 },
      { disciplineId: 10, text: 'Qual é a diferença entre IA Fraca e IA Forte?', options: JSON.stringify(['Velocidade', 'Memória', 'Simulação vs Inteligência Real', 'Custo']), correctIndex: 2 },
      { disciplineId: 11, text: 'O que é paralelismo de dados?', options: JSON.stringify(['Dados em paralelo', 'Mesmo código, dados diferentes', 'Tarefas diferentes', 'Nenhuma das anteriores']), correctIndex: 1 },
      { disciplineId: 11, text: 'Qual é um desafio em sistemas distribuídos?', options: JSON.stringify(['Velocidade', 'Sincronização', 'Memória', 'Armazenamento']), correctIndex: 1 },
      { disciplineId: 12, text: 'O que é um ERP?', options: JSON.stringify(['Enterprise Resource Planning', 'Enterprise Reporting Program', 'Error Recovery Protocol', 'Electronic Resource Protocol']), correctIndex: 0 },
      { disciplineId: 12, text: 'Qual é um componente de um SI?', options: JSON.stringify(['Hardware', 'Software', 'Dados', 'Todas as anteriores']), correctIndex: 3 },
      { disciplineId: 13, text: 'O que é ETL?', options: JSON.stringify(['Extract, Transform, Load', 'Error, Test, Launch', 'Encrypt, Transmit, Log', 'Evaluate, Track, Link']), correctIndex: 0 },
      { disciplineId: 13, text: 'O que é um Data Warehouse?', options: JSON.stringify(['Armazém de dados', 'Proteção de dados', 'Processamento de dados', 'Visualização de dados']), correctIndex: 0 },
      { disciplineId: 14, text: 'O que é um pixel?', options: JSON.stringify(['Imagem pequena', 'Unidade básica de imagem', 'Cor', 'Transformação']), correctIndex: 1 },
      { disciplineId: 14, text: 'Qual é a diferença entre Rasterização e Ray Tracing?', options: JSON.stringify(['Velocidade', 'Qualidade', 'Método de renderização', 'Aplicação']), correctIndex: 2 },
      { disciplineId: 15, text: 'O que é SOA?', options: JSON.stringify(['Service-Oriented Architecture', 'System Operating Architecture', 'Software Organization Architecture', 'Security Oriented Architecture']), correctIndex: 0 },
      { disciplineId: 15, text: 'Qual é um padrão de integração?', options: JSON.stringify(['Point-to-Point', 'Hub-and-Spoke', 'Message Bus', 'Todas as anteriores']), correctIndex: 3 },
      { disciplineId: 16, text: 'O que é compressão sem perda?', options: JSON.stringify(['ZIP, PNG, FLAC', 'JPEG, MP3', 'Ambas', 'Nenhuma']), correctIndex: 0 },
      { disciplineId: 16, text: 'Qual é um formato de vídeo?', options: JSON.stringify(['MP4', 'AVI', 'MOV', 'Todas as anteriores']), correctIndex: 3 },
      { disciplineId: 17, text: 'O que é Engenharia de Software?', options: JSON.stringify(['Reparação de software', 'Processo de desenvolvimento de software', 'Linguagem de programação', 'Hardware']), correctIndex: 1 },
      { disciplineId: 17, text: 'Qual é uma metodologia ágil?', options: JSON.stringify(['Waterfall', 'Scrum', 'V-Model', 'Nenhuma']), correctIndex: 1 },
    ];

    console.log('Adicionando questões de quiz...');
    for (const q of questionsData) {
      await connection.execute(
        'INSERT INTO questions (disciplineId, text, options, correctOptionIndex) VALUES (?, ?, ?, ?)',
        [q.disciplineId, q.text, q.options, q.correctIndex]
      );
    }
    console.log(`✓ ${questionsData.length} questões adicionadas com sucesso!`);

    console.log('\n✅ Seed de questões concluído!');
  } catch (error) {
    console.error('Erro:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

seedQuestions();
