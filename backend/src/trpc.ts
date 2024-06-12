import * as trpcExpress from "@trpc/server/adapters/express";
import { TRPCError, initTRPC } from "@trpc/server";
import jwt from "jsonwebtoken";
import { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws";
import { IUser, UserModel } from "./model/user";

const decodeAndVerifyJwtToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    return decoded;
  } catch (error) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid token",
    });
  }
};

const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions | CreateWSSContextFnOptions) => {
  async function getTokenFromHeader() {
    if (req.headers.authorization) {
      const decodedToken = await decodeAndVerifyJwtToken(
        req.headers.authorization?.split(" ")[1]
      );
      return decodedToken as { userId: string; email: string };
    }
    return null;
  }
  const token = await getTokenFromHeader();

  if (!token) {
    return {
      user: null,
    };
  }
  const user = (await UserModel.findById(token.userId)) as IUser;
  return {
    user,
  };
}; // no context
type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;

export const privateProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;

  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to access this resource",
    });
  }
  return opts.next({
    ctx: {
      user: ctx.user,
    },
  });
});

export { createContext, trpcExpress };
