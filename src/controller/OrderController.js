import InputView from "../InputView.js";
import Calculator from "../utils/Calculator.js";
import { Appetizer, MainDish, Drink, Dessert } from "../Model/Menu.js";
import { MENU_INFO, SPECIAL_DATE } from "../constant/Constant.js";
import DisountEvent from "../DisountEvent.js";

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
    this.#totalSum = 0;
  }

  async placeOrder() {
    await this.setVisitDate();
    this.setIsWeekend(this.#visitDate);
    await this.setOrderInfo();
    this.calculateTotalSum();
    if (this.#totalSum >= 10_000) {
      const totalDiscount = this.calculateDiscount();
      console.log(totalDiscount);
    }
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

  countMainDish() {
    let mainDishCount = 0;
    this.#orderInfo.forEach((qty, name) => {
      if (this.getMenuInfo(name).category === "메인") {
        mainDishCount += qty;
      }
    });

    return mainDishCount;
  }

  getMenuInfo(name) {
    return this.#servedMenus.find((menu) => menu.name === name);
  }

  calculateDiscount() {
    let discountSum = 0;
    if (this.#visitDate <= 25) {
      discountSum += DisountEvent.applyXMasDDay(this.#visitDate);
    }
    if (SPECIAL_DATE.includes(this.#visitDate)) {
      discountSum += DisountEvent.applySpecial();
    }
    if (this.#isWeekend) {
      const mainDishQty = this.countMainDish();
      discountSum += DisountEvent.applyWeekend(mainDishQty);
    }
    return discountSum;
  }
}

export default OrderController;
