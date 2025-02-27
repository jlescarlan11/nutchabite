// src/services/idbService.ts
import { openDB } from "idb";

const DB_NAME = "NutchaBitesDB";
const DB_VERSION = 1;
const STORE_NAME = "orders";

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
    }
  },
});

export async function saveOrder(order: any) {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.add(order);
  await tx.done;
}

export async function getOrders() {
  const db = await dbPromise;
  return await db.getAll(STORE_NAME);
}
