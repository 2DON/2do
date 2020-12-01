export default abstract class Cached<Entity, ID> {

  protected ttl = 600000;

  protected readonly memo = new Map<ID, { exp: number; entity: Entity }>();

  protected abstract idOf(entity: Entity): ID;

  private exp(): number {
    return Date.now() + this.ttl;
  }

  private expired(n: number): boolean {
    return Date.now() > n;
  }

  /**
   * caches the entity
   */
  add(entity: Entity): void {
    this.memo.set(this.idOf(entity), { entity, exp: this.exp() })
  }

  /**
   * find the entity if in cache
   */
  get(id: ID): Entity | undefined {
    const got = this.memo.get(id)

    if (got == null) {
      return undefined;
    }

    if (this.expired(got.exp)) {
      this.memo.delete(id)
      return undefined
    }

    return got.entity
  }

  /**
   * get from catch or fetch, cache and then return
   */
  abstract async getOrFetch(id: ID): Promise<Entity | undefined>;

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
