import React from 'react'

// statics
import './Info.css'

const Info = () => {
	return (
		<div className='main-info'>
			<h2>Well, You are lost!</h2>
			<p>Unfortunately this world does not exist yet.</p>
			<a href='/'>
				Go Back
				<span></span>
				<span></span>
				<span></span>
			</a>
		</div>
	)
}

export default Info
