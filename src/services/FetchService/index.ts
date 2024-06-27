import { Service } from "typedi";
import { makeAutoObservable } from "mobx";

@Service()
export class FetchService {
  constructor() {
    makeAutoObservable(this);
  }

  fetchStatus: boolean = true;

  setFetchStatus = (value: boolean) => {
    this.fetchStatus = value;
  };
}
