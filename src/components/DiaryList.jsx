import { useState } from "react";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";

const DiaryList = ({data}) => {

    const nav = useNavigate();

    const [sortType,setSortType] = useState("latest");

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    }

    const getSortedData = () => {
        // 원본배열은 놔두고 정렬된 새로운 배열을 반환
        return data.toSorted((a,b)=>{
            if(sortType === "oldest"){
                return Number(a.createdDate) - Number(b.createdDate);
            } else {
                return Number(b.createdDate) - Number(a.createdDate);
            }
        });
    }

    const sortedData = getSortedData();

    return(
        <div className="DiaryList">
            <div className="menuBar flex gap-[10px] my-5 [&_button]:flex-1">
                <select 
                    value={sortType}
                    onChange={onChangeSortType}
                    className="p-[10px_20px] text-lg rounded-[5px] bg-[#f5f5f5] cursor-pointer"
                >
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된순</option>
                </select>
                <Button onClick={()=>nav(`/new`)} text={"새로 작성하기"} type={"positive"} />
            </div>
            <div className="listWrapper">
                {sortedData.map((item)=>
                    <DiaryItem key={item.id} {...item}/>
                )}
                
            </div>
        </div>
    )
}

export default DiaryList;