'use client'
import style from "./ui-link.module.css";
import { useMemo } from "react";

export default function UiLink(data) {
	const type = useMemo(() => {
		switch (data.type) {
			case "default":
				return style.uiLinkDefault;
			case "secondary":
				return style.uiLinkSecondary;
			case "header":
				return style.uiLinkHeader;
		
			default:
				return style.uiLinkDefault;
		}
	}, [data.type])
    
    return(
		<a 
			href={data.url} 
			className={ [type, style.uiLink].join(' ') }
		>
		{data.label}
		</a>
    )
}