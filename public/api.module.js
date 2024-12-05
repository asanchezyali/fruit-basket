window.BASKET = window.BASKET || {};

BASKET.API = (function () {
  let fruits = ["Apple", "Banana", "Blueberry", "Cherry", "Kiwi", "Mango", "Orange", "Pear", "Pineapple", "Strawberry"];

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const sortStringArrays = (strings) => strings.sort((a, b) => a.localeCompare(b));

  return {
    async getAll() {
      await delay(2000);
      return sortStringArrays([...fruits]);
    },

    async add(fruit) {
      await delay(2000);
      fruits.push(fruit);
      return sortStringArrays([...fruits]);
    },

    async update(oldFruitName, newFruitName) {
      await delay(2000);
      const index = fruits.findIndex((fruit) => fruit.toLowerCase() === oldFruitName.toLowerCase());
      if (index === -1) {
        throw new Error(`"${oldFruitName}" not found`);
      }
      if (fruits.some((fruit) => fruit.toLowerCase() === newFruitName.toLowerCase() && fruit !== oldFruitName)) {
        throw new Error(`"${newFruitName}" already in use`);
      }
      fruits[index] = newFruitName;
      return sortStringArrays([...fruits]);
    },

    async delete(fruitName) {
      await delay(2000);
      const index = fruits.findIndex((fruit) => fruit.toLowerCase() === fruitName.toLowerCase());
      if (index === -1) {
        throw new Error(`"${fruitName}" not found`);
      }
      fruits.splice(index, 1);
      return sortStringArrays([...fruits]);
    },
  };
})();
