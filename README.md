# React App Setup (macOS & Windows)

This guide will help you set up the React application on your local machine. The React application is a frontend client that consumes the Laravel API for currency exchange rates.

## Steps to Run the Project Locally

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone https://github.com/fizipan/currency-exchange-app.git
cd currency-exchange-app
```

### 2. Install Dependencies with NPM

Run the following command to install the dependencies:

```bash
npm install
```

<!-- set .env -->

### 3. Set Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
VITE_APP_API_URL=http://localhost/api
```

<!-- docker build and run -->

### 4. Build and Run the docker container

Run the following command to build and run the docker container:

```bash
docker-compose up
```

The React application will be running at [http://localhost:9000](http://localhost:9000).
