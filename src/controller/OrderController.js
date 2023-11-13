import InputView from "../InputView.js";
import Calculator from "../utils/Calculator.js";
import { Appetizer, MainDish, Drink, Dessert } from "../Model/Menu.js";
import { MENU_INFO, SPECIAL_DATE, EVENT_LIST } from "../constant/Constant.js";
import DisountEvent from "../DisountEvent.js";

class OrderController {
  #visitDate;
  #isWeekend;
  #servedMenus;
  #orderInfo;
  #totalSum;
  #benefitHistory;

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
    this.#benefitHistory = new Map();
  }

  async placeOrder() {
    await this.setVisitDate();
    this.setIsWeekend(this.#visitDate);
    await this.setOrderInfo();
    this.calculateTotalSum();
    if (this.#totalSum >= 10_000) {
      const totalDiscount = this.calculateDiscount();
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

  countDessert() {
    let dessertCount = 0;
    this.#orderInfo.forEach((qty, name) => {
      if (this.getMenuInfo(name).category === "디저트") {
        dessertCount += qty;
      }
    });

    return dessertCount;
  }

  getMenuInfo(name) {
    return this.#servedMenus.find((menu) => menu.name === name);
  }

  calculateDiscount() {
    let discountSum = 0;
    if (this.#visitDate <= 25) {
      const xMasDDayDiscount = DisountEvent.applyXMasDDay(this.#visitDate);
      this.#benefitHistory.set(EVENT_LIST.xMasDDay, xMasDDayDiscount);
      discountSum += xMasDDayDiscount;
    }
    if (SPECIAL_DATE.includes(this.#visitDate)) {
      const specialDiscount = DisountEvent.applySpecial();
      this.#benefitHistory.set(EVENT_LIST.special, specialDiscount);
      discountSum += specialDiscount;
    }
    if (this.#isWeekend) {
      const mainDishQty = this.countMainDish();
      const weekendDiscount = DisountEvent.applyWeekend(mainDishQty);
      this.#benefitHistory.set(EVENT_LIST.weekend, weekendDiscount);
      discountSum += weekendDiscount;
    }
    if (!this.#isWeekend) {
      const dessertQty = this.countDessert();
      const weekdayDiscount = DisountEvent.applyWeekday(dessertQty);
      this.#benefitHistory.set(EVENT_LIST.weekday, weekdayDiscount);
      discountSum += weekdayDiscount;
    }

    return discountSum;
  }
}

export default OrderController;
