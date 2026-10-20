import { getEmotionImage } from '../util/get-emotion-image'
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const DiaryItem = ({id, createdDate, emotionId, title,content}) => {

    const nav = useNavigate();

    return(
        <div className="DiaryItem flex items-center justify-between gap-[15px] py-[15px] border-b border-[rgb(236,236,236)]">
            <div 
                onClick={()=>nav(`/diary/${id}`)}
                className={`thumbSection thumb${emotionId} flex items-center justify-center min-w-30 h-20 rounded-[5px] cursor-pointer`}
            >
                <img src={getEmotionImage(emotionId)} className="w-full h-full object-contain"/>
            </div>
            <div onClick={()=>nav(`/diary/${id}`)} className="infoSection flex flex-col gap-[5px] flex-1 cursor-pointer">
                <div className="content text-lg font-bold">{title}</div>
                <div className="createdDate text-sm text-gray-400">{new Date(createdDate).toLocaleDateString()}</div>
            </div>
            <div onClick={()=>nav(`/edit/${id}`)} className="buttonSection [&_button]:min-w-[70px]">
                <Button text={"수정"}/>
            </div>
        </div>
    )
}

export default DiaryItem;