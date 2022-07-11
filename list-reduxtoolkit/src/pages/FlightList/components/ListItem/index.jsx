import './index.css';

const ListItem = ({
  flight
}) => {
  return (
    <div className='list-item'>
      <div className="item-info">
        <div className="airpot-info">
          <div className="from-info">
            <p className="from-time time-font">{flight.fromTime}</p>
            <p className="from-place ellipsis">{flight.fromPlace}</p>
          </div>
          <div className="time-info">
            <p className="howlong">
              <span className="time">{flight.howlong}</span>
            </p>
            <div className="plane-info">
              <div className="arrow-right"></div>
              <span className="plane-info-icon">{flight.stopCity && '转'}</span>
            </div>
            <p>
              <span className="stop-city">{flight.stopCity}</span>
            </p>
          </div>
          <div className="to-info">
            <span className="add-day">{flight.addDay ? `+${flight.addDay}天` : ''}</span>
            <p className="to-time time-font">{flight.toTime}</p>
            <p className="to-place ellipsis">{flight.toPlace}</p>
          </div>
        </div>
        <div className="company-info">
          <span className="company1 ellipsis">{flight.companyInfo}</span>
        </div>
      </div>
      <div className="price1">
        <p className="price-info">
          <span className="price-icon">￥</span>
          <span className="price-number">{flight.price1.price}</span>
        </p>
        {
          flight.price1.moreInfo.map((info, index) => (
            <p key={index} className="more-info" dangerouslySetInnerHTML={{ __html: info }}></p>
          ))
        }
      </div>
    </div>
  )
}

export default ListItem