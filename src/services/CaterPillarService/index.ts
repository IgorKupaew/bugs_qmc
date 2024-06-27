import axios from "axios";
import { Service } from "typedi";
import { makeAutoObservable, runInAction } from "mobx";

import type { IDispenserItem } from "../../types";

const CaterPillar_URL = `${process.env.REACT_APP_SERVER_URL}/Analizer`;

@Service()
export class CaterPillarService {
  constructor() {
    makeAutoObservable(this);
  }

  dispensers: IDispenserItem[] = [];
  isLoading: boolean = false;
  isFirstLoading: boolean = true;
  error: unknown;
  totalCost: number = 0;

  getCaterPillar = async () => {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const data = (await axios.get(CaterPillar_URL)).data;
      runInAction(() => {
        this.totalCost = data[0].value;
      });
    } catch (error) {
      this.error = error;
      console.error("Ошибка запроса", error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
      runInAction(() => {
        if (this.isFirstLoading) this.isFirstLoading = false;
      });
    }
  };
}
