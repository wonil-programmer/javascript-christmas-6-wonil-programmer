import { ASK_MESSAGE } from "./constant/Constant.js";
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
};

export default InputView;
