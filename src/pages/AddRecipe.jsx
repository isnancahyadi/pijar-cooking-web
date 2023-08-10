import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Swal from "sweetalert2";

const AddRecipe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(
    "No selected file. Please select image recipe."
  );
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Recipe";
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_GET_CATEGORY)
      .then((response) => {
        setCategory(response?.data?.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitRecipe = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("image", image);
    formData.append("video", video);
    formData.append("direction", directions);
    formData.append("category", selectedCat);
    formData.append("description", description);

    await axios
      .post(process.env.REACT_APP_RECIPE, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then(() => {
        Swal.fire({
          title: "Add Success",
          text: "Add a recipe success",
          icon: "success",
        }).then(() => {
          navigate("/profile");
          setIsLoading(false);
        });
      })
      .catch(({ response }) => {
        setIsLoading(false);

        const getRes = Object.keys(response?.data?.message);

        let msgProperty = [];

        getRes.map((item, key) => {
          const {
            [item]: { message },
          } = response?.data?.message;

          msgProperty[key] = message;
        });

        Swal.fire({
          title: "Add Recipe Failed",
          text:
            msgProperty.toString().split(".,").join(", ") ??
            "Something wrong with our app",
          icon: "errr",
        });
      });
  };

  return (
    <div className="AddRecipe">
      {/* <!-- Start of add recipe section --> */}
      <section id="form-input-recipe" className="container">
        <div className="row align-items-center justify-content-center">
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="mb-3">
              <label className="form-label">Food Image</label>
              <div
                id="form-file"
                className="align-items-center justify-content-center d-flex"
                onClick={() => document.querySelector(".img-selector").click()}
              >
                <input
                  className="form-control img-selector"
                  type="file"
                  onChange={({ target: { files } }) => {
                    if (files[0]) {
                      setImage(files[0]);
                    }
                    setFileName(files[0].name);
                    setPreview(URL.createObjectURL(files[0]));
                  }}
                  hidden
                />

                {image ? (
                  <img className="img-preview" src={preview} alt={fileName} />
                ) : (
                  <>
                    <FontAwesomeIcon id="ic-image-preview" icon="image" />
                    <p className="text-notes">{fileName}</p>
                  </>
                )}
              </div>
            </div>

            <div className="mb-3">
              <div className="row">
                <div className="col-6">
                  {/* title */}
                  <label className="form-label">Title Food</label>
                  <input
                    type="text"
                    className="input-register form-control"
                    placeholder="Enter title of recipe"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="col-6">
                  {/* category */}
                  <label className="form-label">Food Category</label>
                  <select
                    className="form-select input-register form-control"
                    aria-label="Default select example"
                    onChange={(e) => setSelectedCat(e.target.value)}
                  >
                    <option defaultChecked>-- Select category --</option>
                    {category.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* ingredients */}
            <div className="mb-3">
              <label className="form-label">Ingredients</label>
              <textarea
                className="form-control"
                rows="5"
                placeholder="Enter ingredients of recipe"
                onChange={(e) => setIngredients(e.target.value)}
              ></textarea>
              <small className="text-notes">
                *please use commas (,) and space ( ) to separate ingredient.
                <br />
                i.e. onion, salt, sugar
              </small>
            </div>

            {/* directions */}
            <div className="mb-3">
              <label className="form-label">How to Make</label>
              <textarea
                className="form-control"
                rows="7"
                placeholder="Enter directions of recipe"
                onChange={(e) => setDirections(e.target.value)}
              ></textarea>
              <small className="text-notes">
                *please use semicolon (;) and space ( ) to separate step.
                <br />
                i.e. chop onion; add salt; add sugar
              </small>
            </div>

            {/* link video */}
            <div className="mb-3">
              <label className="form-label">Recipe Video</label>
              <input
                type="text"
                className="input-register form-control"
                placeholder="Enter link video (youtube only)"
                onChange={(e) => setVideo(e.target.value)}
              />
            </div>

            {/* description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="7"
                placeholder="Enter description of recipe"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="d-grid">
              <button
                id="btn-register"
                type="submit"
                className="btn btn-primary btn-lg mt-4"
                onClick={submitRecipe}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </>
                ) : (
                  <>Add Recipe</>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
      {/* <!-- End of add recipe section --> */}
    </div>
  );
};

export default AddRecipe;
