import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Set data
  set(key: string, value: any) {
    return this._storage?.set(key, value);
  }

  // Get data
  get(key: string) {
    return this._storage?.get(key);
  }

  // Remove single item
  remove(key: string) {
    return this._storage?.remove(key);
  }

  // Clear storage
  clear() {
    return this._storage?.clear();
  }
}