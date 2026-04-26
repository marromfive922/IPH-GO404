import { useLocation } from 'wouter';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, ArrowLeft, BookOpen } from 'lucide-react';

// Study materials for each discipline
const studyMaterials: Record<string, { title: string; content: string }> = {
  redes: {
    title: 'Redes de Computador',
    content: `
# Redes de Computador

## Introdução
As redes de computador são sistemas de comunicação que permitem a troca de dados entre dispositivos. Elas formam a base da internet moderna e são essenciais para a comunicação digital.

## Conceitos Fundamentais

### 1. Modelo OSI (Open Systems Interconnection)
O modelo OSI define 7 camadas para a comunicação em rede:
- **Camada Física**: Transmissão de bits através de meios físicos
- **Camada de Ligação de Dados**: Controle de acesso ao meio (MAC)
- **Camada de Rede**: Roteamento e endereçamento (IP)
- **Camada de Transporte**: Controle de fluxo e confiabilidade (TCP/UDP)
- **Camada de Sessão**: Gerenciamento de conexões
- **Camada de Apresentação**: Criptografia e compressão
- **Camada de Aplicação**: Serviços de rede (HTTP, FTP, DNS)

### 2. Protocolo TCP/IP
O TCP/IP é o protocolo padrão da internet:
- **TCP (Transmission Control Protocol)**: Orientado à conexão, confiável
- **UDP (User Datagram Protocol)**: Sem conexão, rápido
- **IP (Internet Protocol)**: Roteamento de pacotes

### 3. Endereçamento IP
- **IPv4**: 32 bits (ex: 192.168.1.1)
- **IPv6**: 128 bits (ex: 2001:0db8:85a3::8a2e:0370:7334)
- **Subnetting**: Divisão de redes em sub-redes

## Tipos de Redes
- **LAN (Local Area Network)**: Rede local
- **WAN (Wide Area Network)**: Rede de longa distância
- **MAN (Metropolitan Area Network)**: Rede metropolitana
- **VPN (Virtual Private Network)**: Rede privada virtual

## Segurança em Redes
- Firewalls
- Criptografia SSL/TLS
- Autenticação e autorização
- Detecção de intrusões

## Aplicações Práticas
- Configuração de roteadores
- Análise de tráfego de rede
- Resolução de problemas de conectividade
- Implementação de VPNs
    `
  },
  poo: {
    title: 'Programação Orientada a Objetos',
    content: `
# Programação Orientada a Objetos (POO)

## Introdução
A Programação Orientada a Objetos é um paradigma de programação que organiza o código em torno de "objetos" que contêm dados e métodos.

## Conceitos Fundamentais

### 1. Classes e Objetos
- **Classe**: Modelo ou template para criar objetos
- **Objeto**: Instância de uma classe com estado e comportamento

### 2. Pilares da POO

#### Encapsulamento
Ocultação de detalhes internos de um objeto:
- Atributos privados
- Métodos públicos para acesso controlado
- Proteção de dados

#### Herança
Reutilização de código através de hierarquias:
- Classe pai (superclasse)
- Classe filha (subclasse)
- Herança simples e múltipla

#### Polimorfismo
Objetos podem ter múltiplas formas:
- Sobrescrita de métodos
- Sobrecarga de métodos
- Interfaces e classes abstratas

#### Abstração
Simplificação de objetos complexos:
- Classes abstratas
- Interfaces
- Métodos abstratos

### 3. Relacionamentos entre Classes
- **Associação**: Relação entre classes
- **Agregação**: Relação "tem um"
- **Composição**: Relação forte "tem um"

## Padrões de Design
- Singleton
- Factory
- Observer
- Strategy
- Adapter

## Vantagens da POO
- Modularidade
- Reutilização de código
- Manutenção facilitada
- Escalabilidade

## Linguagens POO
- Java
- Python
- C++
- C#
- JavaScript
    `
  },
  algoritmos: {
    title: 'Algoritmos e Estrutura de Dados',
    content: `
# Algoritmos e Estrutura de Dados

## Introdução
Algoritmos são sequências de passos para resolver um problema. Estruturas de dados organizam informações para processamento eficiente.

## Estruturas de Dados Fundamentais

### 1. Arrays e Listas
- **Array**: Coleção de elementos do mesmo tipo
- **Lista Ligada**: Elementos conectados por ponteiros
- **Lista Dupla**: Navegação bidirecional

### 2. Pilhas (Stack)
- LIFO (Last In, First Out)
- Operações: push, pop, peek
- Aplicações: Undo/Redo, Expressões matemáticas

### 3. Filas (Queue)
- FIFO (First In, First Out)
- Operações: enqueue, dequeue
- Aplicações: Agendamento, Processamento de tarefas

### 4. Árvores
- **Árvore Binária**: Cada nó tem no máximo 2 filhos
- **Árvore de Busca Binária**: Ordenação para busca eficiente
- **Árvore AVL**: Árvore balanceada
- **Árvore Rubro-Negra**: Balanceamento automático

### 5. Grafos
- **Vértices e Arestas**: Componentes básicos
- **Grafo Direcionado**: Arestas com direção
- **Grafo Ponderado**: Arestas com peso

## Algoritmos Importantes

### Busca
- **Busca Linear**: O(n)
- **Busca Binária**: O(log n)

### Ordenação
- **Bubble Sort**: O(n²)
- **Quick Sort**: O(n log n) em média
- **Merge Sort**: O(n log n)
- **Heap Sort**: O(n log n)

### Grafos
- **DFS (Depth-First Search)**: Exploração em profundidade
- **BFS (Breadth-First Search)**: Exploração em largura
- **Dijkstra**: Caminho mais curto
- **Kruskal/Prim**: Árvore geradora mínima

## Análise de Complexidade
- **Notação Big O**: Limite superior
- **Notação Theta**: Limite exato
- **Notação Omega**: Limite inferior

## Otimização
- Memoização
- Programação Dinâmica
- Greedy Algorithms
    `
  },
  bd: {
    title: 'Base de Dados',
    content: `
# Base de Dados

## Introdução
Uma base de dados é um sistema organizado para armazenar, recuperar e gerenciar dados de forma eficiente e segura.

## Tipos de Bases de Dados

### 1. Relacional
- Dados organizados em tabelas
- Relacionamentos entre tabelas
- SQL como linguagem padrão
- Exemplos: MySQL, PostgreSQL, Oracle

### 2. NoSQL
- Dados não estruturados
- Escalabilidade horizontal
- Tipos: Document, Key-Value, Column-Family, Graph
- Exemplos: MongoDB, Redis, Cassandra

### 3. Outros Tipos
- Bases de dados em memória
- Bases de dados de séries temporais
- Bases de dados de grafos

## Conceitos Fundamentais

### Tabelas e Registros
- **Tabela**: Coleção de dados relacionados
- **Registro**: Uma linha de dados
- **Campo**: Uma coluna de dados

### Chaves
- **Chave Primária**: Identificador único
- **Chave Estrangeira**: Referência a outra tabela
- **Chave Candidata**: Potencial chave primária

### Relacionamentos
- **Um-para-Um**: 1:1
- **Um-para-Muitos**: 1:N
- **Muitos-para-Muitos**: N:N

## Normalização
- **1NF**: Atomicidade dos dados
- **2NF**: Dependência funcional completa
- **3NF**: Sem dependências transitivas
- **BCNF**: Forma normal de Boyce-Codd

## SQL Básico
- SELECT: Consultar dados
- INSERT: Adicionar dados
- UPDATE: Modificar dados
- DELETE: Remover dados
- JOIN: Combinar tabelas

## Índices e Otimização
- Índices para aceleração de consultas
- Análise de planos de execução
- Caching
- Particionamento de dados

## Segurança
- Controle de acesso
- Criptografia
- Backup e recuperação
- Auditoria
    `
  },
  compiladores: {
    title: 'Compiladores',
    content: `
# Compiladores

## Introdução
Um compilador é um programa que traduz código-fonte de uma linguagem de programação para código executável.

## Fases da Compilação

### 1. Análise Léxica
- Tokenização do código-fonte
- Reconhecimento de palavras-chave, identificadores, operadores
- Geração de tokens

### 2. Análise Sintática
- Verificação da estrutura gramatical
- Construção da árvore sintática abstrata (AST)
- Detecção de erros de sintaxe

### 3. Análise Semântica
- Verificação de tipos
- Resolução de nomes
- Verificação de declarações
- Detecção de erros semânticos

### 4. Geração de Código Intermediário
- Tradução para representação intermediária
- Otimizações de nível intermediário

### 5. Otimização
- Eliminação de código morto
- Propagação de constantes
- Otimização de loops
- Alocação de registradores

### 6. Geração de Código
- Tradução para linguagem de máquina ou assembly
- Alocação de memória
- Resolução de endereços

### 7. Ligação
- Combinação de módulos compilados
- Resolução de referências externas
- Geração do executável

## Ferramentas de Compilação
- **Lex/Flex**: Análise léxica
- **Yacc/Bison**: Análise sintática
- **LLVM**: Infraestrutura de compilação
- **GCC**: Compilador GNU

## Conceitos Avançados
- Análise de fluxo de dados
- Análise de dependências
- Compilação JIT (Just-In-Time)
- Compilação incremental

## Otimizações Comuns
- Inlining de funções
- Desenrolamento de loops
- Especialização de código
- Vetorização
    `
  },
  ia: {
    title: 'Inteligência Artificial',
    content: `
# Inteligência Artificial

## Introdução
A Inteligência Artificial é o campo que estuda como criar máquinas capazes de realizar tarefas que normalmente requerem inteligência humana.

## Subcampos da IA

### 1. Machine Learning
Algoritmos que aprendem com dados:
- **Aprendizado Supervisionado**: Dados rotulados
- **Aprendizado Não Supervisionado**: Dados não rotulados
- **Aprendizado por Reforço**: Aprendizado através de recompensas

### 2. Deep Learning
Redes neurais com múltiplas camadas:
- **Redes Neurais Convolucionais (CNN)**: Processamento de imagens
- **Redes Neurais Recorrentes (RNN)**: Sequências de dados
- **Transformers**: Modelos de atenção

### 3. Processamento de Linguagem Natural (NLP)
- Análise de texto
- Tradução automática
- Chatbots
- Análise de sentimentos

### 4. Visão Computacional
- Reconhecimento de imagens
- Detecção de objetos
- Segmentação semântica
- Reconhecimento facial

## Algoritmos Fundamentais

### Busca
- Busca em profundidade (DFS)
- Busca em largura (BFS)
- Busca A*
- Busca com heurísticas

### Classificação
- Árvores de decisão
- k-Nearest Neighbors (kNN)
- Support Vector Machines (SVM)
- Naive Bayes

### Clustering
- k-Means
- DBSCAN
- Hierarchical Clustering

### Regressão
- Regressão Linear
- Regressão Polinomial
- Regressão Logística

## Frameworks Populares
- TensorFlow
- PyTorch
- Scikit-learn
- Keras

## Aplicações Práticas
- Recomendação de produtos
- Detecção de fraude
- Diagnóstico médico
- Veículos autónomos
    `
  },
  distribuidos: {
    title: 'Sistemas Distribuídos e Paralelos',
    content: `
# Sistemas Distribuídos e Paralelos

## Introdução
Sistemas distribuídos executam em múltiplos computadores. Sistemas paralelos executam múltiplas operações simultaneamente.

## Conceitos Fundamentais

### Distribuição
- Múltiplos nós independentes
- Comunicação por rede
- Sem memória compartilhada
- Tolerância a falhas

### Paralelismo
- Múltiplos processadores
- Memória compartilhada ou distribuída
- Sincronização de threads
- Balanceamento de carga

## Modelos de Comunicação

### Passagem de Mensagens
- Envio e recebimento de mensagens
- Comunicação assíncrona
- Exemplo: MPI (Message Passing Interface)

### Memória Compartilhada
- Threads compartilham memória
- Sincronização com locks
- Condições de corrida

## Desafios

### Sincronização
- Deadlocks
- Race conditions
- Starvation

### Consistência
- Consistência forte
- Consistência eventual
- Coerência de cache

### Tolerância a Falhas
- Replicação
- Checkpointing
- Recuperação

## Padrões de Design

### MapReduce
- Distribuição de processamento
- Agregação de resultados

### Publish-Subscribe
- Desacoplamento de componentes
- Escalabilidade

### Master-Worker
- Coordenação centralizada
- Distribuição de tarefas

## Tecnologias
- Apache Spark
- Hadoop
- Kubernetes
- Docker
- Message Brokers (RabbitMQ, Kafka)

## Aplicações
- Cloud Computing
- Big Data
- Streaming de dados
- Computação científica
    `
  },
  si: {
    title: 'Sistema de Informação',
    content: `
# Sistema de Informação

## Introdução
Um Sistema de Informação (SI) integra tecnologia, processos e pessoas para gerenciar dados e informações organizacionais.

## Componentes de um SI

### 1. Hardware
- Computadores
- Servidores
- Dispositivos periféricos
- Infraestrutura de rede

### 2. Software
- Sistemas operativos
- Aplicações
- Middleware
- Ferramentas de desenvolvimento

### 3. Dados
- Bases de dados
- Data warehouses
- Data lakes
- Arquivos

### 4. Pessoas
- Usuários
- Administradores
- Desenvolvedores
- Gestores

### 5. Processos
- Workflows
- Procedimentos
- Políticas
- Governança

## Tipos de SI

### Sistemas Transacionais
- Processamento de transações
- Exemplo: Sistemas de vendas

### Sistemas de Apoio à Decisão
- Análise de dados
- Business Intelligence

### Sistemas Executivos
- Relatórios estratégicos
- KPIs

### Sistemas Colaborativos
- Comunicação
- Compartilhamento de documentos

## Ciclo de Vida do SI

### Planejamento
- Análise de requisitos
- Definição de objetivos

### Análise
- Estudo detalhado
- Documentação

### Design
- Arquitetura do sistema
- Design de banco de dados

### Implementação
- Desenvolvimento
- Testes

### Manutenção
- Suporte
- Atualizações

## Segurança da Informação
- Confidencialidade
- Integridade
- Disponibilidade
- Controle de acesso

## Governança de TI
- Alinhamento com negócio
- Gestão de riscos
- Conformidade regulatória
    `
  },
  'gestao-dados': {
    title: 'Gestão de Dados',
    content: `
# Gestão de Dados

## Introdução
A Gestão de Dados é o conjunto de práticas para coletar, armazenar, processar e analisar dados de forma eficiente.

## Conceitos Fundamentais

### Big Data
Características:
- **Volume**: Grande quantidade de dados
- **Velocidade**: Processamento rápido
- **Variedade**: Diferentes tipos de dados
- **Veracidade**: Qualidade dos dados
- **Valor**: Utilidade dos dados

### Data Warehouse
- Armazém centralizado de dados
- Dados históricos
- Otimizado para consultas analíticas

### Data Lake
- Armazém de dados brutos
- Dados estruturados e não estruturados
- Flexibilidade

### Data Mart
- Subset de um data warehouse
- Específico para um departamento

## Processos de Gestão

### ETL (Extract, Transform, Load)
1. **Extract**: Extração de dados
2. **Transform**: Limpeza e transformação
3. **Load**: Carregamento no destino

### Data Quality
- Validação de dados
- Detecção de anomalias
- Limpeza de dados

### Data Governance
- Políticas de dados
- Qualidade de dados
- Segurança de dados

## Análise de Dados

### Análise Descritiva
- O que aconteceu?
- Relatórios e dashboards

### Análise Preditiva
- O que vai acontecer?
- Machine learning

### Análise Prescritiva
- O que fazer?
- Recomendações

## Ferramentas
- Apache Hadoop
- Apache Spark
- Apache Kafka
- Tableau
- Power BI
- Python (Pandas, NumPy)

## Aplicações
- Business Intelligence
- Análise de clientes
- Detecção de fraude
- Previsão de demanda
    `
  },
  cg: {
    title: 'Computação Gráfica',
    content: `
# Computação Gráfica

## Introdução
A Computação Gráfica é a área que estuda a criação, manipulação e visualização de imagens e modelos 3D.

## Conceitos Fundamentais

### Rasterização
- Conversão de primitivas geométricas em pixels
- Algoritmo de Bresenham
- Anti-aliasing

### Ray Tracing
- Simulação de raios de luz
- Reflexão e refração
- Realismo fotográfico

### Texturização
- Aplicação de texturas em superfícies
- Mapeamento UV
- Bump mapping

### Iluminação
- Modelos de iluminação
- Sombras
- Global illumination

## Transformações Geométricas

### Transformações 2D
- Translação
- Rotação
- Escala
- Cisalhamento

### Transformações 3D
- Matrizes de transformação
- Coordenadas homogêneas
- Projeção perspectiva

## Estruturas de Dados

### Meshes
- Vértices
- Arestas
- Faces

### Árvores Espaciais
- Octrees
- BSP Trees
- KD-Trees

## Algoritmos

### Visibilidade
- Z-buffer
- Painter's algorithm
- BSP sorting

### Clipping
- Cohen-Sutherland
- Sutherland-Hodgeman

## APIs Gráficas
- OpenGL
- DirectX
- Vulkan
- WebGL

## Aplicações
- Jogos eletrônicos
- Visualização científica
- Animação
- Realidade virtual
    `
  },
  integracao: {
    title: 'Integração de Sistemas',
    content: `
# Integração de Sistemas

## Introdução
A Integração de Sistemas é o processo de conectar diferentes aplicações e sistemas para funcionar como um todo coeso.

## Desafios de Integração

### Heterogeneidade
- Diferentes plataformas
- Diferentes linguagens
- Diferentes protocolos

### Escalabilidade
- Crescimento de dados
- Crescimento de usuários
- Performance

### Segurança
- Autenticação
- Autorização
- Criptografia

## Padrões de Integração

### Ponto-a-Ponto
- Conexão direta entre sistemas
- Simples mas pouco escalável

### Hub-and-Spoke
- Integração centralizada
- Melhor escalabilidade

### Publish-Subscribe
- Desacoplamento de componentes
- Escalabilidade horizontal

## Tecnologias

### APIs (Application Programming Interfaces)
- REST
- SOAP
- GraphQL
- gRPC

### Message Brokers
- RabbitMQ
- Apache Kafka
- ActiveMQ

### ESB (Enterprise Service Bus)
- Orquestração de serviços
- Transformação de dados
- Roteamento

### Middleware
- Servidores de aplicação
- Servidores de integração
- Servidores de mensagens

## Protocolos
- HTTP/HTTPS
- AMQP
- MQTT
- WebSocket

## SOA (Service-Oriented Architecture)
- Serviços independentes
- Reutilização
- Flexibilidade

## Microserviços
- Arquitetura de pequenos serviços
- Independência de deployment
- Escalabilidade granular

## Aplicações
- Integração de sistemas legados
- Cloud integration
- IoT integration
    `
  },
  multimedia: {
    title: 'Multimédia',
    content: `
# Multimédia

## Introdução
Multimédia refere-se à integração de múltiplas formas de mídia: texto, áudio, vídeo, imagens e animações.

## Tipos de Mídia

### Texto
- Codificação (ASCII, UTF-8)
- Compressão
- Processamento de linguagem natural

### Imagens
- Formatos: JPEG, PNG, GIF, WebP
- Compressão com perda
- Compressão sem perda
- Processamento de imagens

### Áudio
- Frequência de amostragem
- Profundidade de bits
- Formatos: MP3, WAV, FLAC, AAC
- Compressão de áudio

### Vídeo
- Codecs: H.264, H.265, VP9
- Taxa de fotogramas (FPS)
- Resolução
- Compressão de vídeo

## Compressão

### Sem Perda
- ZIP, PNG, FLAC
- Recuperação de dados original

### Com Perda
- JPEG, MP3, H.264
- Redução de tamanho significativa

## Streaming
- Streaming de áudio
- Streaming de vídeo
- Protocolos: RTMP, HLS, DASH

## Processamento de Mídia

### Processamento de Imagens
- Filtros
- Transformações
- Reconhecimento de padrões

### Processamento de Áudio
- Equalização
- Compressão dinâmica
- Efeitos de áudio

### Processamento de Vídeo
- Edição
- Efeitos visuais
- Transcodificação

## Ferramentas
- FFmpeg
- ImageMagick
- Adobe Creative Suite
- DaVinci Resolve

## Aplicações
- Produção audiovisual
- Streaming de conteúdo
- Videojogos
- Realidade aumentada
    `
  },
};

