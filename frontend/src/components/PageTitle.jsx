import '../styles/PageTitle.css';

function PageTitle( {name} ) {
    return (
      <div className="pageTitle">
        <div className="pageTitleContent">
          <div className="pageTitleTop">
            <h1>{name}</h1>
          </div>
          <div className="pageTitleBot">
            <p className="pageTitlePath">Home</p>
            <p className="pageTitleSymb">{">"}</p>
            <p className="pageTitleCurrent">{name}</p>
          </div>
        </div>        
      </div>
    );
  }
  
  export default PageTitle;
  