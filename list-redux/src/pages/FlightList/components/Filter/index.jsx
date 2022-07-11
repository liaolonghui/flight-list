import { useState } from 'react';
import { connect } from 'react-redux';
import { changeSortord } from '../../../../store/actions';
import './index.css';


const Filter = ({
  isHidden,
  sortord,
  changeSortord
}) => {

  const [sortList, setSortList] = useState([
    { icon: 'filter', text: '筛选' },
    { icon: 'exchange', text: '推荐排序' },
    { icon: 'time', text: '时间' },
    { icon: 'price', text: '价格' }
  ]);

  const handleClick = (e, index) => {
    switch (e.currentTarget.innerText) {
      case "时间":
        changeSortListAndSortord(index, "从早到晚");
        break;
      case "从早到晚":
        changeSortListAndSortord(index, "从晚到早");
        break;
      case "从晚到早":
        changeSortListAndSortord(index, "从早到晚");
        break;
      case "价格":
        changeSortListAndSortord(index, "从低到高");
        break;
      case "从低到高":
        changeSortListAndSortord(index, "从高到低");
        break;
      case "从高到低":
        changeSortListAndSortord(index, "从低到高");
        break;
      case "推荐排序":
        changeSortListAndSortord(index, "推荐排序");
        break;
      default:
        break;
    }
  }
  const changeSortListAndSortord = (index, newVal) => {
    const newSortList = [
      { icon: 'filter', text: '筛选' },
      { icon: 'exchange', text: '推荐排序' },
      { icon: 'time', text: '时间' },
      { icon: 'price', text: '价格' }
    ];
    newSortList[index].text = newVal;
    setSortList(newSortList);
    changeSortord(newVal);
  }

  return (
    <section
      className={`flight-filter ${isHidden && 'hidden'}`}
      style={{
        height: '48px',
      }}
    >
      <ul className='filter-list'>
        {
          sortList.map((item, index) => (
            <li key={item.icon} onClick={(e) => handleClick(e, index)} className={`filter-item ${sortord === item.text ? 'active' : ''}`}>
              <i className={`iconfont icon-${item.icon}`}></i>
              <p>{item.text}</p>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default connect(
  state => ({ sortord: state }),
  { changeSortord }
)(Filter);