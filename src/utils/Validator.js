import { ERROR_MESSAGE } from "../constant/Constant.js";
import { MENU_INFO } from "../constant/Constant.js";

const Validator = {
  validateDate(date) {
    const dateNum = Number(date);
    if (isNaN(dateNum)) {
      throw new Error(`${ERROR_MESSAGE.invalidDate}`);
    }
    if (dateNum < 1 || dateNum > 31) {
      throw new Error(`${ERROR_MESSAGE.invalidDate}`);
    }
  },

  isValidMenuName(menuName) {
    return MENU_INFO.some((menu) => menu.name === menuName);
  },

  isPositiveInt(number) {
    return Number.isInteger(number) && number > 0;
  },

  validateOrderedMenu(orderedMenu) {
    orderedMenu.forEach((quantity, name) => {
      if (!this.isValidMenuName(name) || !this.isPositiveInt(quantity)) {
        throw new Error(`${ERROR_MESSAGE.invalidOrder}`);
      }
    });
  },
};

export default Validator;
