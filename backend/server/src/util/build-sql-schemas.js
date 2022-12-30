const fs = require('fs');
const path = require('path');

const schemasPath = './models';

// Read the contents of the schemas folder
const buildSqlSchemas = (app)=>
fs.readdir(schemasPath, (err, files) => {
  if (err) {
    console.error(`Error reading schemas folder: ${err.message}`);
    return;
  }

  // Initialize the SQL schema definition
  let sql = '';

  // Iterate over the files in the schemas folder
  files.forEach((file) => {
    // Skip any non-JavaScript files
    if (!file.endsWith('.js')) return;

    // Import the schema definition
    const schema = require(path.join(schemasPath, file));

    // Extract the base name of the file (without the .js extension)
    // and use it as the name of the table
    const tableName = file.replace('.js', '');

    // Generate the SQL statements for the table
    sql += `CREATE TABLE ${tableName} (\n`;
    for (const column of schema.columns) {
      sql += `  ${column.name} ${column.type}`;
      if (column.nullable) sql += ' NOT NULL';
      sql += ',\n';
    }
    sql += `);\n`;
  });

  // Print the SQL schema definition
  console.log(sql);
});

module.exports = buildSqlSchemas;