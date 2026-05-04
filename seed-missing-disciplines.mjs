import mysql from 'mysql2/promise';

const disciplinesData = [
  { id: 10001, slug: 'protocolo', material: 'PROTOCOLO DE COMUNICAÇÃO\n\n1. CONCEITOS FUNDAMENTAIS\n- Protocolo: Conjunto de regras para comunicação\n- Camadas: Física, Enlace, Rede, Transporte, Aplicação\n- Sincronização e Sequenciamento\n\n2. PROTOCOLOS DE ENLACE\n- PPP (Point-to-Point Protocol)\n- HDLC (High-Level Data Link Control)\n- Detecção de erros: CRC, Checksum\n\n3. PROTOCOLOS DE REDE\n- IP (IPv4, IPv6)\n- ICMP, IGMP\n- Roteamento: RIP, OSPF, BGP\n\n4. PROTOCOLOS DE TRANSPORTE\n- TCP: Confiável, orientado a conexão\n- UDP: Rápido, sem conexão\n- SCTP, DCCP\n\n5. PROTOCOLOS DE APLICAÇÃO\n- HTTP/HTTPS\n- FTP, SFTP, TELNET, SSH\n- SMTP, POP3, IMAP\n- DNS, DHCP\n\n6. SEGURANÇA EM PROTOCOLOS\n- TLS/SSL\n- IPSec\n- Autenticação e Criptografia\n\n7. QUALIDADE DE SERVIÇO (QoS)\n- Largura de banda\n- Latência, Jitter\n- Perda de pacotes' },
  { id: 10002, slug: 'so', material: 'SISTEMAS OPERATIVOS\n\n1. CONCEITOS FUNDAMENTAIS\n- SO: Software que gerencia recursos\n- Kernel, Shell, Utilitários\n- Tipos: Monousuário, Multiusuário, Tempo real\n\n2. GERENCIAMENTO DE PROCESSOS\n- Processo, Thread, Tarefa\n- Estados: Pronto, Executando, Bloqueado\n- Escalonamento: FIFO, Round-Robin, Prioridade\n- Sincronização: Semáforo, Mutex, Monitor\n\n3. GERENCIAMENTO DE MEMÓRIA\n- Alocação: Contígua, Não-contígua\n- Paginação, Segmentação\n- Memória Virtual\n- Algoritmos: FIFO, LRU, Ótimo\n\n4. SISTEMA DE ARQUIVOS\n- Estrutura: Inode, Diretório\n- Alocação: Contígua, Ligada, Indexada\n- Fragmentação\n- FAT, NTFS, ext4\n\n5. ENTRADA/SAÍDA\n- Dispositivos: Blocos, Caracteres\n- Controladores\n- Interrupções, DMA\n- Buffers\n\n6. SEGURANÇA\n- Autenticação, Autorização\n- Controle de Acesso\n- Criptografia\n\n7. SISTEMAS OPERATIVOS MODERNOS\n- Linux, Windows, macOS\n- Android, iOS' },
  { id: 10003, slug: 'arquitetura', material: 'ARQUITETURA DE COMPUTADORES\n\n1. COMPONENTES BÁSICOS\n- CPU: Unidade de Controle, ULA\n- Memória: RAM, ROM, Cache\n- Barramento: Dados, Endereço, Controle\n- E/S: Portas, Controladores\n\n2. CICLO DE EXECUÇÃO\n- Busca (Fetch)\n- Decodificação (Decode)\n- Execução (Execute)\n- Escrita (Write-back)\n\n3. CONJUNTO DE INSTRUÇÕES\n- Tipos: Aritmética, Lógica, Transferência, Controle\n- Modos de Endereçamento\n- Formato de Instrução\n\n4. PIPELINE\n- Estágios: IF, ID, EX, MEM, WB\n- Hazards: Dados, Controle, Estrutural\n- Forwarding, Predição de Desvio\n\n5. HIERARQUIA DE MEMÓRIA\n- Registradores, Cache L1/L2/L3\n- Memória Principal (RAM)\n- Memória Secundária (Disco)\n- Princípio de Localidade\n\n6. PARALELISMO\n- Superescalaridade\n- VLIW (Very Long Instruction Word)\n- SIMD (Single Instruction Multiple Data)\n- Processadores Multi-core\n\n7. ARQUITETURAS MODERNAS\n- x86, ARM, MIPS\n- Von Neumann vs Harvard\n- Arquiteturas Especializadas (GPU, TPU)' }
];

const connection = await mysql.createConnection(process.env.DATABASE_URL);

for (const disc of disciplinesData) {
  await connection.execute(
    'UPDATE disciplines SET material = ? WHERE id = ?',
    [disc.material, disc.id]
  );
  console.log(`✓ Material adicionado: ${disc.slug}`);
}

console.log('\n✓ Material adicionado para as 3 disciplinas!');
await connection.end();
