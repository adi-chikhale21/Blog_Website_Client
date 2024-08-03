export const KEY_ACCESS_TOKEN = "access_token";

export function getItems(key) {
  return localStorage.getItem(key);
}

export function setItems(key, value) {
  return localStorage.setItem(key, value);
}

export function removeItem(key) {
  return localStorage.removeItem(key);
}
