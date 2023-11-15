import Order from "../src/model/Order";
import App from "../src/App";
import {
  getLogSpy,
  mockQuestions,
  getOutput,
  expectLogContains,
} from "../__testUtils__/testUtils";
import { PREFIX_ERROR } from "../src/constant/Constant";

describe("로또 클래스 테스트", () => {
  const menuInfo = [
    { name: "제로콜라", price: 3000, category: "음료" },
    { name: "레드와인", price: 60000, category: "음료" },
    { name: "샴페인", price: 25000, category: "음료" },
    { name: "티본스테이크", price: 55000, category: "메인" },
    { name: "바비큐립", price: 54000, category: "메인" },
    { name: "해산물파스타", price: 35000, category: "메인" },
    { name: "크리스마스파스타", price: 25000, category: "메인" },
    { name: "양송이수프", price: 6000, category: "애피타이저" },
    { name: "타파스", price: 5500, category: "애피타이저" },
    { name: "시저샐러드", price: 8000, category: "애피타이저" },
    { name: "초코케이크", price: 15000, category: "디저트" },
    { name: "아이스크림", price: 5000, category: "디저트" },
  ];

  test("주문 메뉴 갯수가 20개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Order(["해산물파스타-7", "레드와인-7", "초코케이크-7"], menuInfo);
    }).toThrow(PREFIX_ERROR);
  });

  test("음료만 주문 시 예외가 발생한다.", () => {
    expect(() => {
      new Order(["레드와인-7", "제로콜라-2"], menuInfo);
    }).toThrow(PREFIX_ERROR);
  });

  test("메뉴 갯수가 1개 이상이 아닐시에 예외가 발생한다.", () => {
    expect(() => {
      new Order(["해산물파스타-0", "레드와인-7"], menuInfo);
    }).toThrow(PREFIX_ERROR);
  });

  test("없는 메뉴를 주문하면 예외가 발생한다.", () => {
    expect(() => {
      new Order(["크림파스타-7", "레드와인-7", "초코케이크-7"], menuInfo);
    }).toThrow(PREFIX_ERROR);
  });

  test("중복 하여 메뉴를 주문하면 예외가 발생한다.", () => {
    expect(() => {
      new Order(["크림파스타-7", "크림파스타-3"], menuInfo);
    }).toThrow(PREFIX_ERROR);
  });

  test("입력 형식이 잘못되면 예외가 발생한다.", () => {
    expect(() => {
      new Order(["크림파스타: 7", "제로콜라: 3"], menuInfo);
    }).toThrow(PREFIX_ERROR);
  });
});
