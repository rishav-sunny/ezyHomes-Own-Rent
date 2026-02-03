import React, { Suspense, useState } from 'react'
import './listPage.scss'
import Filter from '../../components/filter/Filter'
import { listData } from '../../lib/dummydata'
import Card from '../../components/card/Card'
import Map from '../../components/map/Map'
import { Await, useLoaderData } from 'react-router-dom'

const ListPage = () => {
    // const data = listData;
    const data = useLoaderData();
    const [deletedIds, setDeletedIds] = useState([]);

    const handleDeleteProperty = (deletedId) => {
        setDeletedIds(prev => [...prev, deletedId]);
    };

    return (
    <div className='listPage'>
        <div className="listContainer">
            <div className="wrapper">
                <Filter/>
                <Suspense fallback={<p>Loading...</p>}>
                    <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
                        {(postResponse) => {
                            const filteredPosts = postResponse.data.filter(post => !deletedIds.includes(post.id));
                            
                            return filteredPosts.length > 0 ? (
                                filteredPosts.map((post) => <Card key={post.id} item={post} showEdit={true} onDelete={handleDeleteProperty}/>)
                            ) : (
                                <div className="noPropertiesContainer">
                                    <div className="noPropertiesBox">
                                        <div className="iconContainer">
                                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#fece51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M2 17L12 22L22 17" stroke="#fece51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M2 12L12 17L22 12" stroke="#fece51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <h2>Sorry! No Properties Found</h2>
                                        <p>We couldn't find any properties matching your search criteria.</p>
                                        <p className="suggestion">Search for another locality</p>
                                    </div>
                                </div>
                            );
                        }}
                    </Await>
                </Suspense>
            </div>    
        </div>        
        {/* <div className="mapContainer">
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
                    {(postResponse) => <Map items={postResponse.data}/>}
                </Await>
            </Suspense>
        </div>         */}
    </div>
  )
}

export default ListPage