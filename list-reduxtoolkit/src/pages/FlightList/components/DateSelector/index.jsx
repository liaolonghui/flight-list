import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import getDate from '../../../../utils/getDate';
import http from '../../../../utils/request';
import './index.css';

// 计算date-list的item长度
const ItemWidth = window.innerWidth / 6;

const showDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const today = getDate(); // 今天的日期
const time = new Date(today).getTime(); // 今天的时间戳

const DateSelector = ({
  isHidden,
  depCity,
  arrCity,
  goDate
}) => {

  // 根据goDate与today的时间差
  const goDateTime = new Date(goDate).getTime();
  const length = (goDateTime - time) / 86400000;
  // 得到列表需要translateX的距离（只有时间差大于2时需要移动）
  // 以及获取多少条date(即dateList的最终长度)
  let translateX = 0;
  if (length > 2) {
    translateX = -((length - 2) * ItemWidth);
  }

  const [dateList, setDateList] = useState([]); // 时间列表

  useEffect(() => {
    let arr = [];
    let firstDateObj = {
      date: today,
      week: '今天',
      price: '查价'
    };
    arr.push(firstDateObj);
    getPrice(firstDateObj);

    async function getPrice(dateObj) { // 传入要查的日期对象，查出的价格赋值给该对象
      const { data } = await http.get('/getPrice', {
        params: {
          depCity,
          arrCity,
          date: dateObj.date
        }
      });
      if (data.code === 'ok' && data.price) {
        dateObj.price = '￥' + data.price;
      }
    }

    // 1 天=86400000 毫秒
    let i = 1;
    for (; i <= length + 5; i++) {
      let dateObj = {
        price: '查价'
      };
      dateObj.date = getDate(time + 86400000 * i);
      dateObj.week = showDay[new Date(dateObj.date).getDay()];
      // 获取价格
      getPrice(dateObj);

      arr.push(dateObj);
    }
    setDateList(arr);
  }, [arrCity, depCity, length]);

  return (
    <section className={`date-selector ${isHidden && 'hidden'}`}>
      <div className='date-bar'>
        <div className='date'>
          <div
            className='date-list'
            style={{
              width: ItemWidth * 5,
              transform: `translateX(${translateX}px)`
            }}
          >
            {
              dateList.length
              && dateList.map((item) => {
                return (
                  <NavLink
                    className={() => goDate === item.date ? 'flight-item active' : 'flight-item'}
                    key={item.date}
                    to={`/flightlist?depCity=${depCity}&arrCity=${arrCity}&goDate=${item.date}`}
                  >
                    <div className="item" data-d={item.date} style={{ width: ItemWidth }}>
                      <div className="item-inner">
                        <p className="d-text">{item.date.slice(-5,)}</p>
                        <p className="d-text">{item.week}</p>
                        <p className="d-text">{item.price}</p>
                      </div>
                    </div>
                  </NavLink>
                )
              })
            }
          </div>
        </div>
        <div className='more-date' style={{ width: ItemWidth }}>
          <i className="iconfont icon-calendar"></i>
          <p>更多日期</p>
        </div>
      </div>
    </section>
  )
}

export default DateSelector