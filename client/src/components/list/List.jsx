import React, { useState } from 'react'
import './list.scss'
import Card from '../card/Card'
import { listData } from '../../lib/dummydata'


function List({posts}) {
  const [deletedIds, setDeletedIds] = useState([]);

  const handleDeleteProperty = (deletedId) => {
    setDeletedIds(prev => [...prev, deletedId]);
  };

  return (
    <div className='list'>
        {posts
          .filter(item => !deletedIds.includes(item.id))
          .map((item)=>(
            <Card key={item.id} item={item} showEdit={true} onDelete={handleDeleteProperty}/>
        ))}
    </div>
  )
}

export default List