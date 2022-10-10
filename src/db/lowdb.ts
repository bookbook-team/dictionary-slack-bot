import { isEqual } from "lodash";
import { JSONFile, Low } from "lowdb-cjs/lib";
import { join } from "path";
import { Word } from "../types/word";
import { Installation } from "../types/installation";

export type LowDbScheme = {
  words: Word[];
  installations: Installation<boolean>[];
};

export class LowDb {
  private db: Low<LowDbScheme>;

  constructor() {
    const file = join(__dirname, "db.json");
    const adapter = new JSONFile<LowDbScheme>(file);
    this.db = new Low(adapter);
  }

  async save<T extends keyof LowDbScheme>(
    key: T,
    data: LowDbScheme[T] extends Array<infer R> ? R : never
  ): Promise<void> {
    // Read data from JSON file, this will set db.data content
    await this.db.read();

    this.db.data ??= { [key]: [] } as unknown as LowDbScheme;
    this.db.data[key] ??= [];
    this.db.data![key].push(data as any);

    await this.db.write();
  }

  async update<T extends keyof LowDbScheme>(
    key: T,
    where: LowDbScheme[T] extends Array<infer R> ? Partial<R> : never,
    data: LowDbScheme[T] extends Array<infer R> ? R : never
  ): Promise<void> {
    await this.db.read();
    this.db.data ??= { [key]: [] } as unknown as LowDbScheme;
    this.db.data[key] ??= [];
    const index = this.db.data[key].findIndex((row) => {
      return findByWhere(row, where);
    });
    this.db.data[key][index] = data as any;
    await this.db.write();
  }

  async getOne<T extends keyof LowDbScheme>(
    key: T,
    where: LowDbScheme[T] extends Array<infer R> ? Partial<R> : never
  ) {
    await this.db.read();
    this.db.data ??= { [key]: [] } as unknown as LowDbScheme;
    this.db.data[key] ??= [];
    const table = this.db.data[key];
    if (!table) {
      return;
    }

    return (table as any[]).find((row: any) =>
      findByWhere(row, where)
    ) as LowDbScheme[T] extends Array<infer R> ? R : never;
  }

  async delete<T extends keyof LowDbScheme>(
    key: T,
    where: LowDbScheme[T] extends Array<infer R> ? Partial<R> : never
  ) {
    await this.db.read();
    this.db.data ??= { [key]: [] } as unknown as LowDbScheme;
    this.db.data[key] ??= [];
    const index = this.db.data[key].findIndex((row) => {
      return findByWhere(row, where);
    });
    this.db.data[key].splice(index, 1);
    await this.db.write();
  }
}

export const lowDb = new LowDb();

function findByWhere(row: any, where: any): boolean {
  return Object.keys(where).every((field) => {
    const whereField: any = where[field];

    if (typeof whereField !== "object") {
      return isEqual(row[field], whereField);
    }

    const nestedKey = Object.keys(whereField)[0];
    // @ts-ignore
    return isEqual(row[field][nestedKey], whereField[nestedKey]);
  });
}
