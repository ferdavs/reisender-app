import { profile } from "@nativescript/core";
import { SecureStorage } from "@nativescript/secure-storage";
import { injectable } from "inversify";
import { bind, fromJson, toJson } from "~/util";

export default interface SStorage {
    put(key: string, value: any): Promise<any>;
    get(key: string): Promise<any>;
    remove(key: string): Promise<boolean>;
    clear(): Promise<boolean>;
}

@injectable()
class StorageImpl implements SStorage {
    strg = new SecureStorage();

    @profile("storage.put")
    put(key: string, value: any): Promise<any> {
        return this.strg.set({ key: key, value: toJson(value) });
    }

    @profile("storage.get")
    async get<T>(key: string): Promise<T> {
        const v = await this.strg.get({ key: key });
        return fromJson(v);
    }

    @profile("storage.remove")
    remove(key: string): Promise<boolean> {
        return this.strg.remove({ key: key });
    }

    @profile("storage.clear")
    clear(): Promise<boolean> {
        return this.strg.removeAll();
    }
}

bind<SStorage>("SStorage", StorageImpl);
