import './PageTitle.css';

function PageTitle() {
    return (
      <div className="pageTitle">
        <div className="pageTitleContent">
          <div className="pageTitleTop">
            <h1>Shop</h1>
          </div>
          <div className="pageTitleBot">
            <p className="pageTitlePath">Home</p>
            <p className="pageTitleSymb">{">"}</p>
            <p className="pageTitleCurrent">Shop</p>
          </div>
        </div>        
      </div>
    );
  }
  
  export default PageTitle;
  