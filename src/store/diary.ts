import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { DiaryListItem } from "../type/diaryListItem";

const initData: { diary: DiaryListItem[] } = {
  diary: [],
};

const useDiaryStore = create(
  persist(
    immer(
      combine(initData, (set) => ({
        actions: {
          createDiary: (
            createdDate: number,
            emotionId: number,
            title: string,
            content: string,
          ) => {
            set((state) => {
              // reduce(): 배열의 각 항목을 순회하면서 하나의 결과값을 만들어 내는 메서드
              // max: 지금까지 확인한 ID 중 가장 큰 값
              // item: 현재 확인 중인 일기 객체
              // Math.max(max, item.id): 두 값 중 더 큰 값 반환
              // -1: 첫 번째 항목을 확인하기 전에 사용하는 초기값
              const maxId = state.diary.reduce(
                (max, item) => Math.max(max, item.id),
                -1,
              );
              //unshift() — 새 일기를 배열 맨 앞에 추가
              state.diary.unshift({
                id: maxId + 1,
                createdDate,
                emotionId,
                title,
                content,
              });
            });
          },
          updateDiary: (
            id: number,
            createdDate: number,
            emotionId: number,
            title: string,
            content: string,
          ) => {
            set((state) => {
              const target = state.diary.find((item) => item.id === id);
              if (target) {
                target.createdDate = createdDate;
                target.emotionId = emotionId;
                target.title = title;
                target.content = content;
              }
            });
          },
          deleteDiary: (id: number) => {
            set((state) => {
              state.diary = state.diary.filter((item) => item.id !== id);
            });
          },
        },
      })),
    ),
    {
      name: "diaryStore",
      partialize: (state) => ({
        diary: state.diary,
      }),
    },
  ),
);

export const useDiaryList = () => {
  const data = useDiaryStore((state) => state.diary);
  return data;
};
export const useCreate = () => {
  const onCreate = useDiaryStore((state) => state.actions.createDiary);
  return onCreate;
};
export const useUpdate = () => {
  const onUpdate = useDiaryStore((state) => state.actions.updateDiary);
  return onUpdate;
};
export const useDelete = () => {
  const onDelete = useDiaryStore((state) => state.actions.deleteDiary);
  return onDelete;
};
