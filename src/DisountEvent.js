const DisountEvent = {
  applyXMasDDay(date) {
    return 1_000 + (Number(date) - 1) * 100;
  },
  applySpecial() {
    return 1_000;
  },
  applyWeekend(mainDishCount) {
    return mainDishCount * 2_023;
  },
  applyWeekDay(dessertCount) {
    return dessertCount * 2_023;
  },
};

export default DisountEvent;
