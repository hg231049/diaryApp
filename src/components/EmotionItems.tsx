import { getEmotionImage } from '../util/get-emotion-image'

interface EmotionItemsProps {
    emotionId:number;
    emotionName:string;
    isSelected:boolean;
    onClick:()=>void;
}

const EmotionItems = ({emotionId,emotionName,isSelected,onClick}:EmotionItemsProps) => {
    return (
        <>
            <div 
                onClick={onClick}
                className={`EmotionItem ${isSelected ? `EmotionItem_on EmotionItem_on_${emotionId}` : ""}
                flex flex-col items-center gap-[10px] p-5 text-center rounded-[5px] bg-[#f5f5f5] cursor-pointer 
            `}>
                <img src={getEmotionImage(emotionId)} className='w-[50%]'/>
                <div>
                    {emotionName}
                </div>
            </div>
        </>
    )
}

export default EmotionItems;