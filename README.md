# AI NOC Microservice

This project is a simple, extensible microservice designed to support the development, testing, and evaluation of automated Network Operations Center (NOC) operations. It provides a general-purpose backend for storing logs, metrics, events, and agent actions using a PostgreSQL database.

## Features

- RESTful APIs for creating and reading records
- Support for dynamic fields using JSONB in PostgreSQL
- Strong validation for incoming requests
- Auto-generated OpenAPI documentation
- CORS support
- Connection pooling for PostgreSQL
- Lightweight and modular architecture

## Project Structure

```
ai-noc-microservice
├── src
│   ├── app.ts                # Initializes the Express application and sets up middleware
│   ├── server.ts             # Starts the server and listens on a specified port
│   ├── controllers
│   │   └── recordsController.ts # Handles business logic for records
│   ├── routes
│   │   └── records.ts        # Defines routes for the records API
│   ├── models
│   │   └── record.ts         # Defines the structure of records in PostgreSQL
│   ├── middlewares
│   │   ├── validation.ts     # Validates incoming requests
│   │   └── errorHandler.ts    # Handles errors and sends responses
│   ├── utils
│   │   └── openapi.ts        # Generates OpenAPI documentation
│   └── types
│       └── index.ts          # TypeScript interfaces and types
├── package.json               # npm configuration file
├── tsconfig.json              # TypeScript configuration file
├── README.md                  # Project documentation
└── openapi.yaml               # OpenAPI specification for the API
```

## API Endpoints

- **POST /records**: Create a new record
- **GET /records/:id**: Retrieve a record by ID
- **GET /records**: Retrieve records, with optional filtering by type or timestamp

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd ai-noc-microservice
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the PostgreSQL database and update the connection settings in the application.

4. Start the server:
   ```
   npm start
   ```

## Usage


### Example: Create a Record

Use the following curl command to create a new log record:

```sh
curl --location 'http://localhost:3000/records' \
--header 'Content-Type: application/json' \
--data '{
    "type": "log",
    "timestamp": "2025-08-01T15:45:00Z",
    "data": {
        "message": "Test log entry",
        "severity": "info"
    }
}'
```

### Example: Get Records by Type

Use the following curl command to retrieve all records of type `log`:

```sh
curl --location 'http://localhost:3000/records?type=log'
```

Refer to the OpenAPI documentation for detailed information on request and response formats.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.