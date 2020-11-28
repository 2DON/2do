import Keyv from "keyv";

export default abstract class Cached<Entity, ID = number> {
  protected ttl = 900000 // 15 minutes

  /**
   * memorized values
   */
  protected memo = new Keyv<Entity>();

  /**
   * extracts the if of an entity
   */
  protected abstract idOf(entity: Entity): string;

  /**
   * caches the entity
   */
  async add(entity: Entity): Promise<void> {
    this.memo.set(this.idOf(entity), entity, this.ttl)
  }

  /**
   * find the entity if in cache
   */
  async get(id: ID): Promise<Entity | undefined> {
    return this.memo.get(String(id));
  }

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
