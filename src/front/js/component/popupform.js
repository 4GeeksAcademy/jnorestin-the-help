import React, { useState } from "react";

const PopupForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [postImages, setPostImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process form data
    console.log("Name:", name);
    console.log("Text Input:", text);
    console.log("Date:", date);
    console.log("Location:", location);
    console.log("Post Images:", postImages);

    // Reset form fields
    setName("");
    setText("");
    setDate("");
    setLocation("");
    setPostImages([]);

    // Close the form
    onClose();
  };

  return (
    <div>
      <div className="overlay">
        <div className="popup-form">
          <h2>Pop-up Form</h2>
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="post-images">Post Images:</label>
              <input
                type="file"
                id="post-images"
                name="post-images"
                multiple
                onChange={(event) => {
                  if (event.target.files && event.target.files.length > 0) {
                    const filesArray = Array.from(event.target.files);
                    setPostImages(filesArray.slice(0, 3)); // Limit to 3 images
                  }
                }}
              />
            </div>

            <div className="carousel-container">
              <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  {postImages.length > 0 ? (
                    postImages.map((image, index) => (
                      <div
                        className={index === 0 ? "carousel-item active" : "carousel-item"}
                        key={index}
                      >
                        <img
                          className="d-block w-100"
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index}`}
                          height={300}
                          width={350}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="carousel-item active">
                      <img
                        className="d-block w-100"
                        src="https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                        alt="Default placeholder"
                        height={300}
                        width={350}
                      />
                    </div>
                  )}
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="text">Text Input:</label>
              <input
                type="text"
                id="text"
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="button-group">
              <input type="submit" value="Submit" className="submit-button" />
              <button onClick={onClose} className="close-button">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;




