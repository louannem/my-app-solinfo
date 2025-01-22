'use client'
import { useEffect, useState } from "react";
import style from "./gradient-background.module.css"

export default function GradientBackground({children}) {
	const [ mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	
	useEffect(() => {
		const updateMousePosition = (ev) => {
				setMousePosition({ x: ev.clientX, y: ev.clientY });
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
					rgb(238, 232, 255), 
					rgba(0,0,0,0) 20% 
				)`
			}}
		> 
		{children}
	</div>
	)
}