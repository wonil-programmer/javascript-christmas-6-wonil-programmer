export const EVENT_MONTH = 12;

export const MONTH_START_DATE = 1;
export const MONTH_END_DATE = 31;

export const MENU_INFO = [
  { name: "양송이수프", price: 6_000, category: "애피타이저" },
  { name: "타파스", price: 5_500, category: "애피타이저" },
  { name: "시저샐러드", price: 8_000, category: "애피타이저" },
  { name: "티본스테이크", price: 55_000, category: "메인" },
  { name: "바비큐립", price: 54_000, category: "메인" },
  { name: "해산물파스타", price: 35_000, category: "메인" },
  { name: "크리스마스파스타", price: 25_000, category: "메인" },
  { name: "초코케이크", price: 15_000, category: "디저트" },
  { name: "아이스크림", price: 5_000, category: "디저트" },
  { name: "제로콜라", price: 3_000, category: "음료" },
  { name: "레드와인", price: 60_000, category: "음료" },
  { name: "샴페인", price: 25_000, category: "음료" },
];

export const MENU_CATEGORY = Object.freeze({
  beverage: "음료",
  main: "메인",
  appetizer: "애피타이저",
  dessert: "디저트",
});

export const BADGE_CUT_OFF = Object.freeze({
  santa: 20_000,
  tree: 10_000,
  star: 5_000,
});

export const ORDER_INPUT = /^([가-힣a-zA-Z]+-\d+)+(,[가-힣a-zA-Z]+-\d+)*$/;

export const SPECIAL_DATE = [3, 10, 17, 24, 25, 31];

export const QUANTITY_LIMIT = 20;

export const GIFT_LIST = [
  { name: "샴페인 1개", price: 25_000, conditionPrice: 120_000 },
];

export const BADGE = Object.freeze({
  star: "별",
  tree: "트리",
  santa: "산타",
});

export const EVENT = Object.freeze({
  xMasDDay: "크리스마스 디데이 할인: ",
  weekday: "평일 할인: ",
  weekend: "주말 할인: ",
  special: "특별 할인: ",
  gift: "증정 이벤트: ",
});

export const xMasDay = 25;

export const EVENT_DISCOUNT_AMOUNT = Object.freeze({
  xMasDDay: (date) => 1_000 + (Number(date) - 1) * 100,
  weekday: 2_023,
  weekend: 2_023,
  special: 1_000,
});

export const ALERT_MESSAGE = Object.freeze({
  greetings: "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.",
  resultHeader: (date) =>
    `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`,
});

export const ASK_MESSAGE = Object.freeze({
  visitDate:
    "12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n",
  menuInfo:
    "주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n",
});

export const RESULT_HEADER = Object.freeze({
  menu: "<주문 메뉴>",
  totalSum: "\n<할인 전 총주문 금액>",
  gift: "\n<증정 메뉴>",
  benefitHistory: "\n<혜택 내역>",
  totalBenefit: "\n<총혜택 금액>",
  payment: "\n<할인 후 예상 결제 금액>",
  badge: "\n<12월 이벤트 배지>",
});

export const UNIT = Object.freeze({
  price: (price) => `${price}원`,
  quantity: (qty) => `${qty}개`,
});

export const NOTHING = "없음";

const PREFIX_ERROR = "[ERROR]";

export const ERROR_MESSAGE = Object.freeze({
  invalidCategory: `${PREFIX_ERROR} 유효하지 않은 종류입니다.`,
  invalidDate: `${PREFIX_ERROR} 유효하지 않은 날짜입니다. 다시 입력해 주세요.`,
  invalidOrder: `${PREFIX_ERROR} 유효하지 않은 주문입니다. 다시 입력해 주세요.`,
});

export const SEPARATOR = Object.freeze({
  comma: ",",
  dash: "-",
});
