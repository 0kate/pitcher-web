import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const sessionRouter = createTRPCRouter({
  create: publicProcedure
    .query(({}) => {
      return {
        sessionId: uuidv4(),
      };
    })
});
