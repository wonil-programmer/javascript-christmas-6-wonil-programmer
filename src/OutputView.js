import { Console } from "@woowacourse/mission-utils";
import {
  ERROR_MESSAGE,
  RESULT_HEADER,
  ALERT_MESSAGE,
  UNIT,
  NOTHING,
} from "./constant/Constant.js";
import Converter from "./utils/Converter.js";

const OutputView = {
  printErrorMessage(error) {
    Console.print(error.message);
  },

  printGreetings() {
    Console.print(ALERT_MESSAGE.greetings);
  },

  printResultHeader(date) {
    Console.print(ALERT_MESSAGE.resultHeader(date));
  },

  printMenu(menuInfo) {
    Console.print(RESULT_HEADER.menu);
    menuInfo.forEach((qty, name) => {
      Console.print(name + " " + UNIT.quantity(qty));
    });
  },
};

export default OutputView;
