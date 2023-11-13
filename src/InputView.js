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
        const menuInput = await Console.readLineAsync(ASK_MESSAGE.menuInfo);
        const menuArr = menuInput.split(SEPARATOR.comma);
        const orderedMenu = new Map();
        menuArr.forEach((menu) => {
          const [menuName, menuQty] = menu.split(SEPARATOR.dash);
          orderedMenu.set(menuName, Number(menuQty));
        });

        return orderedMenu;
      } catch (error) {
        OutputView.printErrorMessage(error);
      }
    }
  },
};

export default InputView;
