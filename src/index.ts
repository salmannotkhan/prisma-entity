import express from "express";
import prisma from "./config/prisma";
import UserEntity from "./entities/User";

const app = express();
app.use(express.json())

app.use((req, _res, next) => {
  console.log(req.method, req.url)
  next()
})

app.post(`/users`, async (req, res) => {
  const { name, email } = req.body;

  const userEntity = new UserEntity(prisma.user)
  const result = await userEntity.create({
    data: {
      name,
      email,
    },
  });
  res.json(result);
});

app.get("/users", async (_req, res) => {
  const userEntity = new UserEntity(prisma.user)
  const users = await userEntity.findMany();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const userEntity = new UserEntity(prisma.user)
  const users = await userEntity
    .findUnique({
      where: {
        id: Number(id),
      },
    })

  res.json(users);
});

app.patch(`/users/:id`, async (req, res) => {
  const { id } = req.params
  const { name, email } = req.body;

  const userEntity = new UserEntity(prisma.user)
  const result = await userEntity.update({
    where: { 
      id: Number(id)
    },
    data: {
      name,
      email,
    },
  });
  res.json(result);
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params

  const userEntity = new UserEntity(prisma.user)
  const user = await userEntity.delete({
    where: {
      id: Number(id)
    }
  })
  res.json(user);
});


app.listen(3000, () => {
  console.log('🚀 Server ready at: http://localhost:3000')
});
