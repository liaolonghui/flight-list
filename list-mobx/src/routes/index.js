import { Navigate } from 'react-router-dom';
import FlightList  from '../pages/FlightList';
import getDate from '../utils/getDate';

import mySortord from '../store/sortord';

const date = getDate(); // 今天日期

const routes = [
  {
    path: '/flightlist',
    element: <FlightList mySortord={mySortord} />
  },
  {
    path: '*',
    element: <Navigate to={`/flightlist?depCity=赣州&arrCity=北京&goDate=${ date }`} />
  }
]

export default routes;