import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const [rows] = await connection.execute(
  `SELECT id, slug, name, IF(material IS NOT NULL AND material != '', 'SIM', 'NÃO') as tem_material 
   FROM disciplines 
   WHERE slug IN ('protocolo-comunicacao', 'sistemas-operativos', 'arquitetura-computadores', 'ihm') 
   ORDER BY id`
);

console.log('Disciplinas e Material Educativo:');
console.log('==================================');
rows.forEach(row => {
  console.log(`ID: ${row.id}, Slug: ${row.slug}, Nome: ${row.name}, Material: ${row.tem_material}`);
});

await connection.end();
