import { useState, useEffect } from "react";
import "./editPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate, useParams } from "react-router-dom";

function EditPostPage() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [post, setPost] = useState(null);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await apiRequest.get(`/posts/${id}`);
        setPost(res.data);
        setImages(res.data.images || []);
        setValue(res.data.postDetail?.description || "");
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to load property");
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/posts/${id}`, {
        postData:{
          title: inputs.title,
          price: parseInt(inputs.price),
          images: images,
          address: inputs.address,
          city: inputs.city,
          state: inputs.state,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
        },
        postDetail: {
          description: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        }
      });
      console.log("Update successful:", res.data);
      navigate("/"+id);
    } catch (error) {
      console.error("Update error:", error);
      setError(error.response?.data?.message || error.message || "An error occurred")
    }
  }

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      await apiRequest.delete(`/posts/${id}`);
      alert('Property deleted successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Delete error:', error);
      setError(error.response?.data?.message || 'Failed to delete property');
      setDeleting(false);
    }
  };

  if (loading) return <div className="editPostPage"><p>Loading...</p></div>;
  if (error && !post) return <div className="editPostPage"><p>{error}</p></div>;

  return (
    <div className="editPostPage">
      <div className="formContainer">
        <h1>Edit Property</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" defaultValue={post?.title} required />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" defaultValue={post?.price} required />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" defaultValue={post?.address} required />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value}/>
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" defaultValue={post?.city} required />
            </div>
            <div className="item">
              <label htmlFor="state">State</label>
              <input id="state" name="state" type="text" defaultValue={post?.state} />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" defaultValue={post?.bedroom} required />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" defaultValue={post?.bathroom} required />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" defaultValue={post?.latitude} required />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" defaultValue={post?.longitude} required />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" defaultValue={post?.type}>
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="property">Property</label>
              <select name="property" defaultValue={post?.property}>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities" defaultValue={post?.postDetail?.utilities}>
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet" defaultValue={post?.postDetail?.pet}>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
                defaultValue={post?.postDetail?.income}
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" defaultValue={post?.postDetail?.size} />
            </div>
            <div className="item">
              <label htmlFor="school">School (distance in m)</label>
              <input min={0} id="school" name="school" type="number" defaultValue={post?.postDetail?.school} />
            </div>
            <div className="item">
              <label htmlFor="bus">Bus (distance in m)</label>
              <input min={0} id="bus" name="bus" type="number" defaultValue={post?.postDetail?.bus} />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant (distance in m)</label>
              <input min={0} id="restaurant" name="restaurant" type="number" defaultValue={post?.postDetail?.restaurant} />
            </div>
            <div className="buttonGroup">
              <button type="submit" className="sendButton" disabled={deleting}>Update Property</button>
              <button type="button" className="deleteButton" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete Property'}
              </button>
            </div>
            {error && <span className="error">{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        <div className="imagesContainer">
          {images.map((image, index) => (
            <div key={index} className="imageWrapper">
              <img src={image} alt="" />
              <button 
                type="button" 
                className="removeButton" 
                onClick={() => handleRemoveImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "lamadev",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default EditPostPage;
