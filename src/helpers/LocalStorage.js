const saveToStorage = (name, data, json = false) => {
  if (json) {
    data = JSON.stringify(data);
  }
  localStorage.setItem(name, data);
};

const getFromStorage = (name, parse = false) => {
  let data = localStorage.getItem(name);
  if (data && parse) {
    data = JSON.parse(data);
  }

  return data;
};

const deleteFromStorage = name => {
  localStorage.removeItem(name);
};

export { saveToStorage, getFromStorage, deleteFromStorage };
