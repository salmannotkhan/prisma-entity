import { Prisma, User } from "@prisma/client";
import prisma from "../config/prisma";
import BaseEntity from "../utils/base-entity";

class UserEntity extends BaseEntity<typeof prisma.user>  {
  afterCreate(data: User) {
    return {
      ...data,
      isModified: true
    }
  }

  protected async beforeCreate<Args extends { select?: Prisma.UserSelect | null | undefined; include?: Prisma.UserInclude | null | undefined; data: (Prisma.Without<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput> & Prisma.UserUncheckedCreateInput) | (Prisma.Without<Prisma.UserUncheckedCreateInput, Prisma.UserCreateInput> & Prisma.UserCreateInput); }>(args: Args): Promise<Args> {
    return {
      ...args,
      data: {
        ...args.data,
        name: '(Test) ' + args.data.name
      }
    }
  }


  afterFind(data: User | null) {
    if (!data) { 
      return null
    }
    const [username, domain] = data.email.split("@")
    return {
      ...data,
      username,
      domain
    }
  }
}

export default UserEntity
