import { EVENT_DISCOUNT_AMOUNT } from "./constant/Constant.js";

const Event = {
  applyXMasDDay(date) {
    return EVENT_DISCOUNT_AMOUNT.xMasDDay(date);
  },

  applySpecial() {
    return EVENT_DISCOUNT_AMOUNT.special;
  },

  applyWeekend(mainDishCount) {
    return mainDishCount * EVENT_DISCOUNT_AMOUNT.weekend;
  },

  applyWeekday(dessertCount) {
    return dessertCount * EVENT_DISCOUNT_AMOUNT.weekday;
  },
};

export default Event;
