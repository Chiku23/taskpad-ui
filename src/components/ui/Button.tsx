import type { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({className = "", children, ...props} : ButtonProps) => {

    return(
        <button className={`${className}`} {...props}>
            {children}
        </button>
    )
}