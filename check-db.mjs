import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const [disciplines] = await connection.execute('SELECT id, name, slug, material FROM disciplines ORDER BY id');
const [questions] = await connection.execute('SELECT disciplineId, COUNT(*) as count FROM questions GROUP BY disciplineId');

console.log('\n=== DISCIPLINAS ===');
disciplines.forEach(d => {
  const hasMaterial = d.material && d.material.length > 50;
  const qCount = questions.find(q => q.disciplineId === d.id)?.count || 0;
  console.log(`${d.id}. ${d.name} (${d.slug}): Material=${hasMaterial ? 'SIM' : 'NÃO'}, Questões=${qCount}`);
});

await connection.end();
