const DisountEvent = {
  applyXMasDDay(date) {
    return 1_000 + (Number(date) - 1) * 100;
  },
  applySpecial() {
    return 1_000;
  },
};

export default DisountEvent;
