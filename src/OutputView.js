import { Console } from "@woowacourse/mission-utils";
import { ERROR_MESSAGE, RESULT_HEADER } from "./constant/Constant.js";

const OutputView = {
  printMenu() {
    Console.print(RESULT_HEADER.menu);
  },
  printErrorMessage(error) {
    Console.print(error.message);
  },
};

export default OutputView;
