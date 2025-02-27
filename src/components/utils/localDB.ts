// src/utils/localDB.ts
import { openDB, IDBPDatabase } from "idb";

const DB_NAME = "nutchaBitesDB";
const STORE_NAME = "orders";

let dbPromise: Promise<IDBPDatabase<any>>;

/**
 * Initializes the IndexedDB database.
 */
export async function initDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      },
    });
  }
  return dbPromise;
}

/**
 * Saves an order to IndexedDB.
 * @param order - The order data to save.
 * @returns A string representing the order ID.
 */
export async function saveOrderToLocalDB(order: any): Promise<string> {
  try {
    const db = await initDB();
    const id = await db.add(STORE_NAME, {
      ...order,
      date: new Date().toISOString(),
    });
    return `#${id}`;
  } catch (error) {
    console.error("Error saving order:", error);
    throw error;
  }
}

/**
 * Syncs offline orders with a remote server.
 * This is a stub and should be replaced with actual sync logic.
 */
export async function syncOrders() {
  try {
    const db = await initDB();
    const allOrders = await db.getAll(STORE_NAME);
    // TODO: Replace with your server sync logic.
    console.log("Syncing orders to server:", allOrders);
    // Optionally clear the store if sync succeeds.
    // await db.clear(STORE_NAME);
  } catch (error) {
    console.error("Sync error:", error);
  }
}
