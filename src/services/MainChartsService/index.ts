import { Service } from "typedi";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

import { ReactComponent as AveragerIcon } from "../../assets/icons/averager.svg";
import { ReactComponent as RawMillIcon } from "../../assets/icons/rawMill.svg";

export interface IPoints {
  id: string;
  autoMode: boolean;
  isDirectMode: boolean;
  kh: number;
  n: number;
  p: number;
  khPriority: number;
  nPriority: number;
  pPriority: number;
}

export interface IMeasuredIndexes {
  kh: number;
  n: number;
  p: number;
  time?: string;
}

export type TPoint = "kh" | "n" | "p";

export type TPointPriority = "khPriority" | "nPriority" | "pPriority";

export interface IPlaceSwitcherCard {
  id: string;
  isWorking: boolean;
  Icon: React.FunctionComponent;
  title: string;
}

interface ISliceValue {
  kh: number;
  p: number;
  n: number;
  [key: string]: number;
}

interface IFetchStatus {
  kh: boolean;
  p: boolean;
  n: boolean;
  [key: string]: boolean;
}

interface IMeasuredIndexesArray {
  kh: IMeasuredIndexes[] | [];
  p: IMeasuredIndexes[] | [];
  n: IMeasuredIndexes[] | [];
  [key: string]: IMeasuredIndexes[] | [];
}

const placeSwitcherCardsData: IPlaceSwitcherCard[] = [
  {
    id: "1",
    isWorking: true,
    Icon: AveragerIcon,
    title: "Склад усреднитель",
  },
  {
    id: "2",
    isWorking: false,
    Icon: RawMillIcon,
    title: "Сырьевая мельница",
  },
];

const MAX_CURRENT_VALUE = 360; // Колличество объектов, которое попадает в график одновременно

const SET_DIRECT_MODE_URL = `${process.env.REACT_APP_SERVER_URL}/SetDirectMode/`;
const MEASURED_INDEXES_URL = `${process.env.REACT_APP_SERVER_URL}/MeasuredIndexes`;
const SET_POINTS_URL = `${process.env.REACT_APP_SERVER_URL}/SetPoints`;
const SET_AUTO_MODE_URL = `${process.env.REACT_APP_SERVER_URL}/SetAutoMode/`;
const SET_KH_URL = `${process.env.REACT_APP_SERVER_URL}/SetKh/`;
const SET_P_URL = `${process.env.REACT_APP_SERVER_URL}/SetP/`;
const SET_N_URL = `${process.env.REACT_APP_SERVER_URL}/SetN/`;
const SET_KH_PR_URL = `${process.env.REACT_APP_SERVER_URL}/SetKhPriority/`;
const SET_P_PR_URL = `${process.env.REACT_APP_SERVER_URL}/SetPPriority/`;
const SET_N_PR_URL = `${process.env.REACT_APP_SERVER_URL}/SetNPriority/`;

const setKh = async (value: string | number) => {
  return (await axios.put(SET_KH_URL + value)).data;
};

const setP = async (value: string | number) => {
  return (await axios.put(SET_P_URL + value)).data;
};

const setN = async (value: string | number) => {
  return (await axios.put(SET_N_URL + value)).data;
};

const setKhPriority = async (value: string | number) => {
  return (await axios.put(SET_KH_PR_URL + value)).data;
};

const setPPriority = async (value: string | number) => {
  return (await axios.put(SET_P_PR_URL + value)).data;
};

const setNPriority = async (value: string | number) => {
  return (await axios.put(SET_N_PR_URL + value)).data;
};

@Service()
export class MainChartsService {
  constructor() {
    makeAutoObservable(this);
  }

  measuredIndexes: IMeasuredIndexes | null = null;
  measuredIndexesArray: any = {
    kh: [],
    p: [],
    n: [],
  };
  measuredIndexesArraySlice: IMeasuredIndexesArray = {
    kh: [],
    p: [],
    n: [],
  };

