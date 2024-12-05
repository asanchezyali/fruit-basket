# Fruit Basket

https://github.com/user-attachments/assets/530bfc26-28d0-4a44-aa7d-ffe5d2c6a126

This project is a simple React application that allows users to manage a list of fruits. It includes features to add, update, and delete fruits, as well as display a list of fruits fetched from an API.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn (v1 or higher)

## Getting Started

Follow these steps to set up and run the project in development mode:

1. **Clone the repository:**

```sh
git clone https://github.com/your-username/fruit-basket.git
cd fruit-basket
```

2. **Install dependencies:**

```sh
npm install
# or using yarn:
yarn install
   ```

3. Run the development server:

Using npm:

```sh
npm start
# or using yarn:
yarn start
```

The application will be available at `http://localhost:5173`.

## Running Tests
This project uses Vitest and React Testing Library for unit tests. Follow these steps to run the tests:

1. Run the tests:

```
npm test

# or using yarn:
yarn test
```

This will run all the test files and display the results in the terminal.

## Project Structure
`src`: Contains the source code of the application.
`components/`: Contains the React components.
`__tests__/`: Contains the test files for the components.
`public`: Contains the public assets and the HTML template.
`api.module.js`: Contains the mock API implementation.

## API
The project uses a mock API defined in `api.module.js` with the following methods:

`getAll()`: Fetches all the fruits.
`add(fruit)`: Adds a new fruit.
`update(oldName, newName)`: Updates an existing fruit.
`delete(name)`: Deletes a fruit.
