import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { ProductTemplate, productArray } from "./Product";
import React from "react";
import './ProductGrid.css';

function ProductGrid() {
  //Hooks
  const [showOptions, setShowOptions] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState("none");
  const [perPage, setPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(
    Math.ceil(productArray.length / perPage)
  );
  const [endIndex, setEndIndex] = React.useState(currentPage * perPage);

  //Handlers
  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (filter) => {
    setSelectedFilter(filter);
    setShowOptions(false);
  };

  const handlePageClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  React.useEffect(() => {
    //Total Pages hook
    const tp = Math.ceil(productArray.length / perPage);
    setTotalPages(tp);

    //End Index
    setEndIndex(currentPage * perPage);
  }, [perPage, currentPage, selectedFilter]);

  //Array that determines what items should be shown
  let currentItems = [];
  let sortedProducts = [...productArray];
  if (selectedFilter == "price") {
    currentItems = sortedProducts
      .sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/\./g, ""));
        const priceB = parseFloat(b.price.replace(/\./g, ""));
        return priceB - priceA;
      })
      .slice(
        (currentPage - 1) * perPage,
        Math.min(endIndex, productArray.length)
      );
  } else if (selectedFilter == "name") {
    currentItems = sortedProducts
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(
        (currentPage - 1) * perPage,
        Math.min(endIndex, productArray.length)
      );
  } else if (selectedFilter == "none") {
    currentItems = productArray.slice(
      (currentPage - 1) * perPage,
      Math.min(endIndex, productArray.length)
    );
  }

  return (
    <div className="grid">
      <div className="gridControler">
        <div className="gridControlerContent">
          <div className="gccLeft">
            <div className="gccLeftFilter">
              <button className="filterButton" onClick={handleButtonClick}>
                <FontAwesomeIcon className="filterIcon" icon={faSliders} />
                <p className="filterSpecs">Filter</p>
              </button>
              {showOptions && (
                <div className="filter-options">
                  <button onClick={() => handleOptionClick("none")}>
                    {"None"}
                  </button>
                  <button onClick={() => handleOptionClick("name")}>
                    {"Name (A...Z)"}
                  </button>
                  <button onClick={() => handleOptionClick("price")}>
                    {"Price (Higher...Low)"}
                  </button>
                </div>
              )}
            </div>
            <div className="filterInfo">
              <p>
                Showing {(currentPage - 1) * perPage + 1}-
                {Math.min(endIndex, productArray.length)} of{" "}
                {productArray.length} results
              </p>
            </div>
          </div>
          <div className="gccRight">
            <p className="filterSpecs">Show</p>
            <div>
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="gridContent">
        {currentItems.map((item) => {
          return <ProductTemplate key={item.id} props={item} />;
        })}
      </div>
      <div className="gridPageControler">
        <div className="gridPagination">
          {Array.from(Array(totalPages), (item, index) => {
            return (
              <button
                className={`pageNumberBtn ${
                  index + 1 === currentPage ? "active" : ""
                }`}
                key={index + 1}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </button>
            );
          })}
          <button
            id="paginationNext"
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
