import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import TaskModal from '../Components/TaskModal';
import TaskUpdateModal from '../Components/TaskUpdateModal';
import TaskDeleteModal from '../Components/TaskDeleteModal';

import './Home.css'

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [deleteData, setDeleteData] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const closeUpdateModal = () => setShowUpdateModal(false);
  const closeDeleteModal = () => setShowDeleteModal(false);

  const fetchTasks = async () => {
    let url = "https://sujoygiri123.pythonanywhere.com/api/task-list/"
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    setTasks(data);
    setLoading(false);
  }

  const handelUpdate = (task) => {
    setShowUpdateModal(true);
    setUpdateData(task);    
  };

  const handelDelete = (task) => {
    setShowDeleteModal(true);
    setDeleteData(task);
  }

  useEffect(() => {
    if(loading){
      fetchTasks();
    }
  }, [loading]);

  return (
    <>
      <Container className="mt-4">
        <div className="main-head">
          <div className="heading">
            <h3>Task List</h3>
          </div>
        </div>
        <div className="main-body">
          {tasks && tasks.map((task) => {
            return (
              <div key={task.id}>
                <div className="task-name">
                  <div className="task-title-section">
                    <h5 className={`${task.is_done && 'line-through'}`}>{task.name}</h5>
                  </div>
                  <div className="btn-section">
                    {
                      task.is_done ? 
                      <Button className='btn-sm' variant='danger' onClick={()=>handelDelete(task)}>Delete</Button> : 
                      <Button className='btn-sm' variant='primary' onClick={()=>handelUpdate(task)}>Update</Button>
                    }
                  </div>
                </div>
              </div>
            )
          })
          }
        </div>
        <div className="main-footer">
          <Button className="task-create-btn" variant="primary" onClick={handleShow}>
            +
          </Button>
        </div>
        {show && <TaskModal show={show} handleClose={handleClose} setLoading={setLoading}/>}
        {showUpdateModal && <TaskUpdateModal show={showUpdateModal} handleClose={closeUpdateModal} updated_task={updateData} setLoading={setLoading}/>}
        {showDeleteModal && <TaskDeleteModal show={showDeleteModal} handleClose={closeDeleteModal} deleted_task={deleteData} setLoading={setLoading}/>}
      </Container>
    </>
  )
}

export default Home;