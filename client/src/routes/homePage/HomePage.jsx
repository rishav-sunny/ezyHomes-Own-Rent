import { useContext, useEffect, useState } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";
import Card from "../../components/card/Card";
import apiRequest from "../../lib/apiRequest";

function HomePage() {
  const {currentUser} = useContext(AuthContext);
  const [latestProperties, setLatestProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProperties = async () => {
      try {
        const response = await apiRequest.get("/posts?limit=20");
        setLatestProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching latest properties:", error);
        setLoading(false);
      }
    };

    fetchLatestProperties();
  }, []);

  const handleDeleteProperty = (deletedId) => {
    setLatestProperties(prev => prev.filter(prop => prop.id !== deletedId));
  };

  return (
    <div className="homePage">
      <div className="heroSection">
        <div className="textContainer">
          <div className="wrapper">
            <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
            <p>
            Your journey to finding the perfect property begins here. Search below to find the home that matches your dreams.


            </p>
            <SearchBar />
            <div className="boxes">
              <div className="box">
                <h1>16+</h1>
                <h2>Years of Experience</h2>
              </div>
              <div className="box">
                <h1>200</h1>
                <h2>Award Gained</h2>
              </div>
              <div className="box">
                <h1>2000+</h1>
                <h2>Property Ready</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="imgContainer">
          <img src="/bg.png" alt="" />
        </div>
      </div>
      
      {/* Latest Properties Section */}
      <div className="latestProperties">
        <div className="wrapper">
          <div className="sectionTitleContainer">
            <h2 className="sectionTitle">Explore New Properties</h2>
            <div className="titleUnderline"></div>
          </div>
          {loading ? (
            <p>Loading properties...</p>
          ) : latestProperties.length > 0 ? (
            <div className="propertyGrid">
              {latestProperties.map((property) => (
                <Card key={property.id} item={property} showEdit={true} onDelete={handleDeleteProperty} />
              ))}
            </div>
          ) : (
            <p>No properties available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;