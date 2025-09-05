import React, { Suspense, useContext, useEffect } from 'react'
import './profilePage.scss'
import List from '../../components/list/List'
import Chat from '../../components/chat/Chat'
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom'
import apiRequest from '../../lib/apiRequest'
import { AuthContext } from '../../context/AuthContext'

function ProfilePage() {

    const data = useLoaderData();
    
    const navigate = useNavigate();

    const {currentUser, updateUser} = useContext(AuthContext);

    // useEffect(() => {
    //     if (!currentUser) {
    //         navigate("/login");
    //     }
    // }, [currentUser, navigate])

    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/logout");
            updateUser(null);
            navigate("/");
        } catch (error) {
            
        }
    }

  return (
    <div className='profilePage'>
        <div className="details">
            <div className="wrapper">
                <div className="title">
                    <h1>User Information</h1>
                    <Link to={"/profile/update"}>
                        <button>Update Profile</button>
                    </Link>
                </div>
                <div className="info">
                    <span>Avatar: <img src={currentUser.avatar || "/noavatar.jpg"} alt="" /></span>
                    <span>Username: <b>{currentUser.username}</b></span>
                    <span>Email: <b>{currentUser.email}</b></span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <div className="title">
                    <h1>My List</h1>
                    <Link to={"/add"}>
                        <button>Create new post</button>
                    </Link>
                </div>

                <Suspense fallback={<p>Loading...</p>}>
                  <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
                    {(postResponse) => <List posts={postResponse.data.userPosts} />}
                  </Await>
                </Suspense>

                <div className="title">
                    <h1>Saved List</h1>
                </div>
                
                <Suspense fallback={<p>Loading...</p>}>
                    <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
                        {(postResponse) => <List posts = {postResponse.data.savedPosts}/>}
                    </Await>
                </Suspense>

            </div>
        </div>
        <div className="chatContainer">
            <div className="wrapper">
                <Suspense fallback={<p>Loading...</p>}>
                    <Await resolve={data.chatResponse} errorElement={<p>Error loading chats!</p>}>
                        {(chatResponse) => <Chat chats = {chatResponse.data}/>}
                    </Await>
                </Suspense>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage