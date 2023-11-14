import OrderController from "../src/controller/OrderController.js";
import OutputView from "./OutputView.js";
import {
  MENU_INFO,
  MENU_CATEGORY,
  ERROR_MESSAGE,
} from "./constant/Constant.js";
import { Appetizer, MainDish, Dessert, Beverage } from "./Model/Menu.js";

class App {
  #orderController;

  constructor() {
    let menuInfo = [];
    for (let key in MENU_CATEGORY) {
      const preparedItems = this.prepareMenus(MENU_CATEGORY[key]);
      menuInfo = [...menuInfo, ...preparedItems];
    }
    this.#orderController = new OrderController(menuInfo);
  }

  async run() {
    OutputView.printGreetings();
    await this.#orderController.placeOrder();
  }

  prepareMenus(category) {
    return MENU_INFO.filter((menu) => menu.category === category).map((menu) =>
      this.createMenu(menu)
    );
  }

  createMenu(menu) {
    switch (menu.category) {
      case MENU_CATEGORY.appetizer:
        return new Appetizer(menu.name, menu.price);
      case MENU_CATEGORY.main:
        return new MainDish(menu.name, menu.price);
      case MENU_CATEGORY.dessert:
        return new Dessert(menu.name, menu.price);
      case MENU_CATEGORY.beverage:
        return new Beverage(menu.name, menu.price);
      default:
        break;
    }
  }
}

export default App;
