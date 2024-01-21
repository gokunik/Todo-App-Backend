## Todo App backend with express

### Install dependencies

`npm install`

### Run the server

`npm start`

### Run the development server

`npm run dev`

### Api endpoints

#### Auth

`/api/v1/auth/signup` - POST

`/api/v1/auth/login` - POST

#### Todos

`/api/v1/todos` - GET, POS

- GET - get all todos
- POST - create a new todo

`/api/v1/todos/:id` - GET, PUT, DELETE

- GET - get a todo by id
- PUT - update a todo by id
- DELETE - delete a todo by id

### Other features

- [x] Authentication and Authorization using JWT
- [x] Input validation using ZOD
