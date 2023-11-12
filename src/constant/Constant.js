export const EVENT_MONTH = 12;

export const ALERT_MESSAGE = Object.freeze({
  greetings: "안녕하세요! 우테코 식당 {12}월 이벤트 플래너입니다.\n",
  result: "{12}월 {3}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n",
});

export const ASK_MESSAGE = Object.freeze({
  greetings: "안녕하세요! 우테코 식당 {12}월 이벤트 플래너입니다.\n",
  visitDate:
    "{12}월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n",
  orderInfo:
    "주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)",
});

export const RESULT_HEADER = Object.freeze({
  menu: "<주문 메뉴>",
  totalPriceBeforeDiscount: "<할인 전 총주문 금액>",
  benefitHistory: "<혜택 내역>",
  totalBenefitAmount: "<총혜택 금액>",
  finalPrice: "<할인 후 예상 결제 금액>",
  badge: "<{12}월 이벤트 배지>",
});

const PREFIX_ERROR = "[ERROR]";

export const ERROR_MESSAGE = Object.freeze({
  invalidDate: `${PREFIX_ERROR} 유효하지 않은 날짜입니다. 다시 입력해 주세요.`,
  invalidOrder: `${PREFIX_ERROR} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
});