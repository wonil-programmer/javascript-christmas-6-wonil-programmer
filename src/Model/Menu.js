import { MENU_CATEGORY } from "../constant/Constant.js";
class Menu {
  constructor(name, price, category) {
    this.name = name;
    this.price = price;
    this.category = category;
  }
}
export class Appetizer extends Menu {
  constructor(name, price) {
    super(name, price, MENU_CATEGORY.appetizer);
  }
}
export class MainDish extends Menu {
  constructor(name, price) {
    super(name, price, MENU_CATEGORY.main);
  }
}
export class Beverage extends Menu {
  constructor(name, price) {
    super(name, price, MENU_CATEGORY.beverage);
  }
}
export class Dessert extends Menu {
  constructor(name, price) {
    super(name, price, MENU_CATEGORY.dessert);
  }
}
