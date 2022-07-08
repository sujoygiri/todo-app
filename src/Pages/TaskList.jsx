import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import './TaskList.css';

const TaskList = () => {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        let url = "https://sujoygiri123.pythonanywhere.com/api/task-list/"
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        console.log(data);
        setTasks(data);
        setLoading(false);
    }

    useEffect(() => {
        if (loading) {
            fetchTasks();
        };
    }, [loading]);

    return (
        <>
            <Container>
                <div className="heading">
                    <h3>Task List</h3>
                </div>
                {tasks && tasks.map((task) => {
                    return (
                        <div key={task.id}>
                            <div className="task-name">
                                <h5>{task.name}</h5>
                            </div>
                        </div>
                    )
                })
                }
            </Container>
        </>
    )
}


export default TaskList;