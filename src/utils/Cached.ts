import Keyv from "keyv";
import { isEntityName } from "typescript";

export default interface Cached<Entity, ID> {
  /**
   * caches the entity
   */
  add(entity: Entity): Promise<void>;

  /**
   * find the entity if in cache
   */
  get(id: ID): Promise<Entity | undefined>
}

export abstract class IdCached<Entity, ID = number> implements Cached<Entity, ID> {

  protected ttl = 900000 // 15 minutes

  /**
   * memorized values
   */
  protected readonly memo = new Keyv<Entity>({ ttl: this.ttl });

  protected abstract idOf(entity: Entity): string;

  async add(entity: Entity): Promise<void> {
    this.memo.set(this.idOf(entity), entity)
  }

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

export abstract class AllCached<Entity, ID = number> implements Cached<Entity, ID> {

  protected readonly memo = new Map<ID, Entity>();

  protected abstract idOf(entity: Entity): ID;

  async add(entity: Entity): Promise<void> {
    this.memo.set(this.idOf(entity), entity)
  }

  async get(id: ID): Promise<Entity | undefined> {
    return this.memo.get(id)
  }

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
