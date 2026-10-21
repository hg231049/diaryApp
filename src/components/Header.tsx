import type { ReactNode } from "react";

interface HeaderProps {
    title:string;
    leftChild:ReactNode;
    rightChild?:ReactNode;
}

const Header = ({title,leftChild,rightChild}:HeaderProps) => {
    return (
        <header className="header flex items-center py-5 border-b border-[rgb(226,226,226)] [&_div]:flex">
            <div className='header-left justify-start w-1/4'>
                {leftChild}
            </div>
            <div className='header-center justify-center w-1/2 text-[25px]'>
                {title}
            </div>
            <div className='header-right justify-end w-1/4'>
                {rightChild}
            </div>
        </header>
    )
}

export default Header;