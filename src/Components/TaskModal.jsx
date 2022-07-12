import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const TaskModal = ({ show, handleClose, setLoading }) => {

  const createTask = async (e) => {
    e.preventDefault();
    let url = "https://sujoygiri123.pythonanywhere.com/api/task-create/"
    let task_name = e.target.task_name.value;
    let task_desc = e.target.task_desc.value;
    let sending_data = JSON.stringify({
      "name": task_name,
      "description": task_desc
    });
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: sending_data
    });
    const data = await response.json();
    setLoading(true);
    handleClose();
    console.log(data);
  }

  return (
    <>
      <Modal className="animate__animated animate__fadeInDownBig" show={show} onHide={handleClose} backdrop="static" keyboard={false} >
        <Form onSubmit={createTask} method="POST">
          <Modal.Header closeButton>
            <Modal.Title>Create A New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="task-name">
              <Form.Label>Task Name</Form.Label>
              <Form.Control type="text" name='task_name' placeholder="Example: drink water 4 times..." autoFocus required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="task-desc">
              <Form.Label>Task Descripion</Form.Label>
              <Form.Control as="textarea" name='task_desc' rows={2} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" type='submit'>
              Create Task
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default TaskModal;
