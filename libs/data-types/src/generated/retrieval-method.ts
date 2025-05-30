export const RetrievalMethods = ['fishing','divespot','mines'] as const;

export type RetrievalMethod = typeof RetrievalMethods[number];