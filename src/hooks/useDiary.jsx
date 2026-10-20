import { useContext,useEffect,useState } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
    const data =useContext(DiaryStateContext);
    const [curDiaryItem,setCurDiaryItem] = useState();
    const nav = useNavigate();

    // useEffect : params.id 또는 data의 값이 변할때만 실행되도록
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