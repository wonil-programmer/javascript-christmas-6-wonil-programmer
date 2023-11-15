import Validator from "../src/utils/Validator";
import { PREFIX_ERROR } from "../src/constant/Constant";

describe("Validator 테스트", () => {
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

  test.each([["1.1"], ["41"], ["크리스마스"], ["-1"]])(
    "날짜 형식이 잘못되면 예외가 발생한다.",
    (input) => {
      expect(() => {
        Validator.validateDate(input);
      }).toThrow();
    }
  );

  test.each([
    ["크림파스타: 7", "제로콜라: 3"],
    ["크림파스타=> 7", "제로콜라=> 3"],
  ])("주문 형식이 잘못되면 예외가 발생한다.", (input) => {
    expect(() => {
      Validator.validateOrderFormat(input);
    }).toThrow(PREFIX_ERROR);
  });

  test.each([["크림파스타"], ["환타"]])(
    "없는 메뉴를 주문하면 예외가 발생한다.",
    (input) => {
      expect(() => {
        Validator.validateNameExistence(input);
      }).toThrow(PREFIX_ERROR);
    }
  );

  test.each([["1.1"], ["0"]])(
    "메뉴 갯수가 1개 이상이 아닐시에 예외가 발생한다.",
    (input) => {
      expect(() => {
        Validator.validateQuantity(input);
      }).toThrow(PREFIX_ERROR);
    }
  );

  test.each([[["바비큐립", "제로콜라"], ["바비큐립"]]])(
    "중복 하여 메뉴를 주문하면 예외가 발생한다.",
    (existingItems, item) => {
      expect(() => {
        Validator.validateNameDuplication(existingItems, item);
      }).toThrow(PREFIX_ERROR);
    }
  );

  test.each([
    ["해산물파스타-7", "레드와인-7", "초코케이크-7"],
    ["레드와인-20", "초코케이크-20"],
  ])("주문 메뉴 갯수가 20개가 넘어가면 예외가 발생한다.", (input) => {
    expect(() => {
      Validator.validateTotalQty(input);
    }).toThrow(PREFIX_ERROR);
  });

  test.each([["레드와인, 제로콜라"], ["샴페인"]])(
    "음료만 주문 시 예외가 발생한다.",
    (input) => {
      expect(() => {
        Validator.validateOnlyBeverage(input);
      }).toThrow(PREFIX_ERROR);
    }
  );
});
