"use client"
import { ChangeEvent, useEffect, useState } from "react";
import TextInput from "./TextInput";
interface SearchableSelectProps {
    className?: string;
    options: Option[];
    setSelectedOption: (option: Option) => void;
    placeholder?: string;
    
}

interface Option {
    label: string;
    id: number | null;
}

const OptionComponent: React.FC<{ option: Option, setOption: (value: string) => void }> = ({ option, setOption }) => {
    const clickHandler = () => {
        console.log(option.label)
        setOption(option.label);
    }
    return (
        <div className="font-bold cursor-pointer flex items-center gap-2 w-full py-2 px-4 hover:brightness-90 hover:backdrop-brightness-90" onClick={clickHandler}>
            <span>{option.label}</span>
        </div>
    );
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ className, options, setSelectedOption, placeholder }) => {
    console.log(options)
    const [value, setValue] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    const focusHandler = () => {
        setShowTooltip(true);
    }
    const blurHandler = () => {
        setTimeout(() => {
        setShowTooltip(false);
        },100)
    }

    useEffect(() => {
        const selectedEvent = options.find((event) => event.label === value)
        if (selectedEvent) {
            setSelectedOption(selectedEvent);
        }
        else{
            setSelectedOption({label:value,id:null});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
    return (
        <div className={`${className} relative`}>
            <TextInput value={value} onChange={changeHandler} className = 'rounded-xl' 
            placeholder = {placeholder}
            onFocus = {focusHandler} 
            onBlur = {blurHandler}/>
            {showTooltip && <div className="overflow-auto flex flex-col absolute top-full left-0 bg-[#3f6473] rounded-xl w-full max-h-[33vh] h-fit">
                {options.map((option) => {
                    if (option.label.toLowerCase().includes(value.toLowerCase())){
                        return <OptionComponent key={option.id??option.label} option={option} setOption={setValue} 
                    />
                    }
                })}
            </div>}
        </div>
    );
}

export default SearchableSelect;