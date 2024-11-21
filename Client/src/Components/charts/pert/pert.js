import React from 'react'
import ReactFlow  from 'react-flow-renderer'
import Node from './node'
import usePert from './usePert'

export default function Pert({ tasks, location }) {
    console.log('location', location);
    const taskList = {};
    tasks.forEach(({ id, task_name, duration, parent }) => {
        taskList[task_name] = {
            id: task_name,
            optimisticTime: parseInt(duration),
            mostLikelyTime: parseInt(duration) ,
            pessimisticTime: parseInt(duration) , 
            predecessors: parent,
          };
    });

    const Nodes = usePert(taskList)
    return (
         
        <div style={{ height:650 }}>
            <ReactFlow nodeTypes={{ special: Node }} elements={Nodes} />
        </div>
    )
}