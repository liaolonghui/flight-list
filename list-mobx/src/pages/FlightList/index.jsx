import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import DateSelector from './components/DateSelector';
import Filter from './components/Filter';
import List from './components/List';
import http from '../../utils/request';

import './index.css';

const FlightList = ({
  mySortord
}) => {

  const { sortord } = mySortord;

  const [query] = useSearchParams();
  const depCity = query.get('depCity'); // 出发地
  const arrCity = query.get('arrCity'); // 目的地
  const goDate = query.get('goDate'); // 当前选中日期


  const [isLoading, setIsLoading] = useState(true); // 是否加载中
  const [flightlist, setFlightlist] = useState([]); // 航班列表
  const [isHidden, setIsHidden] = useState(false); // 控制时间选择器和筛选栏的显隐
  const [toTopIsHidden, settoTopIsHidden] = useState(true); // 控制to-top的显隐

  useEffect(() => {

    // 选中的时间改变就重新获取flightlist
    setFlightlist([]);
    setIsLoading(true);

    // 要根据depCity，arrCity，date，sort等获取数据
    async function getFlightlist() {
      const { data } = await http.get('/getFlightlist', {
        params: {
          depCity,
          arrCity,
          goDate,
          sortord
        }
      });
      setIsLoading(false);
      if (data.code === 'ok' && data.flightlist.length) {
        setFlightlist(data.flightlist);
      }
    }
    getFlightlist();

  }, [arrCity, depCity, goDate, sortord]);

  useEffect(() => {
    let hiddenTimer = null; // 取消隐藏的timer
    let scrollFlag = true; // 节流用
    window.onscroll = () => {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop === 0) setIsHidden(false);
      if (!scrollFlag) return;
      scrollFlag = false;
      clearTimeout(hiddenTimer);
      hiddenTimer = null;

      // 如果滚动距离大于104px就显示一键到顶的按钮
      if (scrollTop > 104) {
        settoTopIsHidden(false);
      } else {
        settoTopIsHidden(true);
      }

      if (scrollTop !== 0) {
        setIsHidden(true);
      }

      hiddenTimer = setTimeout(() => {
        setIsHidden(false);
      }, 500);
      setTimeout(() => { // 每100ms只执行1次
        scrollFlag = true;
      }, 100);
    }
    return () => {
      window.onscroll = null;
      clearTimeout(hiddenTimer);
      hiddenTimer = null;
    };
  }, []);

  return (
    <div className='flight-list' style={{ backgroundColor: flightlist.length ? '#efefef' : '#fff' }}>

      {/* header */}
      <header className='header'>
        <div className='active-left iconfont icon-left'></div>
        <div className='flight-title'>
          <span>{depCity}</span>
          <i className='iconfont icon-swap-right'></i>
          <span>{arrCity}</span>
        </div>
        <div className='active-search iconfont icon-search'></div>
      </header>

      {/* date selector */}
      <DateSelector isHidden={isHidden} arrCity={arrCity} depCity={depCity} goDate={goDate} />

      {/* list */}
      <List isLoading={isLoading} flightlist={flightlist} />

      {/* filter */}
      <Filter isHidden={isHidden} mySortord={mySortord} />

      {/* toTop */}
      <div onClick={() => window.scrollTo(0, 0)} className={`to-top ${toTopIsHidden ? 'hidden' : ''}`}>
        <div className='top-line'></div>
        <div className='middle-line'></div>
        <span className='bottom-line'>顶部</span>
      </div>

    </div >
  )
}

export default observer(FlightList);