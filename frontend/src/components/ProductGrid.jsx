import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { ProductGridTemplate } from "./ProductGridTemplate";
import React, { useRef } from "react";
import axios from "axios";
import "../styles/ProductGrid.css";

function ProductGrid() {
  //Hooks
  const [showOptions, setShowOptions] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState("none");
  const [OrderBy, setOrderBy] = React.useState();
  const [perPage, setPerPage] = React.useState(16);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [productArray, setProductArray] = React.useState([]);
  const [totalProductNumber, setTotalProductNumber] = React.useState(1);
  const scrollToRef = useRef();

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

    setTimeout(() => {
      if (scrollToRef.current) {
        scrollToRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product", {
          params: {
            page: currentPage,
            perPage: perPage,
            filter: selectedFilter,
            sortOrder: OrderBy,
          },
        });

        let { totalProducts, totalPages, ...rest } = response.data;
        setTotalProductNumber(totalProducts);
        setProductArray(Object.values(rest));
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [perPage, currentPage, selectedFilter, totalProductNumber, OrderBy]);

  return (
    <div className="grid">
      <div className="gridControler">
        <div className="gridControlerContent" ref={scrollToRef}>
          <div className="gccLeft">
            <div className="gccLeftFilter">
              <button className="filterButton" onClick={handleButtonClick}>
                <FontAwesomeIcon className="filterIcon" icon={faSliders} />
                <p className="filterSpecs">Filter</p>
              </button>
              {showOptions && (
                <div className="filter-options">
                  <button onClick={() => handleOptionClick("none")}>
                    {"no filter"}
                  </button>
                  <button onClick={() => handleOptionClick("name")}>
                    {"by name"}
                  </button>
                  <button onClick={() => handleOptionClick("price")}>
                    {"by price"}
                  </button>
                  <button onClick={() => handleOptionClick("category")}>
                    {"by category"}
                  </button>
                </div>
              )}
            </div>
            <div className="filterInfo">
              <p>
                Showing {(currentPage - 1) * perPage + 1} -{" "}
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
            <p className="filterSpecs">Order By</p>
            <div>
              <select
                value={OrderBy}
                onChange={(e) => setOrderBy(e.target.value)}
              >
                <option value={"asc"}>Ascending</option>
                <option value={"desc"}>Descending</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="gridContent">
        {productArray.map((item) => {
          return <ProductGridTemplate key={item.id} props={item} />;
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
