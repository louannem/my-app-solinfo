'use client'
import { useEffect, useState } from "react";
import "./globals.css";
import Header from "@/components/header";


// const Cursor = () => {
	
// 	return <div 
// 			style={{
// 				backgroundImage: `radial-gradient( 
// 					circle at ${position.x}px ${position.y}px, red  , blue 50% )`
// 		}}
// 	/>
// }


export default function Template({ children }) {
     

const Cursor = () => {
	const [position, setPosition] = useState({x: 0, y: 0});

	useEffect(() => {
		addEventListeners();
		return () => removeEventListeners();
	}, []);
	
	const addEventListeners = () => {
		document.addEventListener("mousemove", onMouseMove);
	};
	
	const removeEventListeners = () => {
		document.removeEventListener("mousemove", onMouseMove);
	};
	
	const onMouseMove = (e) => {
		setPosition({x: e.clientX, y: e.clientY});
	};     

	return <div 
		className="cursor"
		style={{ left: `${position.x}px`, top: `${position.y}px` }}
	/>
}

  return (
    <>
			{/* <Cursor /> */}
			<Header />
			{children}
    </>
  )
}
