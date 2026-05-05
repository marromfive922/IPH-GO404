import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const [rows] = await connection.execute(
  `SELECT id, slug, name FROM disciplines ORDER BY id`
);

console.log('Todos os Slugs das Disciplinas:');
rows.forEach(row => {
  console.log(`${row.id}: ${row.slug}`);
});

await connection.end();
