// Set an item with a Key to local storage
export const saveStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data))
  }
  // Look for a local storage item and returns if present
  export const getStorage = (key: string, item?: string | number) => {
    const storedItem = localStorage.getItem(key)
    if (storedItem && item) {
      const data = JSON.parse(storedItem)
      return data[item]
    } else if (storedItem) {
      if (typeof storedItem === 'string') return JSON.parse(storedItem)
      else return storedItem
    }
  }
  // Clear a single item or the whole local storage
  export const clearStorage = (key: string) => {
    if (key) {
      localStorage.removeItem(key)
    } else {
      localStorage.clear()
    }
  }
