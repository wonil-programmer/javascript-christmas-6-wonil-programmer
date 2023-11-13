import InputView from "../InputView.js";
import Calculator from "../utils/Calculator.js";
import { Appetizer, MainDish, Drink, Dessert } from "../Model/Menu.js";
import { MENU_INFO } from "../constant/Constant.js";

class OrderController {
  #visitDate;
  #isWeekend;
  #servedMenus;
  #orderInfo;
  #totalSum;

  constructor() {
    const appetizers = MENU_INFO.filter(
      (menu) => menu.category === "애피타이저"
    ).map((menu) => new Appetizer(menu.name, menu.price));
    const mainDishes = MENU_INFO.filter((menu) => menu.category === "메인").map(
      (menu) => new MainDish(menu.name, menu.price)
    );
    const desserts = MENU_INFO.filter((menu) => menu.category === "디저트").map(
      (menu) => new Dessert(menu.name, menu.price)
    );
    const drinks = MENU_INFO.filter((menu) => menu.category === "음료").map(
      (menu) => new Drink(menu.name, menu.price)
    );
    this.#servedMenus = [...appetizers, ...mainDishes, ...desserts, ...drinks];
  }

  async placeOrder() {
    await this.setVisitDate();
    this.setIsWeekend(this.#visitDate);
    await this.setOrderInfo();
    this.calculateTotalSum();
  }

  async setVisitDate() {
    this.#visitDate = await InputView.readDate();
  }

  setIsWeekend(date) {
    this.#isWeekend = Calculator.calculateIsWeekend(date);
  }

  async setOrderInfo() {
    this.#orderInfo = await InputView.readMenu();
  }

  calculateTotalSum() {
    this.#orderInfo.forEach((qty, name) => {
      this.#totalSum += this.getMenuInfo(name).price * qty;
    });
  }

  getMenuInfo(name) {
    return this.#servedMenus.find((menu) => menu.name === name);
  }
}

export default OrderController;
