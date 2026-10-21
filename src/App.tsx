import './App.css'
import { Route, Routes } from 'react-router-dom'
import Diary from './pages/Diary'
import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import NotFound from './pages/NotFound'
import { useReducer, useRef,createContext, useEffect, useState } from 'react'
import type { DiaryListItem } from './type/diaryListItem'

// const mockData = [
//   {
//     id:0,
//     createdDate:new Date("2026-10-15").getTime(),
//     emotionId:1,
//     title:"1번 일기제목",
//     content:"1번 일기내용"
//   },
//   {
//     id:1,
//     createdDate:new Date("2026-10-14").getTime(),
//     emotionId:2,
//     title:"2번 일기제목",
//     content:"2번 일기내용"
//   },
//   {
//     id:2,
//     createdDate:new Date("2026-09-15").getTime(),
//     emotionId:3,
//     title:"3번 일기제목",
//     content:"3번 일기내용"
//   }
// ]

interface DiaryDispatchType {
    onCreate: (createdDate: number, emotionId: number, title: string, content: string) => void;
    onUpdate: (id: number, createdDate: number, emotionId: number, title: string, content: string) => void;
    onDelete: (id: number) => void;
}

type DiaryAction = 
  | {type:"INIT"; data:DiaryListItem[]}
  | {type:"CREATE"; data:DiaryListItem}
  | {type:"UPDATE"; data:DiaryListItem}
  | {type:"DELETE"; id:number }


function reducer(state:DiaryListItem[],action:DiaryAction){
  let nextState:DiaryListItem[];

  switch(action.type){
    case "INIT" : return action.data;
    case "CREATE" : {nextState = [action.data,...state]; break;}
    case "UPDATE" : {nextState = state.map((item)=>String(item.id) === String(action.data.id) ? action.data : item); break;}
    case "DELETE" : {nextState = state.filter((item)=>String(item.id) !== String(action.id)); break;}
    default : return state;
  }

  // 로컬스토리지 연동
  localStorage.setItem('diary',JSON.stringify(nextState));

  return nextState;
}

// context
export const DiaryStateContext = createContext<DiaryListItem[] | null>(null);
export const DiaryDispatchContext = createContext<DiaryDispatchType | null>(null);

function App() {
  const [isLoading,setIsLoading] = useState(true);
  const idRef = useRef(0);
  const [data,dispatch] = useReducer(reducer,[]);

  useEffect(()=>{
    const storedData = localStorage.getItem('diary');
    if(!storedData){
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(storedData);

    // parsedData가 배열이 아닌 경우 종료
    if(!Array.isArray(parsedData)){
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if(Number(item.id) > maxId) {
        maxId = Number(item.id)
      }
    });
    idRef.current = maxId + 1;

    dispatch({
      type:"INIT",
      data:parsedData
    })

    setIsLoading(false);
  },[])
  
  // 새로운 일기 추가
  const onCreate = (createdDate:number,emotionId:number,title:string,content:string) => {
    dispatch({
      type:"CREATE",
      data:{
        id:idRef.current++,
        createdDate,
        emotionId,
        title,
        content,
      }
    }) 
  }

  // 기존 일기 수정
  const onUpdate = (id:number,createdDate:number,emotionId:number,title:string,content:string) => {
    dispatch({
      type:"UPDATE",
      data:{
        id,
        createdDate,
        emotionId,
        title,
        content,
      }
    }) 
  }

  // 기존 일기 삭제
  const onDelete = (id:number) => {
    dispatch({
      type:"DELETE",
      id,
    }) 
  }

  if(isLoading){
    return <div>데이터 로딩중입니다.</div>
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate,onUpdate,onDelete}}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/new' element={<New/>} />
          <Route path='/diary/:id' element={<Diary/>} />
          <Route path='/edit/:id' element={<Edit/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  )
}

export default App
