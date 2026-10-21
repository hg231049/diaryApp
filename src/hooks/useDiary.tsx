import { useContext,useEffect,useState } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";
import type { DiaryListItem } from "../type/diaryListItem";

const useDiary = (id:number) => {
    const data = useContext(DiaryStateContext);
    const [curDiaryItem,setCurDiaryItem] = useState<DiaryListItem | undefined>(undefined);
    const nav = useNavigate();

    // useEffect : params.id 또는 data의 값이 변할때만 실행되도록
    //  useNavigate함수는 useEffect안에서 호출되어야함. 마운트가 된 이후에 호출
    useEffect(()=>{
        const currentDiaryItem = data.find((i)=>String(i.id) === String(id));

        if(!currentDiaryItem){
            window.alert("존재하지 않는 일기입니다.");
            nav('/',{replace:true});
        }

        setCurDiaryItem(currentDiaryItem);
    },[id,data]);

    return curDiaryItem;
}

export default useDiary;