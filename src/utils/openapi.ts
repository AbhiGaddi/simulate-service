import { OpenAPIV3 } from 'openapi-types';

const openApiSpec: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'AI NOC Microservice',
    version: '1.0.0',
    description: 'A microservice for logging and storing metrics, events, and agent actions.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
  paths: {
    '/records': {
      post: {
        summary: 'Create a new record',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  type: { type: 'string' },
                  timestamp: { type: 'string', format: 'date-time' },
                  data: { type: 'object', additionalProperties: true },
                },
                required: ['type', 'timestamp', 'data'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Record created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    type: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' },
                    data: { type: 'object', additionalProperties: true },
                  },
                },
              },
            },
          },
        },
      },
      get: {
        summary: 'Retrieve records',
        parameters: [
          {
            name: 'type',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            name: 'timestamp',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              format: 'date-time',
            },
          },
        ],
        responses: {
          '200': {
            description: 'A list of records',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      type: { type: 'string' },
                      timestamp: { type: 'string', format: 'date-time' },
                      data: { type: 'object', additionalProperties: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/records/{id}': {
      get: {
        summary: 'Retrieve a record by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Record retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    type: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' },
                    data: { type: 'object', additionalProperties: true },
                  },
                },
              },
            },
          },
          '404': {
            description: 'Record not found',
          },
        },
      },
    },
  },
};

export default openApiSpec;