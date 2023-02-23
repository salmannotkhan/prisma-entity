import { Request, Router } from "express"
import prisma from "../config/prisma"
import PostEntity from "../entities/Post"

const postRouter = Router({ mergeParams: true })

postRouter.post("/posts", async (req: Request<{ id: number }>, res) => {
  const { id } = req.params
  const { title, content } = req.body

  const postEntity = new PostEntity(prisma.post)
  const post = await postEntity.create({ data: { title, content, authorId: Number(id) } })

  res.json(post)
})

postRouter.patch("/posts/:postId", async (req: Request<{ id: number, postId: number }>, res) => {
  const { postId } = req.params
  const { title, content, published, viewCount } = req.body

  const postEntity = new PostEntity(prisma.post)
  const post = await postEntity.update({ where: { id: Number(postId) }, data: { title, content, published, viewCount } })

  res.json(post)
})

postRouter.get("/posts", async (req: Request<{ id: number }>, res) => {
  const { id } = req.params

  const postEntity = new PostEntity(prisma.post)
  const posts = await postEntity.findMany({ where: { authorId: Number(id) } })

  res.json(posts)
})

postRouter.get("/posts/:postId", async (req: Request<{ id: number, postId: number }>, res) => {
  const { id, postId } = req.params

  const postEntity = new PostEntity(prisma.post)
  const post = await postEntity.findFirst({ where: { id: Number(postId), authorId: Number(id) } })

  res.json(post)
})

postRouter.delete("/posts/:postId", async (req: Request<{ id: number, postId: number }>, res) => {
  const { id, postId } = req.params

  const postEntity = new PostEntity(prisma.post)
  const postExists =  await postEntity.findFirst({ where: { id: Number(postId), authorId: Number(id) } })
  if (!postExists) {
    res.status(404).json(null)
    return
  }
  const post = await postEntity.delete({ where: { id: Number(postId) } })

  res.json(post)
})

export default postRouter
