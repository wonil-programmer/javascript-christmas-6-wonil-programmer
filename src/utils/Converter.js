const Converter = {
  applyNumberFormat(number) {
    return new Intl.NumberFormat("ko-KR").format(number);
  },

  applyNegative(number) {
    return "-" + number;
  },

  changeToBenefit(number) {
    const formattedNumber = this.applyNumberFormat(number);
    return number > 0 ? this.applyNegative(formattedNumber) : number;
  },
};

export default Converter;
