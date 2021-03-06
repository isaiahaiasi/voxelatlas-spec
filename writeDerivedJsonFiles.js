const fs = require('fs');
const path = require('path');
const { paths, openapi, ...otherSchemaData } = require('./src/schema.json');

function getMethodsFromPath(path) {
  const { parameters, ...pathData } = path;
  return pathData;
}

/**
 * Index paths by operationId.
 * Include other schema fields unchanged (components, info, servers).
 * Exclude "openapi" field, since this is not a valid openapi document.
 */
function writeIndexedOperationsFile() {
  const operations = {};

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

  const outPath = path.join(__dirname, 'src/operations.json');
  fs.writeFileSync(outPath, JSON.stringify({ operations, ...otherSchemaData }));
}

function writePaginatedOperationsFile() {
  const paginatedOperationIds = [];
  Object.entries(paths).forEach(([path, pathData]) => {
    const methodData = getMethodsFromPath(pathData);
    Object.entries(methodData).forEach(([method, data]) => {
      if (data.tags.includes('paginated')) {
        paginatedOperationIds.push(data.operationId);
      }
    });
  });

  const outPath = path.join(__dirname, 'src/paginatedOperationId.ts');
  fs.writeFileSync(outPath,
    'export type PaginatedOperationId = ' + paginatedOperationIds.map(op => `"${op}"`).join('|'));
}

writeIndexedOperationsFile();
writePaginatedOperationsFile();