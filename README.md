# Project - Shopping Cart System

## General Description
This project includes a shopping cart system that operates with a Node.js backend and a React frontend, with a Redis database connection for temporary data management. The system uses modern technologies like Docker, Vite, Redis, and Axios.

## Code Structure
The project is divided into several main parts:

1. **Backend (Node.js)**
   - Built with `Express` and manages the Redis connection.
   - Uses `axios` for sending and receiving data from the server.
   - Includes services for reading, adding, updating, and deleting items in the shopping cart.

2. **Frontend (React + Vite)**
   - Uses Vite for fast React development.
   - Includes a shopping cart page with options to add items, update item quantities, and remove items.
   - The connection to the backend is handled via `axios` for sending RESTful requests.

3. **Redis**
   - Used to store temporary shopping cart data so that when the client reconnects, it can retrieve the data from the server and prevent data loss.
   - The connection to Redis is handled using the `ioredis` library in Node.js.

## Technologies Used

- **Backend (Server)**:
  - `Node.js` with `Express`
  - `axios` for sending and receiving HTTP requests
  - `ioredis` for Redis connection
  - `dotenv` for managing environment variables

- **Frontend (Client)**:
  - `React` with `Vite`
  - `axios` for connecting to the backend API
  - `MUI` for user interface design

- **Redis**:
  - Serves as a temporary data store for shopping cart items

- **Docker**:
  - All services (Backend, Frontend, and Redis) run inside containers using Docker and Docker Compose.
  
## Prerequisites

Before running the project, ensure the following dependencies are installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Redis](https://redis.io/) (if not using a Docker container)
- [Docker](https://www.docker.com/get-started)

## Installation and Running

### 1. Installation via Docker

To run all services inside containers using Docker:

1. Clone the project:
   ```bash
   git clone [https://your-repository-url](https://github.com/PROL3/ShopFrontendProject/tree/main)
   cd ShopFrontendProject
