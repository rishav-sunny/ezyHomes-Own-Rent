import React, { useContext, useState, Suspense } from 'react'
import './singlePage.scss'
import Slider from '../../components/slider/Slider'
import { singlePostData } from '../../lib/dummydata'
import Map from '../../components/map/Map'
import { useNavigate, useLoaderData, Await } from 'react-router-dom'
import DOMPurify from "dompurify"
import { AuthContext } from '../../context/AuthContext'
import apiRequest from '../../lib/apiRequest'
import { MapPin, Wrench, PawPrint, DollarSign, Maximize2, Bed, Bath, School, Bus, UtensilsCrossed, MessageCircle, Save, ShoppingCart } from 'lucide-react'

const SinglePage = () => {
  const data = useLoaderData();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className='singlePage'>
      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={data.postResponse}
          errorElement={<p>Error loading post!</p>}
        >
          {(postResponse) => <PostContent post={postResponse.data} currentUser={currentUser} navigate={navigate} />}
        </Await>
      </Suspense>
    </div>
  );
};

const PostContent = ({ post, currentUser, navigate }) => {
  const [saved, setSaved] = useState(post.isSaved);
  const [showContactModal, setShowContactModal] = useState(false);
  const isOwner = currentUser?.id === post.userId;

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    setSaved((prev) => !prev);

    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (error) {
      console.log(error);
      setSaved((prev) => !prev);
    }
  };

  const handleBuy = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setShowContactModal(true);
  };

  const handleConnectSeller = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      const res = await apiRequest.post("/chats", { receiverId: post.userId });
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    try {
      const res = await apiRequest.post("/chats", { receiverId: post.userId });
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <MapPin size={18} />
                  <span>{post.address}</span>
                </div>
                <div className="price">₹ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user?.avatar || "/noavatar.jpg"} alt="" />
                <span>{post.user?.username || "Unknown User"}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail?.desc || ""),
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
              <Wrench size={24} color="#fece51" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail?.utilities === "owner" ? (
                  <p>Owner pays for all utilities</p>
                ) : (
                  <p>Tenant pays for all utilities</p>
                )}
              </div>
            </div>
            <div className="feature">
              <PawPrint size={24} color="#fece51" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail?.pet === "allowed" ? (
                  <p>Pets are Allowed</p>
                ) : (
                  <p>Pets are not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <DollarSign size={24} color="#fece51" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail?.income}</p>
              </div>
            </div>
          </div>

          <p className="title">Room Sizes</p>
          <div className="sizes">
            <div className="size">
              <Maximize2 size={24} color="#fece51" />
              <span>{post.postDetail?.size} sqft</span>
            </div>
            <div className="size">
              <Bed size={24} color="#fece51" />
              <span>{post.bedroom} bedroom</span>
            </div>
            <div className="size">
              <Bath size={24} color="#fece51" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>

          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <School size={24} color="#fece51" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetail?.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <Bus size={24} color="#fece51" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail?.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <UtensilsCrossed size={24} color="#fece51" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail?.restaurant}m away</p>
              </div>
            </div>
          </div>

          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            {!isOwner && (
              <button className="buyButton" onClick={handleBuy}>
                <ShoppingCart size={20} />
                Buy Now
              </button>
            )}
            <button onClick={handleSendMessage}>
              <MessageCircle size={18} />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{ backgroundColor: saved ? "#fece51" : "white" }}
            >
              <Save size={18} />
              {saved ? "Place Saved" : "Place the Save"}
            </button>
          </div>
          
          {showContactModal && (
            <div className="contactModal" onClick={() => setShowContactModal(false)}>
              <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <button className="closeModal" onClick={() => setShowContactModal(false)}>×</button>
                <h3>Connect with Seller</h3>
                <div className="sellerInfo">
                  <img src={post.user?.avatar || "/noavatar.jpg"} alt="" />
                  <div>
                    <h4>{post.user?.username || "Unknown User"}</h4>
                    <p>Property Owner</p>
                  </div>
                </div>
                <p className="modalText">
                  Would you like to start a conversation with the seller to discuss this property?
                </p>
                <div className="modalButtons">
                  <button className="connectBtn" onClick={handleConnectSeller}>
                    Connect with Seller
                  </button>
                  <button className="cancelBtn" onClick={() => setShowContactModal(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SinglePage;