interface ButtonProps {
    text:string;
    type?:string;
    onClick?:()=>void;
}

const Button = ({text,type,onClick}:ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`Button Button_${type} p-[10px_20px] text-lg whitespace-nowrap cursor-pointer rounded-[5px]  
            ${type === "positive" ? "text-white bg-[rgb(100,201,100)]" : 
              type === "negative" ? "text-white bg-[rgb(263,86,95)]" :
                "bg-[#f5f5f5]"}
            `}>
            {text}
         </button>
    )
}

export default Button