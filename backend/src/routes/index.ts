import { router } from "../trpc";
import { authRouter } from "./auth";
import { userRouter } from "./user";

const appRouter = router({
  auth: authRouter,
  user: userRouter,
});

export { appRouter };
export type AppRouter = typeof appRouter;
