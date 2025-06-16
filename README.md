# socket-chat-api

**socket-chat-api** is a backend API for a real-time one-to-one chat system built with Node.js, Express, and Socket.IO. It uses WebSockets for bidirectional messaging and MongoDB for data persistence. The system is secured with JWT authentication, Helmet, and rate limiting. It is ready for local development, testing, and Docker deployment.

---

## 🚀 Features

- Real-time one-to-one chat via WebSockets (`Socket.IO`)
- REST API for user management and authentication
- Secure authentication with JWT
- Input validation using `express-validator`
- HTTP security with `helmet` and `express-rate-limit`
- Structured logging with `pino`
- MongoDB integration using `mongoose`
- Unit testing with `jest` and `supertest`
- Ready-to-use Docker environment

---

## 📦 Requirements

Make sure you have installed:

- [Node.js](https://nodejs.org/en/) `>=18`
- [pnpm](https://pnpm.io/installation)
- [Docker](https://docs.docker.com/get-docker/) (optional)

---

## ⚙️ Environment Configuration

Create a `.env` file based on `.env.example`. Required variables:

```env
NODE_ENV=development
PORT=3030

# JWT
JWT_SECRET_KEY=yourStrongSecretKey

# MongoDB
DB_MONGO=mongodb://localhost:27017/socket-chat
TEST_DB_MONGO=mongodb://localhost:27017/socket-chat-test

# Rate Limiting
RATE_LIMIT_MAX_MINUTES=1
RATE_LIMIT_MAX_REQUESTS=300
```

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/your-user/socket-chat-api.git
cd socket-chat-api

# Install dependencies
pnpm install

# Run in development mode
pnpm dev
```

---

## 🐳 Running with Docker

```bash
# Start services
pnpm run docker:up

# Stop and remove services
pnpm run docker:down
```

---

## 📜 Available Scripts

| Script             | Description                                                   |
|--------------------|---------------------------------------------------------------|
| `pnpm dev`         | Starts the server in development mode with nodemon            |
| `pnpm build`       | Compiles TypeScript files to the `dist` directory             |
| `pnpm start`       | Builds and runs the app in production                         |
| `pnpm lint`        | Runs ESLint and auto-fixes issues                             |
| `pnpm test`        | Runs unit tests using Jest                                    |
| `pnpm test:cov`    | Runs tests with code coverage report                          |
| `pnpm docker:up`   | Launches Docker containers in detached mode                   |
| `pnpm docker:down` | Stops and removes the Docker containers                       |

---

## 🧪 Testing

The test environment uses a separate MongoDB instance defined by the `TEST_DB_MONGO` variable.

```bash
pnpm test
```

---

## 🧱 Tech Stack

- **Node.js** + **TypeScript**
- **Express**
- **Socket.IO**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **Pino** for logging
- **Helmet**, **CORS**, **Rate limiting** for security
- **Jest**, **Supertest** for testing
- **Docker** for containerization

---

## 🧑‍💻 Author

Developed by [Diegoipaez](https://github.com/Diegoipaez)
