import React from 'react'
import { useParams } from 'react-router-dom'

const DemoElement = () => {
    const {id} = useParams()
  return (
    <div>
        {
            <p>${id}</p>
        }
    </div>
  )
}

export default DemoElement