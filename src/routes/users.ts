import { Router } from "express";
import prisma from "../config/prisma";
import UserEntity from "../entities/User";

const userRouter = Router()

userRouter.post(`/`, async (req, res) => {
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

userRouter.get("/", async (_req, res) => {
  const userEntity = new UserEntity(prisma.user)
  const users = await userEntity.findMany();
  res.json(users);
});

userRouter.get("/:id", async (req, res) => {
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

userRouter.patch(`/:id`, async (req, res) => {
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

userRouter.delete("/users/:id", async (req, res) => {
  const { id } = req.params

  const userEntity = new UserEntity(prisma.user)
  const user = await userEntity.delete({
    where: {
      id: Number(id)
    }
  })
  res.json(user);
});


export default userRouter
