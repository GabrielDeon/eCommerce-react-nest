import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faAward,
  faBoxesStacked,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import './InfoQuality.css'

function InfoQuality() {
  return (
    <div className="infoQuality">
      <div className="infoQualityContent">
        <div className="infoQualityItem">
          <div>
            <FontAwesomeIcon className="infoQualityIcon" icon={faTrophy} />
          </div>
          <div className="infoQualityText">
            <h1> High Quality</h1>
            <p>Crafted from top materials</p>
          </div>
        </div>
        <div className="infoQualityItem">
          <div>
            <FontAwesomeIcon className="infoQualityIcon" icon={faAward} />
          </div>
          <div className="infoQualityText">
            <h1>Warranty Protection</h1>
            <p>Over 2 years</p>
          </div>
        </div>
        <div className="infoQualityItem">
          <div>
            <FontAwesomeIcon className="infoQualityIcon" icon={faBoxesStacked} />
          </div>
          <div className="infoQualityText">
            <h1>Free Shipping</h1>
            <p>Order over $150</p>
          </div>
        </div>
        <div className="infoQualityItem">
          <div>
            <FontAwesomeIcon className="infoQualityIcon" icon={faHeadset} />
          </div>
          <div className="infoQualityText">
            <h1>24 / 7 Suport</h1>
            <p>Dedicated Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoQuality;