  maxSliceValue: ISliceValue = {
    kh: 10,
    p: 10,
    n: 10,
  };
  minSliceValue: ISliceValue = {
    kh: 0,
    p: 0,
    n: 0,
  };
  fetchStatus: IFetchStatus = {
    kh: true,
    p: true,
    n: true,
  };
  startIndex: number = 0;
  endIndex: number = 0;
  points: IPoints | null = null;
  isLoading: boolean = true;
  isFirstLoading: boolean = true;
  isSecondLoading: boolean = true;
  error: unknown;
  upperGradient: string = "kh";
  sliceGradient: string = "kh";
  chartGradient: string = "kh";
  cards: IPlaceSwitcherCard[] = placeSwitcherCardsData;

  switchActiveDirect = (id: string) => {
    this.cards = this.cards.map((card) => {
      if (card.id === id) {
        return { ...card, isWorking: true };
      }
      return { ...card, isWorking: false };
    });
  };

  setDirect = async () => {
    if (!this.points) {
      console.error("POINTS VALUE IS EQUAL NULL: CAN'T SET NEW DIRECT");
      return;
    }
    try {
      await axios.put(SET_DIRECT_MODE_URL + !this.points!.isDirectMode);
    } catch (error) {
      runInAction(() => {
        this.error = error;
        console.error("Ошибка запроса", error);
      });
    }
  };

  setPoints = async (type: TPoint) => {
    if (!this.points) return;
    if (type === "kh") {
      await setKh(this.points.kh);
    }
    if (type === "n") {
      await setN(this.points.n);
    }
    if (type === "p") {
      await setP(this.points.p);
    }
  };
  setPointsPriority = async () => {
    if (!this.points) return;
    await setKhPriority(this.points.khPriority);
    await setNPriority(this.points.nPriority);
    await setPPriority(this.points.pPriority);
  };

  pointsOnChange = (type: TPoint, value: number | string) => {
    if (type === "kh" && value <= 10 && value >= 0) {
      this.points!.kh = +value;
    }
    if (type === "n" && value <= 10 && value >= 0) {
      this.points!.n = +value;
    }
    if (type === "p" && value <= 10 && value >= 0) {
      this.points!.p = +value;
    }
  };

  pointsPriorityOnChange = (type: string, value: number | string) => {
    if (type === "khPriority") {
      this.points!.khPriority = +value;
    }
    if (type === "nPriority") {
      this.points!.nPriority = +value;
    }
    if (type === "pPriority") {
      this.points!.pPriority = +value;
    }
  };

  getMeasuredIndexes = async (type?: any) => {
    const handleError = (error: any) => {
      runInAction(() => {
        this.error = error;
        console.error("Ошибка запроса", error);
      });
    };

    const updateLoadingStatus = (isLoading: boolean) => {
      runInAction(() => {
        this.isLoading = isLoading;
      });
    };

    try {
      updateLoadingStatus(true);

      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      const seconds = currentTime.getSeconds();
      const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      const data = (await axios.get(MEASURED_INDEXES_URL)).data;

      runInAction(() => {
        data.time = formattedTime;
        this.measuredIndexes = data;
        this.measuredIndexesArray[type] = [...this.measuredIndexesArray[type], this.measuredIndexes];

        if (this.measuredIndexesArray[type].length > 720) {
          this.measuredIndexesArray[type] = this.measuredIndexesArray[type].slice(1);
        }
        const length = this.measuredIndexesArray[type].length;
        if (this.maxSliceValue[type] >= length) {
          this.maxSliceValue[type] = length <= 0 ? 1 : length + 1;
          this.minSliceValue[type] = length - MAX_CURRENT_VALUE < 0 ? 0 : length - MAX_CURRENT_VALUE;
        }
      });
    } catch (error) {
      handleError(error);
    } finally {
      updateLoadingStatus(false);

      runInAction(() => {
        if (this.isFirstLoading) this.isFirstLoading = false;
      });
    }
  };

