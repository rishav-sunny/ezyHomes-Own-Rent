import React, { useContext, useState } from 'react'
import './singlePage.scss'
import Slider from '../../components/slider/Slider'
import { singlePostData, userData } from '../../lib/dummydata'
import Map from '../../components/map/Map'
import { redirect, useLoaderData } from 'react-router-dom'
import DOMPurify from "dompurify"
import { AuthContext } from '../../context/AuthContext'
import apiRequest from '../../lib/apiRequest'


const SinglePage = () => {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const {currentUser} = useContext(AuthContext)

  const handleSave = async () => {
    setSaved((prev) => !prev);

    console.log(" button clicked ")
    
    if(!currentUser){
      redirect("/login")
    }
    
    try {
      await apiRequest.post("/users/save", {postId: post.id})
    } catch (error) {
      console.log(error);
      setSaved((prev) => !prev);
    }
  }

  return (
    <div className='singlePage'>
        <div className="details">
          <div className="wrapper">
            <Slider images={post.images}/>
            <div className="info">
              <div className="top">
                <div className="post">
                  <h1>{post.title}</h1>
                  <div className="address">
                    <img src="/pin.png" alt="" />
                    <span>{post.address}</span>
                  </div>
                  <div className="price">{singlePostData.price}</div>
                </div>
                <div className="user">
                  <img src={post.user.avatar} alt="" />
                  <span>{post.user.username}</span>
                </div>
              </div>
              <div
                className="bottom"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.postDetail.desc),
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="features">
          <div className="wrapper">
            <p className="title">General</p>
            <div className="listVertical">
              <div className="feature">
                <img src="/utility.png" alt="" />
                <div className="featureText">
                  <span>Utilities</span>
                  {
                    post.postDetail.utilities === "owner" ?
                      (<p>Owner pays for all utilities</p>) :
                        (<p>Tenant pays for all utilities</p>)
                  }
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Pet Policy</span>
                  {
                    post.postDetail.pet === "allowed" ?
                      (<p>Pets are Allowed</p>) :
                        (<p>Pets are not Allowed</p>)
                  }
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Income Policy</span>
                  <p>{post.postDetail.income}</p>
                </div>
              </div>
            </div>

            <p className="title">Room Sizes</p>
            <div className="sizes">
              <div className="size">
                <img src="/size.png" alt="" />
                <span>{post.postDetail.size} sqft</span>
              </div>
              <div className="size">
                <img src="/bed.png" alt="" />
                <span>{post.bedroom} bedroom</span>
              </div>
              <div className="size">
                <img src="/size.png" alt="" />
                <span>{post.bathroom} bathroom</span>
              </div>
            </div>

            <p className="title">Nearby Places</p>
            <div className="listHorizontal">
              <div className="feature">
                <img src="/school.png" alt="" />
                <div className="featureText">
                  <span>School</span>
                  <p>{post.postDetail.school}m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/bus.png" alt="" />
                <div className="featureText">
                  <span>Bus Stop</span>
                  <p>{post.postDetail.bus}m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/restaurant.png" alt="" />
                <div className="featureText">
                  <span>Restaurant</span>
                  <p>{post.postDetail.restaurant}m away</p>
                </div>
              </div>
            </div>
            
            <p className="title">Location</p>
            <div className="mapContainer">
              <Map items={[singlePostData]}/>
            </div>
            <div className="buttons">
              <button>
                <img src="/chat.png" alt="" />
                Send a Message
              </button>
              <button style={{backgroundColor: saved?"#fece51":"white"}}>
                <img src="/save.png" alt="" onClick={handleSave}/>
                {saved ? "Place Saved" : "Save the Place"}
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SinglePage