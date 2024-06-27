import axios from "axios";
import { Service } from "typedi";
import { makeAutoObservable, runInAction } from "mobx";

import { ITrendItem } from "../../types";
import { trendMocks } from "../../pages/TrendsPage/mocks";

const Trends_URL = `${process.env.REACT_APP_SERVER_URL}/History/GetHistory?EndDate=`;

@Service()
export class TrendsService {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading: boolean = false;
  error: unknown;
  trends: ITrendItem[] = [];
  currentDate: string = new Date().toISOString();

  moveDateByMilliseconds = (milliseconds: number, direction: "forward" | "back"): void => {
    const currentTimestamp = new Date(this.currentDate).getTime();
    const newTimestamp = direction === "forward" ? currentTimestamp + milliseconds : currentTimestamp - milliseconds;

    const newDate = new Date(newTimestamp).toISOString();

    if (direction === "forward" && newTimestamp > Date.now()) {
      console.error("Cannot move back further than the current date.");
      return;
    }

    this.currentDate = newDate;
  };

  getAllTrends = async () => {
    // === [MOCKS] === \\
    if (process.env.REACT_APP_MOCKS === "TRUE") {
      this.trends = trendMocks;
      return;
    }
    // === [MOCKS] === \\
    runInAction(() => {
      this.isLoading = true;
    });
    try {
      const { data }: { data: ITrendItem[] } = await axios.get(Trends_URL + this.currentDate);
      runInAction(() => {
        this.trends = data;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}
