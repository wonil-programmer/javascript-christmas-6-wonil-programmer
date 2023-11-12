import InputView from "../InputView.js";
import Calculator from "../utils/Calculator.js";

class OrderController {
  #visitDate;
  #isWeekend;

  constructor() {}

  async placeOrder() {
    await this.setVisitDate();
    this.setVisitDayOfWeek(this.#visitDate);
  }

  async setVisitDate() {
    this.#visitDate = await InputView.readDate();
  }

  setIsWeekend(date) {
    this.#isWeekend = Calculator.calculateIsWeekend(date);
  }
}

export default OrderController;
