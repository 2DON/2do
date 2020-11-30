export default abstract class Cached<Entity, ID> {

  protected readonly memo = new Map<ID, Entity>();

  protected abstract idOf(entity: Entity): ID;

  /**
   * caches the entity
   */
  add(entity: Entity): void {
    this.memo.set(this.idOf(entity), entity)
  }

  /**
   * find the entity if in cache
   */
  get(id: ID): Entity | undefined {
    return this.memo.get(id)
  }

}

export abstract class IdCached<Entity, ID = number> extends Cached<Entity, ID> {

  /**
   * fetches and caches all entities by id
   */
  abstract async cacheAll(...ids: ID[]): Promise<void>;

  /**
   * retrives the entitys from cache if present
   */
  abstract async findAll(...ids: ID[]): Promise<Map<ID, Entity>>;

  /**
   * caches and retrives the entityes
   */
  async findAndCacheAll(...ids: ID[]): Promise<Map<ID, Entity>> {
    await this.cacheAll(...ids);
    return this.findAll(...ids);
  }

}

export abstract class AllCached<Entity, ID = number> extends Cached<Entity, ID> {

  protected abstract idOf(entity: Entity): ID;

  /**
   * fetches and caches all entities by id
   */
  abstract async cacheAll(): Promise<void>;

  /**
   * retrives the entitys from cache if present
   */
  abstract async findAll(): Promise<Map<ID, Entity>>;

  /**
   * caches and retrives the entityes
   */
  async findAndCacheAll(): Promise<Map<ID, Entity>> {
    await this.cacheAll();
    return this.findAll();
  }

}
