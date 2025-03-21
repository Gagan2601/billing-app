const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'schema.prisma');
const modelsDir = path.join(__dirname, 'models');

const generatorAndDatasource = `
generator client {
  provider = "prisma-client-js"
  output = "../../../node_modules/.prisma/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
`;

let models = '';

// Read all model files and append their content
fs.readdirSync(modelsDir).forEach((file) => {
  if (file.endsWith('.prisma')) {
    const modelContent = fs.readFileSync(path.join(modelsDir, file), 'utf8');
    models += modelContent + '\n';
  }
});

// Write the merged schema.prisma file
fs.writeFileSync(schemaPath, generatorAndDatasource + models, 'utf8');

console.log('✅ Prisma schema merged successfully!');
