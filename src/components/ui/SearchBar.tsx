import {useState, type ChangeEvent } from "react";
import {IoSearch} from "react-icons/io5";

interface SearchProps {
    className: string
    placeholder: string
}

export const SearchBar = ({className, placeholder}: SearchProps) => {
    const [query, setQuery] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setQuery(e.target.value);
    }
    return(
        <div className="h-full relative flex flex-1 items-center">
            <IoSearch className="absolute size-5 text-text-ghost left-2"/>
            <input 
            className={className}
            type="text" 
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            style={{
                border: "1px solid gray",
                borderRadius: "5px",
                outline: "none",
                width: "100%",
                height: "100%",
                padding: "8px 30px"
            }}/>
        </div>
    )
}