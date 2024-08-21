import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { ProductTemplate } from "./Product";
import React from "react";
import axios from "axios";
import "../styles/ProductGrid.css";

function ProductGrid() {
  //Hooks
  const [showOptions, setShowOptions] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState("none");
  const [perPage, setPerPage] = React.useState(16);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [endIndex, setEndIndex] = React.useState(1);
  const [productArray, setProductArray] = React.useState([]);
  const [totalProductNumber, setTotalProductNumber] = React.useState(1);

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
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product");
        let { totalProducts, ...rest } = response.data;

        setTotalProductNumber(totalProducts);
        setProductArray(Object.values(rest));
        setTotalPages(Math.ceil(totalProductNumber / perPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [perPage, currentPage, selectedFilter]);

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
                Showing Showing {(currentPage - 1) * perPage + 1} -{" "}
                {Math.min(currentPage * perPage, productArray.length)} of{" "}
                {totalProductNumber} results
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
                <option value={8}>8</option>
                <option value={16}>16</option>
                <option value={24}>24</option>
                <option value={32}>32</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="gridContent">
        {productArray.map((item) => {
          return <ProductTemplate key={item.id} props={item} />;
        })}
      </div>
      <div className="gridPageControler">
        <div className="gridPagination">
          <button
            id="paginationPrev"
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {/* {Array.from(Array(totalPages), (item, index) => {
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
          })} */}
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
