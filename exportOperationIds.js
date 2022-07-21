const fs = require('fs');
const path = require('path');
const { paths, openapi, ...otherSchemaData } = require('./schema.json');

// Index paths by operationId
// Include other schema fields unchanged (components, info, servers)
// Exclude "openapi" field, since this is not a valid openapi document

const operations = {};

function getMethodsFromPath(path) {
  const { parameters, ...pathData } = path;
  return pathData;
}

Object.entries(paths).forEach(([path, pathData]) => {
  const methodData = getMethodsFromPath(pathData);
  Object.entries(methodData).forEach(([method, data]) => {
    operations[data.operationId] = {
      method,
      path,
      data
    };
  });
});

const outPath = path.join(__dirname, process.argv[2] ?? 'operationIds.json');
fs.writeFileSync(outPath, JSON.stringify({ operations, ...otherSchemaData }));
