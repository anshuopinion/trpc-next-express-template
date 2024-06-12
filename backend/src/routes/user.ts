import { privateProcedure, router } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  helloUser: privateProcedure
    .input(
      z.object({
        name: z.string().optional(),
      })
    )
    .query(async (opts) => {
      try {
        const { user } = opts.ctx;
        const data = { ...opts.input };
        return `Hello ${data.name ?? user.first_name}`;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
});
