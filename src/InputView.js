import { ASK_MESSAGE, SEPARATOR } from "./constant/Constant.js";
import { Console } from "@woowacourse/mission-utils";
import Validator from "./utils/Validator.js";
import OutputView from "./OutputView.js";
import Order from "./model/Order.js";

const InputView = {
  async readDate() {
    while (true) {
      try {
        const date = await Console.readLineAsync(ASK_MESSAGE.visitDate);
        Validator.validateDate(date);

        return Number(date);
      } catch (error) {
        OutputView.printErrorMessage(error);
      }
    }
  },

  async readOrder(menuInfo) {
    while (true) {
      try {
        const orderInput = await Console.readLineAsync(ASK_MESSAGE.menuInfo);
        Validator.validateOrderFormat(orderInput);
        const orderedMenus = orderInput.split(SEPARATOR.comma);
        const order = new Order(orderedMenus, menuInfo);

        return order;
      } catch (error) {
        OutputView.printErrorMessage(error);
      }
    }
  },
};

export default InputView;
