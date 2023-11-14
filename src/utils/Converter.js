const Converter = {
  applyNumberFormat(number) {
    return new Intl.NumberFormat("ko-KR").format(number);
  },
};

export default Converter;
