import { EVENT_DISCOUNT_AMOUNT, DATE } from "./constant/Constant.js";
import Calculator from "./utils/Calculator.js";

const Event = {
  applyXMasDDay(visitDate) {
    return visitDate <= DATE.xMasDate
      ? EVENT_DISCOUNT_AMOUNT.xMasDDay(visitDate)
      : 0;
  },

  applySpecial(visitDate) {
    return DATE.specialDate.includes(visitDate)
      ? EVENT_DISCOUNT_AMOUNT.special
      : 0;
  },

  applyWeekend(visitDate, order) {
    const mainDishCount = order.countMain();
    const isWeekend = Calculator.calculateIsWeekend(visitDate);
    return isWeekend ? mainDishCount * EVENT_DISCOUNT_AMOUNT.weekend : 0;
  },

  applyWeekday(visitDate, order) {
    const dessertCount = order.countDessert();
    const isWeekend = Calculator.calculateIsWeekend(visitDate);
    return !isWeekend ? dessertCount * EVENT_DISCOUNT_AMOUNT.weekday : 0;
  },
};

export default Event;
