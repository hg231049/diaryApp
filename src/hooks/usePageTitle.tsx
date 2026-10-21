import { useEffect } from "react";

export const usePageTitle = (title:string) => {
    useEffect(()=>{
        const $title = document.getElementsByTagName("title")[0];
        $title.innerHTML = title;
    },[title])
}