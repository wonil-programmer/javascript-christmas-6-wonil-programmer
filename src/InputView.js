import { ASK_MESSAGE, SEPARATOR } from "./constant/Constant.js";
import { Console } from "@woowacourse/mission-utils";
import Validator from "./utils/Validator.js";
import OutputView from "./OutputView.js";
import Order from "./model/Order.js";

const InputView = {
  async readInput(promptMessage, validationFunction, processFunction) {
    while (true) {
      try {
        const userInput = await Console.readLineAsync(promptMessage);
        validationFunction(userInput);
        return processFunction(userInput);
      } catch (error) {
        OutputView.printErrorMessage(error);
      }
    }
  },

  async readDate() {
    const promptMessage = ASK_MESSAGE.visitDate;
    const validationFunction = Validator.validateDate;
    const processFunction = (date) => Number(date);

    return this.readInput(promptMessage, validationFunction, processFunction);
  },

  async readOrder(menuInfo) {
    const promptMessage = ASK_MESSAGE.menuInfo;
    const validationFunction = Validator.validateOrderFormat;
    const processFunction = (orderInput) => {
      const orderedMenus = orderInput.split(SEPARATOR.comma);
      return new Order(orderedMenus, menuInfo);
    };

    return this.readInput(promptMessage, validationFunction, processFunction);
  },
};

export default InputView;
