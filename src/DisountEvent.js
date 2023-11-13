const DisountEvent = {
  applyXMasDDay(date) {
    return 1_000 + (Number(date) - 1) * 100;
  },
};

export default DisountEvent;
