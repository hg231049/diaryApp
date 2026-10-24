import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useState } from "react";
import { useDiaryList } from "../store/diary";
import { usePageTitle } from "../hooks/usePageTitle";
import type { DiaryListItem } from "../type/diaryListItem";

// 이번달에 해당하는 데이터만 추출
const getMonthlyData = (pivotDate: Date, data: DiaryListItem[]) => {
  // 이번달의 시작되는 날. 1일의 0시0분0초
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0,
  ).getTime();
  // 이번달의 마지막 날 = 다음달의 시작되기 직전 날
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59,
  ).getTime();
  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime,
  );
};

const Home = () => {
  const data = useDiaryList();
  const [pivotDate, setPivotDate] = useState(new Date());
  usePageTitle("감정 일기장");

  // 데이터 가공
  const monthlyData = getMonthlyData(pivotDate, data);

  // 1. 다음달로 이동
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  // 2. 이전달로 이동
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <>
      <div>
        <Header
          title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
          leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
          rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
        />
        <DiaryList data={monthlyData} />
      </div>
    </>
  );
};

export default Home;
