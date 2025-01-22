import { useMemo } from "react";
import style from "./message-box.module.css";

export default function MessageBox(data) {
	const variant = useMemo(() => {
		if(data.type) {
				if(data.type === "default") {
						return style.messageBoxDefault;
				}

				if(data.type === "success") {
						return style.messageBoxSuccess;
				}
		} else {
				return style.messageBoxDefault;
		}
	}, [data.type])
	
	return (
		<div className={[ style.messageBox, variant].join(' ')}>
				{data.message}
		</div>
	)
}