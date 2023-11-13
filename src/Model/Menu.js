class Menu {
  constructor(name, price, category) {
    this.name = name;
    this.price = price;
    this.category = category;
  }
}

export class Appetizer extends Menu {
  constructor(name, price) {
    super(name, price, "에피타이저");
  }
}

export class MainDish extends Menu {
  constructor(name, price) {
    super(name, price, "메인");
  }
}

export class Drink extends Menu {
  constructor(name, price) {
    super(name, price, "음료");
  }
}

export class Dessert extends Menu {
  constructor(name, price) {
    super(name, price, "디저트");
  }
}
