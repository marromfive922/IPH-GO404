import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const [rows] = await connection.execute(
  `SELECT id, slug, name FROM disciplines ORDER BY id`
);

console.log('Todas as Disciplinas:');
console.log('====================');
rows.forEach(row => {
  console.log(`ID: ${row.id}, Slug: ${row.slug}, Nome: ${row.name}`);
});

await connection.end();
