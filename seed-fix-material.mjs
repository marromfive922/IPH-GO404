import mysql from 'mysql2/promise';

const protocoloMaterial = `PROTOCOLO DE COMUNICAÇÃO

1. CONCEITOS FUNDAMENTAIS
- Protocolo: Conjunto de regras para comunicação entre dispositivos
- Camadas de Protocolo: OSI, TCP/IP
- Modelo Cliente-Servidor
- Comunicação Síncrona vs Assíncrona

2. MODELO OSI (7 CAMADAS)
- Camada 1: Física - Transmissão de bits
- Camada 2: Ligação de Dados - Frames, MAC
- Camada 3: Rede - IP, Roteamento
- Camada 4: Transporte - TCP, UDP
- Camada 5: Sessão - Gestão de sessões
- Camada 6: Apresentação - Compressão, Encriptação
- Camada 7: Aplicação - HTTP, FTP, SMTP

3. MODELO TCP/IP (4 CAMADAS)
- Camada de Aplicação: HTTP, HTTPS, FTP, SMTP, DNS
- Camada de Transporte: TCP, UDP
- Camada de Internet: IP, ICMP, IGMP
- Camada de Ligação: Ethernet, WiFi

4. PROTOCOLOS DE TRANSPORTE
- TCP (Transmission Control Protocol): Confiável, orientado a conexão
- UDP (User Datagram Protocol): Rápido, sem conexão
- Comparação: Confiabilidade vs Velocidade

5. PROTOCOLOS DE APLICAÇÃO
- HTTP/HTTPS: Web
- FTP: Transferência de ficheiros
- SMTP/POP3/IMAP: Email
- DNS: Resolução de nomes
- SSH: Acesso remoto seguro
- Telnet: Acesso remoto (inseguro)

6. SEGURANÇA EM PROTOCOLOS
- Encriptação: SSL/TLS
- Autenticação: Certificados digitais
- Integridade: Hash, Assinaturas digitais
- Confidencialidade

7. QUALIDADE DE SERVIÇO (QoS)
- Latência: Tempo de propagação
- Largura de Banda: Capacidade de transmissão
- Jitter: Variação de latência
- Perda de Pacotes`;

const soMaterial = `SISTEMAS OPERATIVOS

1. CONCEITOS FUNDAMENTAIS
- SO: Software que gere recursos do computador
- Funções: Gestão de processos, memória, ficheiros, dispositivos
- Tipos: Windows, macOS, Linux, Android, iOS
- Arquitetura: Monolítica, Microkernel, Híbrida

2. GESTÃO DE PROCESSOS
- Processo: Programa em execução
- Thread: Unidade de execução dentro de um processo
- Estados: Pronto, Executando, Bloqueado, Terminado
- Escalonamento: FIFO, Round-Robin, Prioridade
- Sincronização: Mutex, Semáforos, Monitores

3. GESTÃO DE MEMÓRIA
- Memória Principal: RAM
- Memória Secundária: Disco
- Paginação: Divisão em páginas
- Segmentação: Divisão em segmentos
- Memória Virtual: Extensão da RAM
- Cache: Memória rápida

4. GESTÃO DE FICHEIROS
- Sistema de Ficheiros: FAT, NTFS, ext4, APFS
- Diretórios: Estrutura hierárquica
- Permissões: Leitura, Escrita, Execução
- Inodes: Metadados de ficheiros
- Fragmentação: Organização de dados

5. GESTÃO DE DISPOSITIVOS
- Drivers: Software de controlo
- Interruções: Sinais de dispositivos
- DMA: Acesso Direto à Memória
- Buffers: Armazenamento temporário
- Spooling: Fila de impressão

6. SEGURANÇA E PROTEÇÃO
- Controlo de Acesso: Utilizadores, Grupos
- Autenticação: Passwords, Biometria
- Autorização: Permissões
- Auditoria: Registo de atividades
- Firewalls: Proteção de rede

7. TIPOS DE SISTEMAS OPERATIVOS
- Monousuário: Um utilizador
- Multiusuário: Múltiplos utilizadores
- Monotarefa: Uma tarefa
- Multitarefa: Múltiplas tarefas
- Tempo Real: Respostas imediatas
- Distribuídos: Múltiplos computadores`;

const arquiteturaMaterial = `ARQUITETURA DE COMPUTADORES

1. COMPONENTES FUNDAMENTAIS
- CPU: Processador central
- Memória: RAM, Cache, ROM
- Disco: Armazenamento
- Placa-mãe: Conexão de componentes
- Fonte: Alimentação elétrica
- Periféricos: Entrada/Saída

2. UNIDADE CENTRAL DE PROCESSAMENTO (CPU)
- Núcleos: Unidades de processamento
- Frequência: GHz (ciclos por segundo)
- Cache: L1, L2, L3
- Registadores: Armazenamento rápido
- ALU: Unidade Aritmética e Lógica
- Unidade de Controlo

3. HIERARQUIA DE MEMÓRIA
- Registadores: Mais rápido, menos capacidade
- Cache L1: Privado por núcleo
- Cache L2: Privado por núcleo
- Cache L3: Compartilhado
- RAM: Memória principal
- Disco: Memória secundária
- Mais lento, mais capacidade

4. CICLO DE EXECUÇÃO
- Fetch: Buscar instrução
- Decode: Descodificar instrução
- Execute: Executar operação
- Memory: Aceder memória
- Write-back: Guardar resultado

5. ARQUITETURAS DE PROCESSADORES
- x86/x64: Intel, AMD
- ARM: Móveis, Embedded
- MIPS: Histórico
- PowerPC: Servidores
- RISC vs CISC

6. SISTEMAS DE NUMERAÇÃO
- Binário: Base 2
- Decimal: Base 10
- Hexadecimal: Base 16
- Conversões entre bases
- Representação de números

7. BARRAMENTO E CONECTIVIDADE
- Barramento de Dados: Transferência de dados
- Barramento de Endereços: Localização de memória
- Barramento de Controlo: Sinais de controlo
- PCIe: Conexão de periféricos
- USB: Conexão universal
- Ethernet: Rede`;

const connection = await mysql.createConnection(process.env.DATABASE_URL);

try {
  // Update material for Protocolos (slug: protocolos)
  await connection.execute(
    'UPDATE disciplines SET material = ? WHERE slug = ?',
    [protocoloMaterial, 'protocolos']
  );
  console.log('✓ Material adicionado para Protocolos de Comunicação!');

  // Update material for Sistemas Operativos (slug: so)
  await connection.execute(
    'UPDATE disciplines SET material = ? WHERE slug = ?',
    [soMaterial, 'so']
  );
  console.log('✓ Material adicionado para Sistemas Operativos!');

  // Update material for Arquitetura (slug: arquitetura)
  await connection.execute(
    'UPDATE disciplines SET material = ? WHERE slug = ?',
    [arquiteturaMaterial, 'arquitetura']
  );
  console.log('✓ Material adicionado para Arquitetura de Computadores!');

  console.log('\n✓ Todos os materiais foram adicionados com sucesso!');
} catch (error) {
  console.error('Erro ao adicionar material:', error);
} finally {
  await connection.end();
}
