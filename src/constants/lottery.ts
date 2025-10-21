import { LotteryType } from "@/types/lottery";

export const LOTTERY_TYPES: LotteryType[] = [
  { id: "1", name: "หวยลาวพัฒนา", closing: "15:30", prize: "x900", status: "open" },
  { id: "2", name: "หวยลาว VIP", closing: "16:00", prize: "x950", status: "open" },
  { id: "3", name: "หวยลาว TV", closing: "17:30", prize: "x850", status: "closed" },
];

export const QUICK_NUMBERS = ["12", "23", "34", "45", "56", "67", "78", "89", "90", "01"];

export const LOTTERY_PRICE_PER_TICKET = 80;
