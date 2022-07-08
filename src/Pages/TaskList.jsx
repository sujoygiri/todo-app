import React from 'react'
import { useEffect, useState } from 'react';

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
            <div>TaskList</div>
            {tasks && tasks.map((task) => {
                return (
                    <div key={task.id}>
                        <div>{task.title}</div>
                        <div>{task.description}</div>
                    </div>
                )
            })
            }
        </>
    )
}


export default TaskList;