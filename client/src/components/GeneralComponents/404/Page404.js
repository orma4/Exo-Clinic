import React from 'react'

import Error from './error/Error'
import Info from './info/Info'
import Astronaut from './astronaut/Astronaut'
import ContainerStar from './containerStar/ContainerStar'
const Page404 = () => {
  return (
   <main className="space">
     	<Error/>
			<Info/>
			<Astronaut/>
			<ContainerStar/>
   </main>

  )
}

export default Page404
