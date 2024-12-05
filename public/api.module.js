window.BASKET = window.BASKET || {};

BASKET.API = (function () {
  let fruits = ["Apple", "Banana", "Blueberry", "Cherry", "Kiwi"];

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const sortStringArrays = (strings) => strings.sort((a, b) => a.localeCompare(b));

  return {
    async getAll() {
      await delay(2000);
      return sortStringArrays([...fruits]);
    },
    
    async add(fruit) {
      await delay(2000);
      if (fruits.some((existingFruit) => existingFruit.toLowerCase() === fruit.toLowerCase())) {
        throw new Error(`"${fruit}" already in use`);
      }
      fruits.push(fruit);
      return sortStringArrays([...fruits]);
    },

    async update(oldName, newName) {
      await delay(2000);
      const index = fruits.findIndex((fruit) => fruit.toLowerCase() === oldName.toLowerCase());
      if (index === -1) {
        throw new Error(`"${oldName}" not found`);
      }
      if (fruits.some((fruit) => fruit.toLowerCase() === newName.toLowerCase() && fruit !== oldName)) {
        throw new Error(`"${newName}" already in use`);
      }
      fruits[index] = newName;
      return sortStringArrays([...fruits]);
    },

    async delete(name) {
      await delay(2000);
      const index = fruits.findIndex((fruit) => fruit.toLowerCase() === name.toLowerCase());
      if (index === -1) {
        throw new Error(`"${name}" not found`);
      }
      fruits.splice(index, 1);
      return sortStringArrays([...fruits]);
    },
  };
})();
