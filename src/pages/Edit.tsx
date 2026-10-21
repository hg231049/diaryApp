import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import {  useParams,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import useDiary from "../hooks/useDiary";
import { usePageTitle } from "../hooks/usePageTitle";
import type { EditorInput } from "../components/Editor";

const Edit = () => {
    const {onUpdate,onDelete} = useContext(DiaryDispatchContext);
    const nav = useNavigate();
    const params = useParams();

    const curDiaryItem = useDiary(Number(params.id));

    usePageTitle("수정하기");

    const onSubmit = (input:EditorInput) => {
        if(window.confirm("수정하시겠습니까?")){
            onUpdate(Number(params.id),input.createdDate.getTime(),input.emotionId,input.title,input.content);
            nav('/',{replace:true})
        }
    }

    const onClickDelete = () => {
        if(window.confirm("삭제하시겠습니까?")){
            onDelete(Number(params.id));
            nav('/',{replace:true})
        }
    }

    

    return (
        <div>
            <Header 
                title={"수정하기"}
                leftChild={<Button text={"<"} onClick={()=>nav(-1)}/>}
                rightChild={<Button text={"삭제"} type={"negative"} onClick={onClickDelete}/>}
            />
            <Editor onSubmit={onSubmit} initData={curDiaryItem}/>
        </div>
    )
}

export default Edit;