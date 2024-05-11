import express from 'express'
import userRouter from './userRouter.js'
import likeRouter from './likeRouter.js'
import rateRouter from './rateRouter.js'
import resRouter from './resRouter.js'

const rootRouter = express.Router()

rootRouter.use("/user", userRouter)
rootRouter.use("/res", resRouter)
rootRouter.use("/like", likeRouter)
rootRouter.use("/rate", rateRouter)


export default rootRouter;


// localhost:8080/video/get-video
