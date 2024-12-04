import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TaskListing from './TaskListing'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <TaskListing/>
    </div>

    
  )
}

export default Home
