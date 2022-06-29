import { components, paths, operations } from './types/generated-types'

declare const schema: {
  openapi: string,
  info: {
    title: string,
    description: string,
    version: string,
  },
  servers: {
    url: string,
    description: string,
  }[],
  paths: paths,
  components: components,
}

declare module '@isaiahaiasi/voxelatlas-spec' {
  export default schema;
}

export { operations, components, paths };