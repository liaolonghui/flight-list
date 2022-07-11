import { action, makeAutoObservable, observable } from 'mobx';

// runInAction

class Sortord {
  sortord = '推荐排序';

  constructor() {
    makeAutoObservable(this, {
      sortord: observable,
      changeSortord: action
    });
  }

  changeSortord(sortord) {
    this.sortord = sortord;
  }

}

export default new Sortord();
