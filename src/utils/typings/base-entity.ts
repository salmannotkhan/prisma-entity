type Fn = (...args: any) => any

export type TBaseModel = {
  create: Fn;
  update: Fn;
  updateMany: Fn;
  delete: Fn;
  deleteMany: Fn;
  findFirst: Fn;
  findMany: Fn;
  findUnique: Fn;
  count: Fn;
  upsert: Fn;
  groupBy: Fn;
  aggregate: Fn;
}
