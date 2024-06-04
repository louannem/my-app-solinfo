import style from "@/style/ui-link.module.css";
import { useMemo } from "react";

export default function UiLink(data) {
    const type = useMemo(() => {
        if(data.type) {
            if(data.type === 'default') {
                return style.uiLinkDefault;
            } else if(data.type === 'secondary') {
                return style.uiLinkSecondary;
            }
        } else {
            return style.uiLinkDefault;
        }
    }, [data.type])
    
    return(
        <a 
            href={data.url} 
            className={ 
                [
                    type,
                    style.uiLink
                ].join(' ')
            }
        >
            {data.label}
        </a>
    )
}