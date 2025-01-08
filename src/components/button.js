import { useMemo } from "react"
import style from "../style/button.module.css"

export default function Button(data) {
    const variant = useMemo(() => {
        if(data.type) {
            if(data.type === "default") {
                return style.buttonDefault;
            }

            if(data.type === "secondary") {
                return style.buttonSecondary;
            }
        } else {
            return style.buttonDefault;
        }
    }, [data.type])

    return(
        <button 
            className={
                [
                    style.button,
                    variant
                ].join(' ')
            }
            onClick={data.handleClick}>
            {data.label}
        </button>
    )
}