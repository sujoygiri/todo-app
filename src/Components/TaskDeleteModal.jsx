import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const TaskDeleteModal = ({ show, handleClose, deleted_task, setLoading }) => {

    const deleteTask = async (e) => {
        e.preventDefault();
        let url = "https://sujoygiri123.pythonanywhere.com/api/task-delete/";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                "id": deleted_task.id
            })
        });
        const data = await response.json();
        handleClose();
        setLoading(true);
        console.log(data);
    }

    return (
        <>
            <Modal className="animate__animated animate__fadeInDownBig" size="sm" show={show} onHide={handleClose} aria-labelledby="delete-modal" centered >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title id="delete-modal">
                            Confirm Delete
                        </Modal.Title>
                    </Modal.Header>
                    {/* <Modal.Body></Modal.Body> */}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button type='submit' variant='danger' onClick={deleteTask}>Ok</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default TaskDeleteModal;