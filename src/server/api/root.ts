import { createTRPCRouter } from './trpc';
import { exampleRouter } from './routers/example';
import { sessionRouter } from './routers/session';
import { textRouter } from './routers/text';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  session: sessionRouter,
  text: textRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
