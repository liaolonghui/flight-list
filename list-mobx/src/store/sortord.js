import { action, makeAutoObservable, observable } from 'mobx';

// runInAction

class Sortord {
  sortord = 'ζ¨θζεΊ';

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
