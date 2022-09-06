const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
  }
  
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      return value;
    } catch(e) {
      // error reading value
    }
  }

  const getJsonData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }


export { storeData, getData, getJsonData }