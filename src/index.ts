import express from "express";
import postRouter from "./routes/posts";
import userRouter from "./routes/users";

const app = express();
app.use(express.json())

app.use((req, _res, next) => {
  console.log(req.method, req.url)
  next()
})

app.use("/users", userRouter)
app.use("/users/:id", postRouter)

app.listen(3000, () => {
  console.log('🚀 Server ready at: http://localhost:3000')
});
