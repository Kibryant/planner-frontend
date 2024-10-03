import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncStorage = AsyncStorage;

export async function getItem(key: string) {
  return await asyncStorage.getItem(key);
}

export async function setItem(key: string, value: any) {
  const jsonValue = JSON.stringify(value);
  await asyncStorage.setItem(key, jsonValue);
}

export async function deleteItem(key: string) {
  await asyncStorage.removeItem(key);
}
