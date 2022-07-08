import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import TaskModal from '../Components/TaskModal';

import './Home.css'

const Home = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      Home
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      {show && <TaskModal show={show} handleClose={handleClose}/>}
    </>

  )
}

export default Home;