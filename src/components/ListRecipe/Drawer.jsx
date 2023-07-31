import React from "react";

const Drawer = ({
  isLoading,
  selectCategory,
  setSelectedCategory,
  listCategory,
}) => {
  return (
    <div className="Drawer">
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        style={{ width: "50vw" }}
      >
        <div className="offcanvas-header">
          <h3 className="offcanvas-title" id="offcanvasNavbarLabel">
            Category
          </h3>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="mt-3 w-100">
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <div
                  className="spinner-grow"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    color: "rgb(215, 154, 255)",
                  }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <label className="radio m-2">
                  <input
                    id="drawer-category-slug"
                    type="radio"
                    name="drawer-category"
                    value=""
                    checked={selectCategory === ""}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    // defaultChecked
                  />
                  <div
                    id="drawer-category-name"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <span>All</span>
                  </div>
                </label>
                {listCategory.map((item, key) => (
                  <label key={key} className="radio m-2">
                    <input
                      id="drawer-category-slug"
                      type="radio"
                      name="drawer-category"
                      value={item?.slug}
                      checked={selectCategory === item?.slug}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    <div
                      id="drawer-category-name"
                      className="d-flex align-items-center justify-content-center"
                    >
                      <span>{item?.name}</span>
                    </div>
                  </label>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
