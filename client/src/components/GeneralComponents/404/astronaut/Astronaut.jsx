import React, { useState, useEffect } from 'react'

// statics
import ImgAstro from '../../../../assets/404/main-astronaut.png'
import './Astronaut.css'

const Astronaut = () => {
	const [message, setMessage] = useState('Click me 🚀')
	const [nameClass, setNameclass] = useState('container-astronaut active')
	const [changePos, setChangePos] = useState({
		top: '300px',
		left: '50px',
	})

	const handleClick = () => {
		const msgs = [
			`There's nothing here👈`,
			'Go back home 🏡',
			`Oops! I'm so lost 🎆`,
		]
		const random = Math.floor(Math.random() * msgs.length) + 0
		setMessage(msgs[random])
		setNameclass('container-astronaut active')
		setTimeout(() => {
			setNameclass('container-astronaut')
		}, 5000)
	}

	const moveAstronaut = () => {
		let left = Math.floor(Math.random() * (window.innerWidth - 200))
		let top = Math.floor(Math.random() * (window.innerHeight - 200))
		setChangePos({ top, left })
	}

	useEffect(() => {
		setInterval(() => moveAstronaut(), 5000)
	}, [])

	return (
		<div className={nameClass} message={message} style={changePos}>
			<img
				className='astronaut'
				src={ImgAstro}
				alt='Astronaut'
				onClick={handleClick}
			/>
		</div>
	)
}

export default Astronaut
