import EmotionItems from "./EmotionItems";
import Button from "./Button";
import {  useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import {emotionList} from '../util/constants'
import { getStringedDate } from "../util/getStringedDate";

const Editor = ({onSubmit,initData}) => {
  
    const nav = useNavigate();
    
    const [input,setInput] = useState({
        createdDate:new Date(),
        title:"",
        emotionId:3,
        content:""
    })

    useEffect(()=>{
        if(initData){
            setInput({
                ...initData,
                createdDate: new Date(Number(initData.createdDate)),
            })
        }
    },[initData])

    const onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if(name === "createdDate"){
            value = new Date(value);
        }

        setInput({
            ...input,
            [name]:value
        })
    }

    const onClickSubmitButton = () => {
        onSubmit(input);
    }

    return (
        <>
            <div className="Editor flex flex-col gap-10 py-10 [&_h4]:pb-5 [&_h4]:text-[22px] [&_h4]:font-bold ">
                <section className="dateSection">
                    <h4>오늘의 날짜</h4>
                    <input 
                        type="date" 
                        name="createdDate"
                        onChange={onChangeInput}
                        value={getStringedDate(input.createdDate)}
                    />
                </section>
                <section className="titleSection">
                    <h4>제목</h4>
                    <input 
                        type="text" 
                        className="w-full"
                        name="title"
                        onChange={onChangeInput}
                        value={input.title}
                    />
                </section>
                <section className="emotionSection">
                    <h4>오늘의 감정</h4>
                    <div className="flex justify-around gap-[2%]">
                        {emotionList.map((item)=>
                            <EmotionItems 
                               onClick={()=>onChangeInput({
                                   target:{
                                        name:"emotionId",
                                        value:item.emotionId
                                   }
                               })}
                                key={item.emotionId} 
                                {...item} 
                                isSelected={item.emotionId === input.emotionId}
                            />
                        )}
                    </div>
                </section>
                <section className="contentSection">
                    <h4>오늘의 일기</h4>
                    <textarea 
                        name="content"
                        onChange={onChangeInput}
                        value={input.content}
                        placeholder="오늘은 어땠나요?"
                        className="w-full min-h-[200px] box-border resize-y"
                    />
                </section>
                <section className="buttonSection flex justify-between">
                    <Button text={"취소"} onClick={()=>nav(-1)}/>
                    <Button text={"완료"} type={"positive"} onClick={onClickSubmitButton}/>
                </section>
            </div>
        </>
    )
}

export default Editor;