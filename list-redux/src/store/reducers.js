import { CHANGE_SORTORD } from "./actionTypes";

// 机票排序方式
export function sortord(state = '推荐排序', action) {
  switch (action.type) {
    case CHANGE_SORTORD:
      return action.sortord
    default:
      return state;
  }
}