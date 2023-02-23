import { TBaseModel } from "./typings/base-entity"

abstract class BaseEntity<T extends TBaseModel> {
  constructor(readonly model: T) {}

  protected async beforeCreate<Args extends Parameters<T['create']>[0]> (args: Args): Promise<Args> {
    return args
  }

  afterCreate (data: Awaited<ReturnType<T['create']>>) {
    return data
  }

  protected async beforeUpdate<Args extends Parameters<T['update']>[0]> (args: Args): Promise<Args> {
    return args
  }

  afterUpdate (data: Awaited<ReturnType<T['update']>>) {
    return data
  }

  protected async beforeDelete<Args extends Parameters<T['delete']>[0]> (args: Args): Promise<Args> {
    return args
  }

  afterDelete (data: Awaited<ReturnType<T['delete']>>) {
    return data
  }

  protected async beforeFindMany<Args extends Awaited<ReturnType<T['findMany']>> | undefined> (args: Args): Promise<Args>  {
    return args
  }

  protected async beforeFindUnique<Args extends Awaited<ReturnType<T['findUnique']>> | undefined> (args: Args): Promise<Args >  {
    return args
  }

  protected async beforeFindFirst<Args extends Awaited<ReturnType<T['findFirst']>> | undefined> (args: Args): Promise<Args>  {
    return args
  }

  afterFind (data: Awaited<ReturnType<T['findFirst']>>) {
    return data
  }

  async create (args: Parameters<T['create']>[0]): Promise<ReturnType<this['afterCreate']>> {
    const processedArgs = await this.beforeCreate(args)
    const data = await this.model.create(processedArgs)
    return this.afterCreate(data)
  }

  async update (args: Parameters<T['update']>[0]): Promise<ReturnType<this['afterUpdate']>> {
    const processedArgs = await this.beforeUpdate(args)
    const data = await this.model.update(processedArgs)
    return this.afterUpdate(data)
  }

  async delete (args: Parameters<T['delete']>[0]): Promise<ReturnType<this['afterDelete']>> {
    const processedArgs = await this.beforeDelete(args)
    const data = await this.model.delete(processedArgs)
    return this.afterDelete(data)
  }

  async findMany (args?: Parameters<T['findMany']>[0]): Promise<ReturnType<this['afterFind']>[]> {
    const processedArgs = await this.beforeFindMany(args)
    const data = await this.model.findMany(processedArgs)
    return Promise.all(data.map(this.afterFind))
  }

  async findUnique (args: Parameters<T['findUnique']>[0]): Promise<ReturnType<this['afterFind']>> {
    const processedArgs = await this.beforeFindUnique(args)
    const data = await this.model.findUnique(processedArgs)
    return this.afterFind(data)
  }

  async findFirst (args: Parameters<T['findFirst']>[0]): Promise<ReturnType<this['afterFind']>[]> {
    const processedArgs = await this.beforeFindFirst(args)
    const data = await this.model.findFirst(processedArgs)
    return this.afterFind(data)
  }
}

export default BaseEntity
