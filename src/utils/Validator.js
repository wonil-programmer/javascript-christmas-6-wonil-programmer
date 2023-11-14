import {
  ERROR_MESSAGE,
  MENU_CATEGORY,
  MONTH_START_DATE,
  MONTH_END_DATE,
  ORDER_INPUT,
  QUANTITY_LIMIT,
} from "../constant/Constant.js";
import { MENU_INFO } from "../constant/Constant.js";

const Validator = {
  validateDate(date) {
    const dateNum = Number(date);
    if (isNaN(dateNum)) throw new Error(ERROR_MESSAGE.invalidDate);
    if (dateNum < MONTH_START_DATE || dateNum > MONTH_END_DATE)
      throw new Error(ERROR_MESSAGE.invalidDate);
  },

  validateOrderForm(orderInput) {
    const pattern = ORDER_INPUT;
    if (!pattern.test(orderInput)) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  },

  validateDuplication(array) {
    const set = new Set(array);
    if (set.size !== array.length) throw new Error(ERROR_MESSAGE.invalidOrder);
  },

  isValidMenuName(menuName) {
    return MENU_INFO.some((menu) => menu.name === menuName);
  },

  isPositiveInt(number) {
    return Number.isInteger(number) && number > 0;
  },

  validateOrderedMenu(orderedMenu) {
    let totalQty = 0;
    orderedMenu.forEach((quantity, name) => {
      totalQty += quantity;
      if (!this.isValidMenuName(name) || !this.isPositiveInt(quantity))
        throw new Error(ERROR_MESSAGE.invalidOrder);
    });
    if (totalQty > QUANTITY_LIMIT) {
      throw new Error(ERROR_MESSAGE.invalidOrder);
    }
  },
};

export default Validator;
