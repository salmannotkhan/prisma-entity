# Prisma Entity

This is an example how you can implement fully type-safe entity model using prisma.

## Features

- End-to-End type safety
- Before and After hooks for each operation
- Completely extensible
 
## Examples

- User Entity (src/entities/User.ts): Before and After hooks
- Post Entity (src/entities/Post.ts): Data validation using zod

## Getting started

```bash
git clone git@github.com:salmannotkhan/prisma-entity.git
```

Install npm dependencies:

```bash
cd prisma-entity
npm install
```

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```bash
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.


### 3. Start the REST API server

```bash
npm run dev
```

The server is now running on `http://localhost:3000`. You can now run the API requests, e.g. [`http://localhost:3000/users`](http://localhost:3000/users).

## Using the REST API

You can access the REST API of the server using the following endpoints:

### `GET`

- `/users`: Fetch all users
- `/users/:id`: Fetch user by their `id`
- `/users/:id/posts`: Fetch all posts by user `id`
- `/users/:id/posts/:postId`: Fetch post by user `id` and post `id`


### `POST`

- `/users`: Create a new User
    - `email: String` (required): The email address of the user
    - `name: String` (optional): The name of the user
- `/users/:id/posts`: Create new posts for the user `id`
    - `title: String` (required): The title for the post
    - `content: String` (optoinal): The content of the post
    - `published: Boolean` (optional): The content of the post
    - `viewCount: Number` (optoinal): The view count of the post

### `PATCH`

- `/users/:id`: Update the user details by using it's `id`
- `/users/:id/posts/:postId`: Update post for the user `id` and post `id`

### `DELETE`

- `/users/:id`: Delete a user by its `id`
- `/users/:id/posts/:postId`: Delete a post by user `id` and post `id`
