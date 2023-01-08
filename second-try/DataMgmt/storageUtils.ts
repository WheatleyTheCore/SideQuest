import AsyncStorage from "@react-native-async-storage/async-storage";


/*---------------------------------------------------low level access functions---------------------------------------*/

export async function saveData (storage_key: string, data: object): Promise<void> {
  const stringifiedData = JSON.stringify(data)
    try {
        await AsyncStorage.setItem(storage_key, stringifiedData);
      } catch (e) {
        console.log(e);
      }
}

//load data into state, takes setState as a parameter
export async function loadData (setData: (data: string) => void, storage_key: string): Promise<void> {
    try {
        const val = await AsyncStorage.getItem(storage_key);
        if (val !== null) {
          const data = JSON.parse(val);
          setData(data);
        }
      } catch (e) {
        console.log(e);
      }
}

/*---------------------------------------------------collection functions---------------------------------------*/

//Collection names are no longer the names. 
export async function loadAllCollectionNames (): Promise<string[]> {
  let collectionNames = []
    try {
        const keys = await AsyncStorage.getAllKeys();
        keys.forEach(async (key) => {
          const val = await AsyncStorage.getItem(key);
          if (val !== null) {
            const data = JSON.parse(val);
            collectionNames.push(data.name);
          }
        })
        return keys;
      } catch (e) {
        console.log(e);
        return []
      }
}

//This is used for both creating new collections and updating old ones.
export async function saveCollection (collection: object, storage_key: string): Promise<void> { 
  const stringifiedData = JSON.stringify(collection)
  try {
    await AsyncStorage.setItem(storage_key, stringifiedData);
  } catch (e) {
    console.log(e);
  }
}

export async function deleteCollection (collection_key: string): Promise<void> {
    try {
        await AsyncStorage.removeItem(collection_key)
    } catch (e) {
        console.log(e)
    }
}


/*---------------------------------------------------settings functions---------------------------------------*/

//TODO THE KEYS ARE NO LONGER THE NAME OF THE COLLECTION, THESE WILL PROBABLY NO LONGER WORK.

export async function loadSettings (setSettings: (settings: string) => void):Promise<void> {
  try {
    const val = await AsyncStorage.getItem('Settings');
    if (val !== null) {
      const data = JSON.parse(val);
      setSettings(data);
    }
  } catch (e) {
    console.log(e);
  }
}

export async function saveSettings (settings: object): Promise<void> {
  const stringifiedData = JSON.stringify(settings)
  try {
    await AsyncStorage.setItem("Settings", stringifiedData);
  } catch (e) {
    console.log(e);
  }
}