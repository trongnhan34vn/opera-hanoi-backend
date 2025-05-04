export interface GenericService<T> {
    findAll: () => Promise<T[]>;
    save: (data: T) => Promise<T>;
    findById: (id: string) => Promise<T>;
    delete: (id: string) => Promise<void>;
  }
  