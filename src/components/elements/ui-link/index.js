'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
			case "transparent":
					return style.uiLinkTransparent;
		
			default:
				return style.uiLinkDefault;
		}
	}, [data.type]);

	const icon = useMemo(() => {
		if (data.icon) return <FontAwesomeIcon icon={data.icon} className={style.uiLink_icon} />
	}, [data.icon])
    
    return(
		<a 
			href={data.url} 
			className={ [type, style.uiLink].join(' ') }
		>
		{data.label}
		{ icon }
		</a>
    )
}