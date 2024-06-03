export const storeDataInLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getDataFromLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}