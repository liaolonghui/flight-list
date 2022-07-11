import ListItem from '../ListItem';
import LoadFail from '../../../../assets/images/load_fail.png';
import './index.css';

const LoadingContent = (
  <section id="m-loading">
    <div className="camel-loading"></div>
    <div className="text">加载中</div>
  </section>
);
const NotFoundContent = (
  <section className='not-fount-flight'>
    <div className='load-fail'>
      <img src={LoadFail} alt="LoadFail" />
    </div>
    <div style={{ color: 'rgb(85, 85, 85)', fontSize: '14px' }}>
      当前搜索无航线，请更换城市重新搜索
    </div>
  </section>
)

const List = ({
  isLoading,
  flightlist
}) => {
  return (
    <div className='list' style={{ minHeight: isLoading || '100vh' }}>
      {
        isLoading
          ? LoadingContent
          : (flightlist && flightlist.length)
            ? flightlist.map(item => (
              <ListItem key={item._id} flight={item} />
            ))
            : NotFoundContent
      }
    </div>
  )
}

export default List