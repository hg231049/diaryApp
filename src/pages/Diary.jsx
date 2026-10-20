import { useParams,useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import { useContext } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/getStringedDate";
import { usePageTitle } from "../hooks/usePageTitle";

const Diary = () => {
    const {onUpdate,onDelete} = useContext(DiaryDispatchContext);
    const params = useParams();
    const nav = useNavigate();
    const curDiaryItem = useDiary(params.id);

    usePageTitle(`${params.id}번 일기`);

    const onClickUpdate = () => {
        if(window.confirm("수정하시겠습니까?")){
            nav(`/edit/${params.id}`,{replace:true})
        }
    }

    const onClickDelete = () => {
        if(window.confirm("삭제하시겠습니까?")){
            onDelete(params.id);
            nav('/',{replace:true})
        }
    }

    if(!curDiaryItem){
        return <div>데이터 로딩중...</div>
    }

    const { createdDate,emotionId,title, content } = curDiaryItem;
    const diaryTitle = getStringedDate(new Date(createdDate));
    
    return (
        <>
         <div>
            <Header 
                title={`${diaryTitle} 기록`}
                leftChild={<Button text={"<"} onClick={()=>nav(-1)}/>}
            />
            <Viewer emotionId={emotionId} title={title} content={content}/>
            <div className="btnWrap flex justify-between">
                <Button text={"수정"} onClick={onClickUpdate}/>
                <Button text={"삭제"} type={"negative"} onClick={onClickDelete}/>
            </div>
         </div>
        </>
    )
}

export default Diary;