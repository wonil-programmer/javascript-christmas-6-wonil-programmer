import { ASK_MESSAGE, SEPARATOR } from "./constant/Constant.js";
import { Console } from "@woowacourse/mission-utils";
import Validator from "./utils/Validator.js";
import OutputView from "./OutputView.js";

const InputView = {
  async readDate() {
    while (true) {
      try {
        const visitDate = await Console.readLineAsync(ASK_MESSAGE.visitDate);
        Validator.validateDate(visitDate);

        return Number(visitDate);
      } catch (error) {
        OutputView.printErrorMessage(error);
      }
    }
  },

  async readMenu() {
    while (true) {
      try {
        const orderInput = await Console.readLineAsync(ASK_MESSAGE.menuInfo);
        Validator.validateOrderForm(orderInput);
        const menuArr = orderInput.split(SEPARATOR.comma);
        const orderedMenu = new Map();
        const storedName = [];
        menuArr.forEach((menu) => {
          const [menuName, menuQty] = menu.split(SEPARATOR.dash);
          storedName.push(menuName);
          Validator.validateDuplication(storedName);
          orderedMenu.set(menuName, Number(menuQty));
        });
        Validator.validateOrderedMenu(orderedMenu);

        return orderedMenu;
      } catch (error) {
        OutputView.printErrorMessage(error);
      }
    }
  },
};

export default InputView;
