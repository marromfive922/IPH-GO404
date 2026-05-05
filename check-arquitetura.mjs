import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const [rows] = await connection.execute(
  `SELECT id, slug, name, CHAR_LENGTH(material) as material_length FROM disciplines WHERE slug LIKE '%arquitetura%'`
);

console.log('Disciplina Arquitetura:');
rows.forEach(row => {
  console.log(`ID: ${row.id}, Slug: ${row.slug}, Nome: ${row.name}, Material Length: ${row.material_length}`);
});

await connection.end();
