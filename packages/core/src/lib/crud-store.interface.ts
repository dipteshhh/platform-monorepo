import { DomainModel } from './domain-model.interface.ts';

export interface CrudStore<T extends DomainModel> {
  create(data: Omit<T, 'id'>): Promise<T>;
  read(id: string): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
  list(): Promise<T[]>;
}