export default function StudyMaterial() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const params = new URLSearchParams(window.location.search);
  const disciplineSlug = params.get('discipline');

  if (!user) {
    return (
      <div className="flex-center min-h-screen">
        <p className="text-[#5a6a7d]">Por favor, faça login para aceder ao material de estudo.</p>
      </div>
    );
  }

  const material = disciplineSlug ? studyMaterials[disciplineSlug] : null;

  if (!material) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={() => setLocation('/')}
            className="mb-8 text-[#0a2f44] border-[#0a2f44]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Card className="card-iph text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto text-[#3498db] mb-4" />
            <p className="text-lg text-[#5a6a7d]">Disciplina não encontrada.</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a2f44] to-[#1a4b6d] text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            onClick={() => setLocation('/')}
            className="mb-4 text-white border-white hover:bg-white hover:text-[#0a2f44]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{material.title}</h1>
          <p className="text-lg opacity-90">Material de estudo e referência</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="card-iph p-8 md:p-12">
          <div className="prose prose-sm md:prose-base max-w-none text-[#0a2f44]">
            {material.content.split('\n').map((line, idx) => {
              if (line.startsWith('# ')) {
                return (
                  <h1 key={idx} className="text-3xl font-bold mt-8 mb-4 text-[#0a2f44]">
                    {line.replace('# ', '')}
                  </h1>
                );
              }
              if (line.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-2xl font-bold mt-6 mb-3 text-[#0a2f44]">
                    {line.replace('## ', '')}
                  </h2>
                );
              }
              if (line.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl font-bold mt-4 mb-2 text-[#0a2f44]">
                    {line.replace('### ', '')}
                  </h3>
                );
              }
              if (line.startsWith('- ')) {
                return (
                  <li key={idx} className="ml-6 mb-2 text-[#5a6a7d]">
                    {line.replace('- ', '')}
                  </li>
                );
              }
              if (line.trim() === '') {
                return <div key={idx} className="mb-4" />;
              }
              return (
                <p key={idx} className="mb-3 text-[#5a6a7d] leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 justify-center">
          <Button onClick={() => setLocation('/quiz')} className="btn-iph-primary">
            <BookOpen className="w-4 h-4 mr-2" />
            Fazer Quiz
          </Button>
          <Button onClick={() => setLocation('/')} variant="outline" className="border-[#0a2f44] text-[#0a2f44]">
            Voltar à Página Inicial
          </Button>
        </div>
      </div>
    </div>
  );
}
