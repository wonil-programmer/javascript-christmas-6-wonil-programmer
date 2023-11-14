import InputView from "../InputView.js";
import Calculator from "../utils/Calculator.js";
import {
  SPECIAL_DATE,
  EVENT_LIST,
  GIFT_LIST,
  BADGE,
  BADGE_CUT_OFF,
} from "../constant/Constant.js";
import DisountEvent from "../DisountEvent.js";
import OutputView from "../OutputView.js";

class OrderController {
  #visitDate;
  #isWeekend;
  #preparedMenus;
  #orderInfo;
  #totalSum;
  #totalDiscount;
  #benefitHistory = new Map();
  #totalBenefit;
  #gift = new Map();
  #badge;

  constructor(menuInfo) {
    this.#preparedMenus = [...menuInfo];
    this.#totalSum = 0;
    this.#totalBenefit = 0;
  }

  async placeOrder() {
    await this.setVisitDate();
    this.setIsWeekend(this.#visitDate);
    await this.setOrderInfo();
    this.calculateTotalSum();
    if (this.#totalSum >= 10_000) {
      this.#totalDiscount = this.calculateDiscount();
      this.chooseGift();
      this.calculateTotalBenefit();
      this.awardBadge(this.#totalBenefit);
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
    return this.#preparedMenus.find((menu) => menu.name === name);
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
      if (weekendDiscount > 0) {
        this.#benefitHistory.set(EVENT_LIST.weekend, weekendDiscount);
      }
      discountSum += weekendDiscount;
    }
    if (!this.#isWeekend) {
      const dessertQty = this.countDessert();
      const weekdayDiscount = DisountEvent.applyWeekday(dessertQty);
      if (weekdayDiscount > 0) {
        this.#benefitHistory.set(EVENT_LIST.weekday, weekdayDiscount);
      }
      discountSum += weekdayDiscount;
    }

    return discountSum;
  }

  chooseGift() {
    let giftPrice = 0;
    GIFT_LIST.forEach((gift) => {
      if (gift.conditionPrice <= this.#totalSum) {
        this.#gift.set(gift.name, gift.price);
        giftPrice += gift.price;
      }
    });

    this.#benefitHistory.set(EVENT_LIST.gift, giftPrice);
  }

  calculateTotalBenefit() {
    for (let benefit of this.#benefitHistory.values()) {
      this.#totalBenefit += benefit;
    }
  }

  awardBadge(benefit) {
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

  printResult() {
    OutputView.printResultHeader(this.#visitDate);
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
