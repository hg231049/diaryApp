import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import {  useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import { usePageTitle } from "../hooks/usePageTitle";
import type { EditorInput } from "../components/Editor";

const New = () => {

    const {onCreate} = useContext(DiaryDispatchContext);
    const nav = useNavigate();

    usePageTitle("새로 작성하기");

    const onSubmit = (input:EditorInput) => {
        onCreate(input.createdDate.getTime(),input.emotionId,input.title,input.content)
        nav('/',{replace:true})
    }

    return (
        <>
         <div>
            <Header 
                title={"새로 작성하기"}
                leftChild={<Button text={"<"} onClick={()=>nav(-1)}/>}
            />
            <Editor onSubmit={onSubmit}/>
         </div>
        </>
    )
}

export default New;