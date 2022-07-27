const api = require('../schema.json');

/** Strip 'parameters' property so path object only contains methods */
function getMethodsFromPath(path) {
  const { parameters, ...pathData } = path;
  return pathData;
}

describe('OpenAPI description for ShoeVox', () => {
  test('every endpoint has an operationId', () => {
    Object.keys(api.paths).forEach((apiPath) => {
      const methodData = getMethodsFromPath(api.paths[apiPath]);
      Object.values(methodData).forEach((v) => {
        expect(v.operationId).not.toBeUndefined();
      });
    });
  });

  test('every required property of a schema is defined on the schema', () => {
    Object.values(api.components.schemas).forEach((schema) => {
      if (schema.type === 'object') {
        schema.required?.forEach((requiredPropName) => {
          expect(schema.properties[requiredPropName]).not.toBeUndefined();
        });
      }
    });
  });

  test('every GET request with parameters handles 404 NOT FOUND response', () => {
    Object.entries(api.paths).forEach(([pathName, pathData]) => {
      if (!(pathData).parameters) {
        return;
      }

      Object.entries(getMethodsFromPath(api.paths[pathName]))
        .forEach(([, v]) => {
          expect((v).responses['404']).not.toBeUndefined();
        });
    });
  });

  test('every endpoint with requestBody handles 400 INVALID VALUE error', () => {
    Object.entries(api.paths).forEach(([pathName]) => {
      Object.values(getMethodsFromPath(api.paths[pathName]))
        .filter((method) => !!method.requestBody)
        .forEach((v) => {
          expect(v.responses['400']).not.toBeUndefined();
        });
    });
  });

  test('Paginated responses have "data" array and a "links" property', () => {
    Object.keys(api.paths).forEach((apiPath) => {
      const methodData = getMethodsFromPath(api.paths[apiPath]);
      Object.values(methodData).forEach((v) => {
        if (v.tags.includes('paginated')) {
          const { schema } = v.responses['200'].content['application/json'];

          expect(schema.required).toContain('links');
          expect(schema.required).toContain('data');

          expect(schema.properties.links).not.toBeUndefined();
          expect(schema.properties.data).not.toBeUndefined();

          expect(schema.properties.data.type).toBe('array');
        }
      });
    });
  });
});
