import dayjs from "dayjs";

// 진단지 헤어진 날 - 날짜 차이 계산
export const formatEndDate = (date?: string) => {
  const daysDifference = dayjs(new Date()).diff(dayjs(date), "day");
  return daysDifference;
};
