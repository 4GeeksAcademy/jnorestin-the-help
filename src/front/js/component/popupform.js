import React, { useState } from "react";

const PopupForm = ({ onSuccess, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      description: description,
      images: images,
    };

    onSuccess(postData); // Pass the postData to the onSubmit callback

    // Reset form fields
    setName("");
    setDescription("");
    setImages([]);
    setActiveIndex(0);

    // Close the form
    onClose();
  };

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <div className="overlay">
        <div className="popup-form">
          <h2>Create Post</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="images">Images:</label>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                onChange={(e) => {
                  const fileList = e.target.files;
                  const newImages = Array.from(fileList).map((file) => ({
                    id: Date.now() + Math.random(),
                    url: URL.createObjectURL(file),
                    file: file
                  }));
                  setImages(newImages);
                  setActiveIndex(0);
                }}
                multiple
              />
            </div>

            <div className="carousel-container">
              <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  {images.map((image, index) => (
                    <div
                      className={`carousel-item ${index === activeIndex ? "active" : ""}`}
                      key={image.id}
                    >
                      <img
                        className="d-block w-100"
                        src={image.url}
                        alt={`Image ${index}`}
                        height={300}
                        width={350}
                      />
                    </div>
                  ))}
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                  onClick={() => {
                    handleSlideChange((activeIndex + images.length - 1) % images.length);
                  }}
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                  onClick={() => {
                    handleSlideChange((activeIndex + 1) % images.length);
                  }}
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>

            <div className="button-group">
              <button type="button" onClick={handleSubmit} className="submit-button">
                Submit
              </button>
              <button onClick={onClose} className="close-button">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;

