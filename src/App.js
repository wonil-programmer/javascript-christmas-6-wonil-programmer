import OrderController from "../src/controller/OrderController.js";

class App {
  #orderBehavior;

  constructor() {
    this.#orderBehavior = new OrderController();
  }
  async run() {
    await this.#orderBehavior.placeOrder();
  }
}

export default App;
