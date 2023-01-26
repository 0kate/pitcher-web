import { credential } from 'firebase-admin';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

initializeApp({
  credential: credential.cert(process.env.FIREBASE_SECRET),
});
const db = getFirestore();

const inMemoryStore = {};

export const textRouter = createTRPCRouter({
  getUnreceived: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(({ input }) => {
      const targetBox = inMemoryStore[input.sessionId] || [];

      return {
        text: targetBox.pop(),
      };
    }),
  send: publicProcedure
    .input(z.object({ sessionId: z.string(), text: z.string() }))
    .mutation(({ input }) => {
      console.log('send text to session');
      console.log(input);

      if (!(input.sessionId in inMemoryStore))
        inMemoryStore[input.sessionId] = [];

      inMemoryStore[input.sessionId].push(input.text);

      return {
        data: {},
      };
    }),
});
