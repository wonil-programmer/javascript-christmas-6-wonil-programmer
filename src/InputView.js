import { ASK_MESSAGE } from "./constant/Constant.js";
import { Console } from "@woowacourse/mission-utils";
import OutputView from "./OutputView.js";

const InputView = {
  async readDate() {
    while (true) {
      try {
        const visitDate = await Console.readLineAsync(ASK_MESSAGE.visitDate);

        return Number(visitDate);
      } catch (error) {
        OutputView.printErrorMessage(error);
      }
    }
  },
};

export default InputView;
