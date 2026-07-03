const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function parse(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return { y, m, d };
}

export function toDateStr(year: number, monthIdx: number, day: number) {
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  return `${year}-${pad(monthIdx + 1)}-${pad(day)}`;
}

export function formatDateShort(dateStr: string) {
  const { m, d } = parse(dateStr);
  return `${m}월 ${d}일`;
}

export function formatDateFull(dateStr: string) {
  const { y, m, d } = parse(dateStr);
  const weekday = WEEKDAYS[new Date(y, m - 1, d).getDay()];
  return `${y}년 ${m}월 ${d}일 ${weekday}요일`;
}

export function todayDateStr() {
  const now = new Date();
  return toDateStr(now.getFullYear(), now.getMonth(), now.getDate());
}
