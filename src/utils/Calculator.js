const Calculator = {
  calculateIsWeekend(date) {
    const dayNumber = date % 7;
    return dayNumber == 1 || dayNumber == 2 ? true : false;
  },
};

export default Calculator;
