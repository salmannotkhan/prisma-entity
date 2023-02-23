import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "../config/prisma";
import BaseEntity from "../utils/base-entity";

class PostEntity extends BaseEntity<typeof prisma.post> {
  private modelSchema = z.object({
    title: z.string().max(100),
    content: z.string().optional(),
    published: z.boolean().optional(),
    viewCount: z.number().positive().optional(),
    authorId: z.number().positive().optional()
  })

  protected async beforeCreate<Args extends { select?: Prisma.PostSelect | null | undefined; include?: Prisma.PostInclude | null | undefined; data: (Prisma.Without<Prisma.PostCreateInput, Prisma.PostUncheckedCreateInput> & Prisma.PostUncheckedCreateInput) | (Prisma.Without<Prisma.PostUncheckedCreateInput, Prisma.PostCreateInput> & Prisma.PostCreateInput); }>(args: Args): Promise<Args> {
    args.data = this.modelSchema.parse(args.data)
    return args
  }

  protected async beforeUpdate<Args extends { select?: Prisma.PostSelect | null | undefined; include?: Prisma.PostInclude | null | undefined; data: (Prisma.Without<Prisma.PostUpdateInput, Prisma.PostUncheckedUpdateInput> & Prisma.PostUncheckedUpdateInput) | (Prisma.Without<Prisma.PostUncheckedUpdateInput, Prisma.PostUpdateInput> & Prisma.PostUpdateInput); where: Prisma.PostWhereUniqueInput; }>(args: Args): Promise<Args> {
    args.data = this.modelSchema.partial().parse(args.data)
    return args
  }

  protected async beforeDelete<Args extends { select?: Prisma.PostSelect | null | undefined; include?: Prisma.PostInclude | null | undefined; where: Prisma.PostWhereUniqueInput; }>(args: Args): Promise<Args> {
    return args
  }
}

export default PostEntity
