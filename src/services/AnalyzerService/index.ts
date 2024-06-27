import { makeAutoObservable, runInAction } from "mobx";
import { Service } from "typedi";
import axios from "axios";

import { getFormattedDate } from "../../helpers/getFormattedDate";

import { specificValues } from "./consts";

interface IAnalyzerItem {
  name: string;
  value: number | string | null;
}

const ANALIZER_URL = `${process.env.REACT_APP_SERVER_URL}/Analizer`;

@Service()
export class AnalyzerService {
  constructor() {
    makeAutoObservable(this);
  }

  AnalyzerItems: IAnalyzerItem[] = [];
  ts: string = "нет данных";
  totalLinePerfSPInPerc: number | null = null;
  totalWeight: number | null = null;
  totalActualLinePerf: number | null = null;
  moisture: number | null = null;
  analizerStatus: string = "";
  isLoading: boolean = false;
  isFirstLoading: boolean = true;
  error: unknown;

  getAnalyzerItems = async () => {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const data: IAnalyzerItem[] = [...(await axios.get(ANALIZER_URL)).data];
      const ts = data.find((item) => item.name === "TS");
      const totalLinePerfSPInPerc = data.find((item) => item.name === "TotalLinePerfSPInPerc");
      const totalWeight = data.find((item) => item.name === "TotalWeight");
      const totalActualLinePerf = data.find((item) => item.name === "TotalActualLinePerf");
      const analizerStatus = data.find((item) => item.name === "AnalizerStatus");
      const moisture = data.find((item) => item.name === "Moisture");

      runInAction(() => {
        if (ts) {
          this.ts = getFormattedDate(String(ts.value));
        }
        if (totalLinePerfSPInPerc && totalLinePerfSPInPerc.value) {
          this.totalLinePerfSPInPerc = +totalLinePerfSPInPerc.value;
        }
        if (totalWeight && totalWeight.value) {
          this.totalWeight = +totalWeight.value;
        }
        if (totalActualLinePerf && totalActualLinePerf.value) {
          this.totalActualLinePerf = +totalActualLinePerf.value;
        }
        if (analizerStatus && analizerStatus.value) {
          this.analizerStatus = String(analizerStatus.value);
        }
        if (moisture && moisture.value) {
          this.moisture = +moisture.value;
        }
        this.AnalyzerItems = [...data.filter(({ name }) => !specificValues.includes(name))];
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
