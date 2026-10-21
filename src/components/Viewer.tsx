import { getEmotionImage } from "../util/get-emotion-image";
import {emotionList} from '../util/constants'
import type { DiaryListItem } from "../type/diaryListItem";

const Viewer = ({ emotionId,title, content }:DiaryListItem) => {

    const emotionItem = emotionList.find((item)=>String(item.emotionId) === String(emotionId));

    return(
        <>
            <div className="Viewer text-center 
                    [&_section]:w-full [&_section]:flex [&_section]:flex-col [&_section]:items-center [&_section]:justify-center [&_section]:mb-25
                    [&_h4]:text-[22px] [&_h4]:font-bold [&_h4]:mb-5"
            >
                <section className="imageSection mt-20">
                    <h4>{title}</h4>
                    <div className={`emotionImgWrapper emotionImgWrapper_${emotionId} flex flex-col items-center justify-around w-[250px] h-[250px] rounded-[5px]`}>
                        <img src={getEmotionImage(emotionId)} />
                        <div>{emotionItem?.emotionName}</div>
                    </div>
                </section>
                <section className="contentSection">
                    <div className="w-full break-all wrap-break-word border border-[#444] rounded-[5px]">
                        <p className="p-5 text-left text-lg leading-[2.5]">{content}</p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Viewer;