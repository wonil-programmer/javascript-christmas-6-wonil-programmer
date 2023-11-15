import InputView from "../InputView.js";
import Calculator from "../utils/Calculator.js";
import {
  SPECIAL_DATE,
  EVENT,
  GIFT_LIST,
  BADGE,
  BADGE_CUT_OFF,
  DATE,
  MENU_CATEGORY,
} from "../constant/Constant.js";
import Event from "../Event.js";
import OutputView from "../OutputView.js";

class OrderController {
  #menuInfo;
  #orderInfo = new Map();
  #totalSum;
  #totalDiscount;
  #benefitHistory = new Map();
  #totalBenefit;
  #gift = new Map();
  #badge;

  constructor(preparedMenus) {
    this.#menuInfo = [...preparedMenus];
    this.#totalSum = 0;
    this.#totalBenefit = 0;
  }

  async placeOrder(visitDate) {
    const isWeekend = Calculator.calculateIsWeekend(visitDate);
    await this.setOrderInfo();
    this.calculateTotalSum();
    this.#totalSum >= 10_000 && this.calculateDiscount(visitDate, isWeekend);
    this.chooseGift();
    this.calculateTotalBenefit();
    this.rewardBadge(this.#totalBenefit);
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
      if (this.getMenuInfo(name).category === MENU_CATEGORY.main) {
        mainDishCount += qty;
      }
    });

    return mainDishCount;
  }

  countDessert() {
    let dessertCount = 0;
    this.#orderInfo.forEach((qty, name) => {
      if (this.getMenuInfo(name).category === MENU_CATEGORY.dessert) {
        dessertCount += qty;
      }
    });

    return dessertCount;
  }

  getMenuInfo(name) {
    return this.#menuInfo.find((menu) => menu.name === name);
  }

  setBenefitHistory = (eventName, benefit) => {
    if (benefit > 0) {
      this.#benefitHistory.set(eventName, benefit);
    }
  };

  applyDiscount = (eventName, discountFunction, ...args) => {
    const discount = discountFunction(...args);
    this.setBenefitHistory(eventName, discount);
    this.#totalBenefit += discount;
  };

  calculateDiscount(visitDate, isWeekend) {
    if (visitDate <= DATE.xMasDate)
      this.applyDiscount(EVENT.xMasDDay, Event.applyXMasDDay, visitDate);
    if (SPECIAL_DATE.includes(visitDate))
      this.applyDiscount(EVENT.special, Event.applySpecial);
    if (isWeekend) {
      const mainDishQty = this.countMainDish();
      this.applyDiscount(EVENT.weekend, Event.applyWeekend, mainDishQty);
    } else {
      const dessertQty = this.countDessert();
      this.applyDiscount(EVENT.weekday, Event.applyWeekday, dessertQty);
    }
  }

  chooseGift() {
    let giftPrice = 0;
    GIFT_LIST.forEach((gift) => {
      if (gift.conditionPrice <= this.#totalSum) {
        this.#gift.set(gift.name, gift.price);
        giftPrice += gift.price;
      }
    });
    this.setBenefitHistory(EVENT.gift, giftPrice);
  }

  calculateTotalBenefit() {
    for (let benefit of this.#benefitHistory.values()) {
      this.#totalBenefit += benefit;
    }
  }

  rewardBadge(benefit) {
    if (benefit >= BADGE_CUT_OFF.santa) {
      this.#badge = BADGE.santa;
      return;
    }
    if (benefit >= BADGE_CUT_OFF.tree) {
      this.#badge = BADGE.tree;
      return;
    }
    if (benefit >= BADGE_CUT_OFF.star) {
      this.#badge = BADGE.star;
      return;
    }
  }

  printOrderInfo() {
    OutputView.printMenu(this.#orderInfo);
    OutputView.printTotalSum(this.#totalSum);
    OutputView.printGift(this.#gift);
    OutputView.printBenefitHistory(this.#benefitHistory);
    OutputView.printTotalBenefit(this.#totalBenefit);
    OutputView.printPayment(this.#totalSum, this.#totalDiscount);
    OutputView.printBadge(this.#badge);
  }
}

export default OrderController;
