import Validator from "../utils/Validator.js";
import { SEPARATOR, MENU_CATEGORY } from "../constant/Constant.js";

class Order {
  #items = [];

  constructor(orderedMenus, menuInfo) {
    orderedMenus.forEach((orderedMenu) => {
      const [nameStr, quantityStr] = orderedMenu.split(SEPARATOR.dash);
      const quantity = Number(quantityStr);
      this.#validateNameExistence(nameStr);
      this.#validateQuantity(quantity);
      const { name, price, category } = this.findInMenuInfo(menuInfo, nameStr);
      const item = { name, price, category, quantity };
      this.#validateNameDuplication(this.#items, item);
      this.#items.push(item);
    });
    this.#validateTotalQty(this.#items);
    this.#validateOnlyBeverage(this.#items);
  }

  #validateNameExistence(name) {
    Validator.validateNameExistence(name);
  }

  #validateQuantity(quantity) {
    Validator.validateQuantity(quantity);
  }

  #validateNameDuplication(existingItems, item) {
    Validator.validateNameDuplication(existingItems, item);
  }

  #validateTotalQty(items) {
    Validator.validateTotalQty(items);
  }

  #validateOnlyBeverage(items) {
    const categories = items.map((item) => item.category);
    Validator.validateOnlyBeverage(categories);
  }

  getItems() {
    return this.#items;
  }

  findInMenuInfo(menuInfo, name) {
    return menuInfo.find((menu) => menu.name === name);
  }

  calculateTotalPrice() {
    return this.#items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  countItemsByCategory(category) {
    return this.#items
      .filter((item) => item.category === category)
      .reduce((count, item) => count + item.quantity, 0);
  }

  countMain() {
    return this.countItemsByCategory(MENU_CATEGORY.main);
  }

  countDessert() {
    return this.countItemsByCategory(MENU_CATEGORY.dessert);
  }
}

export default Order;
