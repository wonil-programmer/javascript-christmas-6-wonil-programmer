import OrderController from "../src/controller/OrderController.js";
import OutputView from "./OutputView.js";

class App {
  #orderBehavior;

  constructor() {
    OutputView.printGreetings();
    this.#orderBehavior = new OrderController();
  }
  async run() {
    await this.#orderBehavior.placeOrder();
  }
}

export default App;
