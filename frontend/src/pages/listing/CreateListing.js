import React, { useEffect, useState } from "react";
import "./CreateListing.css";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const CreateListing = () => {
  const [guests, setGuests] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    listingName: "",
    price: "",
    type: "",
    description: "",
  });

  const location = useLocation();
  const listing = location.state?.listing || null;

  useEffect(() => {
    if (listing) {
      setFormData({
        title: listing.title || "",
        location: listing.location || "",
        listingName: listing.listingName || "",
        price: listing.price || "",
        type: listing.type || "",
        description: listing.description || "",
      });
      setGuests(listing.guests || 1);
      setBedrooms(listing.bedrooms || 1);
      setBeds(listing.beds || 1);
      setBathrooms(listing.bathrooms || 1);
      setAmenities(listing.amenities || []);

      // Ensure images exist before mapping
      if (listing.images && Array.isArray(listing.images)) {
        setPhotos(
          listing.images.map((img) => ({
            name: img,
            url: `http://localhost:5000/${img}`,
          }))
        );
      } else {
        setPhotos([]); // Default empty array if images don't exist
      }
    }
  }, [listing]);

  const hostId = useSelector((state) => state.user._id); // Get host ID from Redux

  const handleUpload = (e) => {
    const newPhotos = Array.from(e.target.files);
    const validPhotos = newPhotos.filter((photo) => {
      if (!photo.type.startsWith("image/")) {
        toast.error(`${photo.name} is not a valid image file`);
        return false;
      }
      if (photo.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error(`${photo.name} is too large`);
        return false;
      }
      return true;
    });
    setPhotos((prevPhotos) => [...prevPhotos, ...validPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPhotos(items);
  };

  const handleRemovePhoto = (indexRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexRemove)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAmenityChange = (e) => {
    setNewAmenity(e.target.value);
  };

  const handleAddAmenity = () => {
    if (newAmenity && !amenities.includes(newAmenity)) {
      setAmenities((prevAmenities) => [...prevAmenities, newAmenity]);
      setNewAmenity(""); // Clear input after adding
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get the token from localStorage
    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("hostId", hostId); // Include hostId
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("listingName", formData.listingName);
    data.append("price", formData.price);
    data.append("type", formData.type);
    data.append("description", formData.description);
    data.append("guests", guests);
    data.append("bedrooms", bedrooms);
    data.append("beds", beds);
    data.append("bathrooms", bathrooms);

    // Append amenities correctly
    amenities.forEach((amenity) => {
      data.append("amenities", amenity); // Directly append each amenity
    });

    // Append all photos
    photos.forEach((photo) => {
      data.append("images", photo); // Append each photo to the FormData
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/accommodations",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      console.log("Accommodation created:", response.data);
      toast.success("Listing created successfully!");
      // Reset form or redirect here
    } catch (error) {
      console.error("Error creating accommodation:", error);
      toast.error("Failed to create listing.");
    }
  };

  return (
    <div>
      <h1 className="heading">Create Listing</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* Input fields for listing details */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="listingName"
            placeholder="Listing name"
            value={formData.listingName}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
            <option value="land">Land</option>
          </select>

          {/* Guest, Bedroom, Bed, and Bathroom Count Sections */}
          <div className="basics">
            <div className="basic">
              <p>Guests</p>
              <div className="basic_count">
                <RemoveCircleOutline
                  onClick={() => guests > 1 && setGuests(guests - 1)}
                  sx={{
                    fontSize: "25px",
                    cursor: "pointer",
                    "&:hover": { color: "#ff354f" },
                  }}
                />
                <p>{guests}</p>
                <AddCircleOutline
                  onClick={() => setGuests(guests + 1)}
                  sx={{
                    fontSize: "25px",
                    cursor: "pointer",
                    "&:hover": { color: "#ff354f" },
                  }}
                />
              </div>
            </div>

            <div className="basic">
              <p>Bedrooms</p>
              <div className="basic_count">
                <RemoveCircleOutline
                  onClick={() => bedrooms > 1 && setBedrooms(bedrooms - 1)}
                  sx={{
                    fontSize: "25px",
                    cursor: "pointer",
                    "&:hover": { color: "#ff354f" },
                  }}
                />
                <p>{bedrooms}</p>
                <AddCircleOutline
                  onClick={() => setBedrooms(bedrooms + 1)}
                  sx={{
                    fontSize: "25px",
                    cursor: "pointer",
                    "&:hover": { color: "#ff354f" },
                  }}
                />
              </div>
            </div>

            <div className="basic">
              <p>Beds</p>
              <div className="basic_count">
                <RemoveCircleOutline
                  onClick={() => beds > 1 && setBeds(beds - 1)}
                  sx={{
                    fontSize: "25px",
                    cursor: "pointer",
                    "&:hover": { color: "#ff354f" },
                  }}
                />
                <p>{beds}</p>
                <AddCircleOutline
                  onClick={() => setBeds(beds + 1)}
                  sx={{
                    fontSize: "25px",
                    cursor: "pointer",
                    "&:hover": { color: "#ff354f" },
                  }}
                />
              </div>
            </div>

            <div className="basic">
              <p>Bathrooms</p>
              <div className="basic_count">
                <RemoveCircleOutline
                  onClick={() => bathrooms > 1 && setBathrooms(bathrooms - 1)}
                  sx={{
                    fontSize: "25px",
                    cursor: "pointer",
                    "&:hover": { color: "#ff354f" },
                  }}
                />
                <p>{bathrooms}</p>
                <AddCircleOutline
                  onClick={() => setBathrooms(bathrooms + 1)}
                  sx={{
                    fontSize: "25px",
                    cursor: "pointer",
                    "&:hover": { color: "#ff354f" },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="amenit">
            <input
              type="text"
              placeholder="Add an amenity"
              value={newAmenity}
              onChange={handleAmenityChange}
            />
            <button type="button" className="add" onClick={handleAddAmenity}>
              Add
            </button>
          </div>
          <div className="amenities-list">
            {amenities.map((amenity, index) => (
              <p key={index}>{amenity}</p>
            ))}
          </div>

          <textarea
            name="description"
            placeholder="Description"
            rows="5"
            cols="10"
            value={formData.description}
            onChange={handleChange}
            required
          />

          {/* Image Upload Section */}
          <div className="uploadImage">
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          multiple
                          onChange={handleUpload}
                          accept="image/*" // Accept image files only
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <PhotoLibraryOutlinedIcon />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                    {photos.map((photo, index) => (
                      <Draggable
                        key={index}
                        draggableId={photo.name || `photo-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="photo"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            {/* Use URL.createObjectURL only for files, otherwise use the string URL */}
                            <img
                              src={
                                photo instanceof File
                                  ? URL.createObjectURL(photo)
                                  : photo.url || photo
                              }
                              alt="Uploaded"
                            />
                            <DeleteOutlineOutlinedIcon
                              onClick={() => handleRemovePhoto(index)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                    {photos.length < 5 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          multiple
                          onChange={handleUpload}
                          accept="image/*" // Accept image files only
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <PhotoLibraryOutlinedIcon />
                          </div>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="create-cancel">
            <button className="create" type="submit">
              Save
            </button>
            <button
              className="cancel"
              type="button"
              onClick={() => {
                setFormData({
                  title: "",
                  location: "",
                  listingName: "",
                  price: "",
                  type: "",
                  description: "",
                });
                setGuests(1);
                setBedrooms(1);
                setBeds(1);
                setBathrooms(1);
                setPhotos([]);
                setAmenities([]);
                setNewAmenity("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateListing;
