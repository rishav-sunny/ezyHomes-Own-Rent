import React, { useContext, useState } from 'react'
import './card.scss'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import apiRequest from '../../lib/apiRequest'
import { MapPin, Bed, Bath, Save, MessageCircle } from 'lucide-react'

function Card({ item, showEdit = false, onDelete }) {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const isOwner = currentUser?.id === item.userId;

    const handleEdit = (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigate(`/edit/${item.id}`);
    };

    const handleDelete = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (!window.confirm('Are you sure you want to delete this property?')) {
        return;
      }

      setDeleting(true);
      try {
        await apiRequest.delete(`/posts/${item.id}`);
        if (onDelete) {
          onDelete(item.id);
        } else {
          // Reload the page if no callback provided
          window.location.reload();
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete property. Please try again.');
      } finally {
        setDeleting(false);
      }
    };

    const handleBuy = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (!currentUser) {
        navigate('/login');
        return;
      }
      setShowContactModal(true);
    };

    const handleConnectSeller = async () => {
      try {
        await apiRequest.post("/chats", { receiverId: item.userId });
        navigate("/profile");
      } catch (error) {
        console.error('Connect error:', error);
        alert('Failed to connect with seller. Please try again.');
      }
    };

    return (
      <div className="card">
        <Link to={`/${item.id}`} className="imageContainer">
          <img src={item.images[0]} alt="" />
        </Link>
        <div className="textContainer">
          <div className="titleRow">
            <h2 className="title">
              <Link to={`/${item.id}`}>{item.title}</Link>
            </h2>
            {isOwner && showEdit ? (
              <div className="actionButtons">
                <button className="editButton" onClick={handleEdit} disabled={deleting}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.43741 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Edit
                </button>
                <button className="deleteButton" onClick={handleDelete} disabled={deleting}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            ) : !isOwner ? (
              <button className="connectSellerBtn" onClick={handleBuy}>
                <span className="btnText">Connect to Seller</span>
                <span className="btnIcon">→</span>
              </button>
            ) : null}
          </div>
          <p className="address">
            <MapPin size={16} />
            <span>{item.address}</span>
          </p>
          <p className="price">₹ {item.price.toLocaleString()}</p>
          <div className="bottom">
            <div className="features">
              <div className="feature">
                <Bed size={18} />
                <span>{item.bedroom} bedroom</span>
              </div>
              <div className="feature">
                <Bath size={18} />
                <span>{item.bathroom} bathroom</span>
              </div>
            </div>
            <div className="icons">
              <div className="icon">
                <Save size={18} />
              </div>
              <div className="icon">
                <MessageCircle size={18} />
              </div>
            </div>
          </div>
        </div>
        
        {showContactModal && (
          <div className="contactModal" onClick={() => setShowContactModal(false)}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <button className="closeModal" onClick={() => setShowContactModal(false)}>×</button>
              <h3>Connect with Seller</h3>
              <div className="sellerInfo">
                <div className="sellerAvatar">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#fece51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#fece51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4>Property Owner</h4>
                  <p>Interested in this property?</p>
                </div>
              </div>
              <p className="modalText">
                Start a conversation with the seller to discuss this property and get more details.
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
    );
}

export default Card;