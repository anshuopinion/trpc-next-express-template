import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext } from "./trpc";
import { appRouter } from "./routes";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import { DATABASE_URL } from "./config";
const app = express();
const server = http.createServer(app);
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const port = process.env.TRPC_PORT || 4000;

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/trpc`);
});

process.on("SIGTERM", () => {
  server.close();
});
