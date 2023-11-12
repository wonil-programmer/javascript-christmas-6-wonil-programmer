import InputView from "../InputView.js";
import ExceptionHandler from "../utils/ExceptionHandler.js";
import Calculator from "../utils/Calculator.js";

class OrderController {
  #visitDate;

  constructor() {}

  async placeOrder() {
    await this.setVisitDate();
  }

  async setVisitDate() {
    this.#visitDate = await InputView.readDate();
  }
}

export default OrderController;