  setMeasuredIndexesArraySlice = (type: string, value: IMeasuredIndexes[]) => {
    this.measuredIndexesArraySlice[type] = value;
  };

  setSpliceNumberPlus = async (type: string) => {
    if (
      this.minSliceValue[type] > this.measuredIndexesArray[type].length ||
      this.maxSliceValue[type] > this.measuredIndexesArray[type].length
    ) {
      return;
    }
    runInAction(() => {
      this.maxSliceValue[type] = this.maxSliceValue[type] + 5;
      this.minSliceValue[type] = this.minSliceValue[type] + 5;
      this.measuredIndexesArraySlice[type] = this.measuredIndexesArray[type].slice(
        this.minSliceValue[type],
        this.maxSliceValue[type],
      );
      if (this.maxSliceValue[type] >= this.measuredIndexesArray[type].length) {
      }
    });
    if (this.maxSliceValue[type] >= this.measuredIndexesArray[type].length) {
      this.setFetchStatus(type, true);
    }
  };

  setSpliceNumberMinus = async (type: string) => {
    if (this.minSliceValue[type] <= 0) {
      return;
    }
    if (this.minSliceValue[type] <= 5) {
      runInAction(() => {
        this.maxSliceValue[type] = this.maxSliceValue[type] - 1;
        this.minSliceValue[type] = this.minSliceValue[type] - 1;
        this.measuredIndexesArraySlice[type] = this.measuredIndexesArray[type].slice(
          this.minSliceValue[type],
          this.maxSliceValue[type],
        );
      });
    } else {
      runInAction(() => {
        this.maxSliceValue[type] = this.maxSliceValue[type] - 5;
        this.minSliceValue[type] = this.minSliceValue[type] - 5;
        this.measuredIndexesArraySlice[type] = this.measuredIndexesArray[type].slice(
          this.minSliceValue[type],
          this.maxSliceValue[type],
        );
      });
    }
    this.setFetchStatus(type, false);
  };

  setFetchStatus = (type: string, value: boolean) => {
    this.fetchStatus[type] = value;
  };
  getPoints = async () => {
    try {
      runInAction(async () => {
        this.isLoading = true;
        this.points = (await axios.get(SET_POINTS_URL)).data;
        // MOCKS
        // this.points = {
        //   id: "00000000-0000-0000-0000-000000000000",
        //   autoMode: true,
        //   isDirectMode: false,
        //   kh: 1.245,
        //   n: 1.3,
        //   p: 2,
        //   khPriority: 1,
        //   nPriority: 3,
        //   pPriority: 2,
        // };
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        console.error("Ошибка запроса", error);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
      runInAction(() => {
        if (this.isSecondLoading) this.isSecondLoading = false;
      });
    }
  };

  setAutoMode = async (value: "true" | "false") => {
    try {
      runInAction(() => {
        this.points!.autoMode = !this.points?.autoMode;
      });
      await axios.put(SET_AUTO_MODE_URL + value);
    } catch (error) {
      runInAction(() => {
        this.error = error;
        console.error("Ошибка запроса", error);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
        if (this.isSecondLoading) this.isSecondLoading = false;
      });
    }
  };

  setUpperGradientMode = (value: string) => {
    this.upperGradient = value;
  };

  setSliceGradientMode = (value: string) => {
    this.sliceGradient = value;
  };

  setChartGradientMode = (value: string) => {
    this.chartGradient = value;
  };

  setDirectMode = async (value: "true" | "false") => {
    try {
      runInAction(async () => {
        this.isLoading = true;
        this.points = (await axios.put(SET_AUTO_MODE_URL + value)).data;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
        console.error("Ошибка запроса", error);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
        this.getPoints();
      });
      runInAction(() => {
        if (this.isSecondLoading) this.isSecondLoading = false;
      });
    }
  };

  reload = async () => {
    runInAction(() => {
      this.isFirstLoading = true;
      this.points = null;
      this.measuredIndexes = null;
    });
    await this.getPoints();
    await this.getMeasuredIndexes();
  };
}
