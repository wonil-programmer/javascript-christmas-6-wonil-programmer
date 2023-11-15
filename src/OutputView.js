import { Console } from "@woowacourse/mission-utils";
import {
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

  printMenu(order) {
    Console.print(RESULT_HEADER.menu);
    const orderItems = order.getItems();
    orderItems.forEach((item) => {
      Console.print(item.name + " " + UNIT.quantity(item.quantity));
    });
  },

  printTotalPrice(totalPrice) {
    Console.print(RESULT_HEADER.totalPrice);
    Console.print(UNIT.price(Converter.applyNumberFormat(totalPrice)));
  },

  printGift(gift) {
    Console.print(RESULT_HEADER.gift);
    if (gift.size === 0) {
      Console.print(NOTHING);
    }
    for (let name of gift.keys()) {
      Console.print(name);
    }
  },

  printBenefitHistory(benefitHistory) {
    Console.print(RESULT_HEADER.benefitHistory);
    if (benefitHistory.size === 0) {
      Console.print(NOTHING);
    }
    benefitHistory.forEach((price, title) => {
      Console.print(title + UNIT.price(Converter.changeToBenefit(price)));
    });
  },

  printTotalBenefit(totalBenefit) {
    Console.print(RESULT_HEADER.totalBenefit);
    Console.print(UNIT.price(Converter.changeToBenefit(totalBenefit)));
  },

  printPayment(payment) {
    Console.print(RESULT_HEADER.payment);
    Console.print(UNIT.price(Converter.applyNumberFormat(payment)));
  },

  printBadge(badge) {
    Console.print(RESULT_HEADER.badge);
    badge ? Console.print(badge) : Console.print(NOTHING);
  },
};

export default OutputView;
