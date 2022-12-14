import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './TaskUpdateModal.css'

const TaskUpdateModal = ({ show, handleClose, updated_task, setLoading }) => {

    const [taskName, setTaskName] = useState(updated_task.name);
    const [taskDesc, setTaskDesc] = useState(updated_task.description);
    const [taskStatus, setTaskStatus] = useState(updated_task.is_done);

    const updateTaskName = (e) => {
        setTaskName(e.target.value);
    }

    const updateTaskDesc = (e) => {
        setTaskDesc(e.target.value);
    }

    const updateTaskStatus = (e) => {
        setTaskStatus(e.target.value);
    }


    const updateTask = async (e) => {
        e.preventDefault();
        let url = "https://sujoygiri123.pythonanywhere.com/api/task-update/";
        let updated_task_name = taskName;
        let updated_task_desc = taskDesc;
        let updated_task_status = taskStatus;
        const response = await fetch(url,{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": updated_task.id,
                "name": updated_task_name,
                "description": updated_task_desc,
                "is_done": updated_task_status 
            })
        });
        await response.json();
        handleClose();
        setLoading(true);
    }

    return (
        <>
            <Modal className="animate__animated animate__fadeInDownBig" show={show} onHide={handleClose} backdrop="static" keyboard={false} fade="true">
                <Form onSubmit={updateTask} method="POST">
                    <Modal.Header closeButton>
                        <Modal.Title>Update Your Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="task-name">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control type="text" name='task_name' onChange={updateTaskName} value={taskName} autoFocus required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="task-desc">
                            <Form.Label>Task Descripion</Form.Label>
                            <Form.Control as="textarea" name='task_desc' onChange={updateTaskDesc} value={taskDesc} rows={2} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="task-done">
                            <Form.Label>Is Task Done?</Form.Label>
                            <div className="is-task-done" onChange={updateTaskStatus}>
                                <Form.Check className="task-yes" type="radio" name="task_status" label="Yes" value={true}/>
                                <Form.Check className="task-no" type="radio" name="task_status" label="No" value={false} />
                            </div>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" type='submit'>
                            Update Task
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default TaskUpdateModal;