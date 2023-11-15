import InputView from "../InputView.js";
import OutputView from "../OutputView.js";
import {
  EVENT,
  GIFT_LIST,
  BADGE,
  BADGE_CUT_OFF,
  MIN_TOTAL_PRICE,
} from "../constant/Constant.js";
import Event from "../Event.js";
import Calculator from "../utils/Calculator.js";

class OrderController {
  #menuInfo;
  #benefitHistory = new Map();
  #totalDiscount = 0;
  #gift = new Map();
  #badge;

  constructor(preparedMenus) {
    this.#menuInfo = [...preparedMenus];
  }

  async placeOrder(visitDate) {
    const order = await InputView.readOrder(this.#menuInfo);
    const totalPrice = order.calculateTotalPrice();
    if (totalPrice > MIN_TOTAL_PRICE) {
      this.calculateDiscount(visitDate, order);
      this.chooseGift(totalPrice);
    }
    const totalBenefit = this.calculateTotalBenefit();
    this.rewardBadge(totalBenefit);
    OutputView.printResultHeader(visitDate);
    this.printOrderInfo(order, totalPrice, totalBenefit);
  }

  setBenefitHistory(eventName, benefit) {
    if (benefit > 0) {
      this.#benefitHistory.set(eventName, benefit);
    }
  }

  calculateDiscount(visitDate, order) {
    const applyAndRecordDiscount = (event, discount) => {
      this.#totalDiscount += discount;
      this.setBenefitHistory(event, discount);
    };
    applyAndRecordDiscount(EVENT.xMasDDay, Event.applyXMasDDay(visitDate));
    applyAndRecordDiscount(EVENT.weekday, Event.applyWeekday(visitDate, order));
    applyAndRecordDiscount(EVENT.weekend, Event.applyWeekend(visitDate, order));
    applyAndRecordDiscount(EVENT.special, Event.applySpecial(visitDate));
  }

  chooseGift(totalPrice) {
    let giftPrice = 0;
    GIFT_LIST.forEach((gift) => {
      if (gift.conditionPrice <= totalPrice) {
        this.#gift.set(gift.name, gift.price);
        giftPrice += gift.price;
      }
    });
    this.setBenefitHistory(EVENT.gift, giftPrice);
  }

  calculateTotalBenefit() {
    let totalBenefit = 0;
    for (let benefit of this.#benefitHistory.values()) {
      totalBenefit += benefit;
    }
    return totalBenefit;
  }

  rewardBadge(totalBenefit) {
    if (totalBenefit >= BADGE_CUT_OFF.santa) {
      this.#badge = BADGE.santa;
      return;
    }
    if (totalBenefit >= BADGE_CUT_OFF.tree) {
      this.#badge = BADGE.tree;
      return;
    }
    if (totalBenefit >= BADGE_CUT_OFF.star) {
      this.#badge = BADGE.star;
      return;
    }
  }

  printOrderInfo(order, totalPrice, totalBenefit) {
    OutputView.printMenu(order);
    OutputView.printTotalPrice(totalPrice);
    OutputView.printGift(this.#gift);
    OutputView.printBenefitHistory(this.#benefitHistory);
    OutputView.printTotalBenefit(totalBenefit);
    const payment = Calculator.substractTwoNum(totalPrice, this.#totalDiscount);
    OutputView.printPayment(payment);
    OutputView.printBadge(this.#badge);
  }
}

export default OrderController;
