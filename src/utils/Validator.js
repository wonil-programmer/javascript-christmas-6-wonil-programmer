import { ERROR_MESSAGE } from "../constant/Constant.js";

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
};

export default Validator;
