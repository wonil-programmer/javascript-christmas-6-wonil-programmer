const Converter = {
  applyNumberFormat(number) {
    return new Intl.NumberFormat("ko-KR").format(number);
  },

  applyNegative(number) {
    return "-" + number;
  },
};

export default Converter;
