"use client"
import Button from "./Button";
import {SearchableMultiSelect,MultiSelect} from "./MultiSelect";
import SearchableSelect from "./SearchableSelect";
import CustomSelect from "./Select";
import TextInput from "./TextInput";
import FilterIcon from "./logos/FilterIcon";
import SearchIcon from "./logos/SearchIcon";
interface SortOptionType {
    label: string;
    value: string;
}

interface FilterOptionType {
    label: string;
    id: string|number;
}

export type {SortOptionType, FilterOptionType};

interface SearchBarProps {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
    value?: string;
    className?: string;
}

interface FilterBarProps {
    setRetract: React.Dispatch<React.SetStateAction<boolean>>;
    retract: boolean;
}

// TODO: Change all id's to value
interface FilterOptionProps {
    label: string;
    options: FilterOptionType[] | SortOptionType[];
    setSelected: ((options: FilterOptionType[]) => void) | ((option: SortOptionType) => void);   
    multiSelect?: boolean;
    searchable?: boolean; 
    value?: FilterOptionType[] | SortOptionType;
}

export function SearchBar({setSearchQuery, value, className, placeholder = "Search"}: SearchBarProps) {
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    return (
        <TextInput placeholder={placeholder} 
        className = {className}
        value = {value}
        onChange={inputHandler} 
        beforeIcon = {<SearchIcon/>}/>
    );

}

export function FilterBar({setRetract,retract} : FilterBarProps) {
    return (
        <Button onClick = {()=>setRetract((old)=>!old)} className = "px-10" border={false} 
        beforeIcon = {<FilterIcon className={retract?'':'-rotate-90'}/>}>Show Filters</Button>
    );
}


export function FilterOptions({children}: {children: React.ReactNode}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 w-10/12 m-auto my-8">
            {children}
        </div>
    );
}


export function FilterOption({value, label, options, setSelected, searchable=false, multiSelect=false}: FilterOptionProps) {
    return (
        <div className="flex flex-col gap-1">
            <h3 className="text-lg">{label}</h3>
            {/* @ts-expect-error I'm too lazy to fix this right now*/}
            {searchable && multiSelect && <SearchableMultiSelect selected = {value} options = {options} setSelected={setSelected} placeholder = {label}/>}
            {/* @ts-expect-error I'm too lazy to fix this right now*/}
            {searchable && !multiSelect && <SearchableSelect value = {value} options = {options} setSelectedOptions={setSelected} placeholder = {label}/>}
            {/* @ts-expect-error I'm too lazy to fix this right now*/}
            {!searchable && multiSelect && <MultiSelect selected = {value} options = {options} setSelected={setSelected} placeholder = {label}/>}
            {/* @ts-expect-error I'm too lazy to fix this right now*/}
            {!searchable && !multiSelect && <CustomSelect value = {value} version = "secondary" className = "rounded-xl" options = {options.map((option)=>({label:option.label,  value:option.id}))} onChange={setSelected} placeholder = {label}/>}
        </div>
    )
}