import InputView from "../InputView.js";
import Calculator from "../utils/Calculator.js";

class OrderController {
  #visitDate;
  #isWeekend;
  #orderInfo;

  constructor() {}

  async placeOrder() {
    await this.setVisitDate();
    this.setIsWeekend(this.#visitDate);
    this.setOrderInfo();
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
}

export default OrderController;
