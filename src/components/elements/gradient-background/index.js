'use client'
import { useEffect, useState } from "react";
import style from "./gradient-background.module.css"

export default function GradientBackground({children, start="#eee8ff", end="rgba(0,0,0,0)", range="20%"}) {
	const [ mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	
	useEffect(() => {
		const updateMousePosition = (ev) => {
			// console.log(ev)
				setMousePosition({ x: ev.layerX, y: ev.layerY });
		};
		window.addEventListener('mousemove', updateMousePosition);
		
		return () => {
				window.removeEventListener('mousemove', updateMousePosition);
		};
	}, []);	

	return (
		<div 
			className={style.gradient_background}
			style={{
				backgroundImage: `radial-gradient(
					circle at ${mousePosition.x}px ${mousePosition.y}px,
					${start}, 
					${end} ${range} 
				)`
			}}
		> 
		{children}
	</div>
	)
}