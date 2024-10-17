# Comic Store Backend

## Overview

The Comic Store Backend is a RESTful API built using Node.js, Express, and MongoDB to manage a collection of comic books. This project allows you to create, retrieve, update, and delete comic books, providing comprehensive functionality for a comic book store inventory system.

**Postman Documentation:** [Click here to test the API](https://documenter.getpostman.com/view/38127552/2sAXxV7WA4)

## Table of Contents
1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Project Setup](#project-setup)
4. [Environment Variables](#environment-variables)
5. [API Endpoints](#api-endpoints)
6. [Error Handling](#error-handling)
7. [Postman Documentation](#postman-documentation)
8. [Contributing](#contributing)
9. [License](#license)

## Features
- Create a new comic book entry.
- Retrieve a list of all comic books with filtering, sorting, and pagination.
- Get details of a specific comic book by its ID.
- Update the information of an existing comic book.
- Delete a comic book from the collection.
- Comprehensive error handling for invalid requests.

## Prerequisites
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- MongoDB database

## Project Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sarthak431/comic-store-backend.git
   cd comic-store-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory with the following content:
   ```plaintext
   PORT=3000
   DB_STRING=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   DB_PASSWORD=<your_database_password>
   NODE_ENV=DEVELOPMENT
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

   The server will start on the specified `PORT` (default: 3000), and you should see a message indicating that MongoDB is connected.

## Environment Variables
Here's a breakdown of the environment variables required for the project:

- `PORT`: The port number where the server will run (default is `3000`).
- `DB_STRING`: The MongoDB connection string template to connect to the database.
- `DB_PASSWORD`: Password for the MongoDB user.
- `NODE_ENV`: Set to `DEVELOPMENT` or `PRODUCTION` to enable different levels of logging and error handling.

## API Endpoints

### 1. Health Check
- **Endpoint**: `/health`
- **Method**: GET
- **Description**: Returns the server status and current server time.
- **Response**:
  ```json
  {
    "status": "OK",
    "serverTime": "2023-10-17T00:00:00.000Z"
  }
  ```

### 2. Create a Comic Book
- **Endpoint**: `/api/v1/comicBooks`
- **Method**: POST
- **Description**: Create a new comic book entry.
- **Body**:
  ```json
  {
    "name": "Comic Book Name",
    "author": "Author Name",
    "year": 2022,
    "price": 15.99,
    "discount": 2,
    "pages": 120,
    "condition": "new",
    "description": "A brief description of the comic book."
  }
  ```

### 3. Get All Comic Books
- **Endpoint**: `/api/v1/comicBooks`
- **Method**: GET
- **Description**: Retrieve a list of all comic books with optional filtering, pagination, and sorting.
- **Query Parameters**:
  - `page`: Page number for pagination (default: 1)
  - `limit`: Number of items per page (default: 10)
  - `sort`: Sort by field (default: `createdAt`)

### 4. Get a Comic Book by ID
- **Endpoint**: `/api/v1/comicBooks/:id`
- **Method**: GET
- **Description**: Retrieve a comic book's details by its ID.

### 5. Update a Comic Book
- **Endpoint**: `/api/v1/comicBooks/:id`
- **Method**: PATCH
- **Description**: Update the details of a specific comic book.
- **Body**:
  ```json
  {
    "name": "Updated Comic Book Name",
    "price": 18.99
  }
  ```

### 6. Delete a Comic Book
- **Endpoint**: `/api/v1/comicBooks/:id`
- **Method**: DELETE
- **Description**: Remove a comic book from the collection.

## Error Handling
The API uses a centralized error handling mechanism. Errors are returned in the following format:
```json
{
  "success": false,
  "status": "error",
  "message": "Error description"
}
```

## Postman Documentation
All API endpoints are documented in the [Postman Documentation](https://documenter.getpostman.com/view/38127552/2sAXxV7WA4). You can use this link to test the API interactively.

## Contributing
If you wish to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new feature branch.
3. Make your changes and submit a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.
