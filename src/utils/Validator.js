import {
  ERROR_MESSAGE,
  MENU_CATEGORY,
  DATE,
  REG_EXP,
  QUANTITY_LIMIT,
} from "../constant/Constant.js";
import { MENU_INFO } from "../constant/Constant.js";

const Validator = {
  validateDate(date) {
    if (REG_EXP.space.test(date)) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
    const dateNum = Number(date);
    console.log(dateNum);
    if (
      !(
        !isNaN(dateNum) &&
        Number.isInteger(dateNum) &&
        dateNum >= DATE.startDate &&
        dateNum <= DATE.endDate
      )
    ) {
      throw new Error(ERROR_MESSAGE.invalidDate);
    }
  },

  validateOrderFormat(orderInput) {
    if (!REG_EXP.orderInput.test(orderInput)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  },

  validateNameExistence(menuName) {
    if (!MENU_INFO.some((menu) => menu.name === menuName)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  },

  validateQuantity(quantity) {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  },

  validateNameDuplication(existingItems, item) {
    existingItems.forEach((existingItem) => {
      if (existingItem.name === item.name)
        throw new Error(ERROR_MESSAGE.invalidOrder);
    });
  },

  validateTotalQty(items) {
    let totalQuantity = 0;
    items.forEach((item) => {
      totalQuantity += item.quantity;
    });

    if (totalQuantity > QUANTITY_LIMIT) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  },

  validateOnlyBeverage(categories) {
    if (categories.every((category) => category === MENU_CATEGORY.beverage)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  },
};

export default Validator;
