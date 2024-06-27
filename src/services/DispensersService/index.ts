import Container, { Service } from "typedi";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

import { IDispenserComponent, IDispenserItem } from "../../types";

import { CurrentPersonService } from "../CurrentPersonService";
import { MainChartsService } from "../MainChartsService";

interface IDispenserPlace {
  label: string | undefined | null;
  id: string;
  number: number;
}

const mainChartsService = Container.get(MainChartsService);
const currentPersonService = Container.get(CurrentPersonService);

const setPointsPriority = mainChartsService.setPointsPriority.bind(mainChartsService);
const getPoints = mainChartsService.getPoints.bind(mainChartsService);

const DISPENSERS_URL = `${process.env.REACT_APP_SERVER_URL}/Dispenser`;
const COMPONENT_ID_URL = `${process.env.REACT_APP_SERVER_URL}/Dispenser?componentId=`;
const NUMBER_URL = `${process.env.REACT_APP_SERVER_URL}/Dispenser?number=`;

const DISPENSERS_COUNT = 4;
@Service()
export class DispensersService {
  constructor() {
    makeAutoObservable(this);
  }

  dispenserComponent: any = {};
  dispensersList: IDispenserItem[] = [];
  private _dispensersPlaces: IDispenserPlace[] = [];
  isLoading: boolean = false;
  isFirstLoading: boolean = true;
  error: unknown;

  switchDispenserNumbers = (first: number, second: number) => {
    runInAction(() => {
      const firstDispenser = this.dispensersList.find((dispenser) => dispenser.number === first)!;
      const secondDispenser = this.dispensersList.find((dispenser) => dispenser.number === second)!;
      [firstDispenser.component, secondDispenser.component] = [secondDispenser.component, firstDispenser.component];

      const placesCopy = [...this.dispensersPlaces];

      const firstPlace = placesCopy.find((el: IDispenserPlace) => el.number === first)!;
      const secondPlace = placesCopy.find((el: IDispenserPlace) => el.number === second)!;

      [firstPlace.label, secondPlace.label] = [secondPlace.label, firstPlace.label];
      [firstPlace.id, secondPlace.id] = [secondPlace.id, firstPlace.id];

      this.dispensersPlaces = placesCopy;
    });
  };

  switchComponent = (value: IDispenserComponent | undefined, id: string) => {
    runInAction(() => {
      this.dispenserComponent = value;
      const item: any = this.dispensersList.find((el) => el.id === id);
      item.component = this.dispenserComponent;
      this.dispenserComponent = item.component;
    });
  };

  clearDispenserList = () => {
    this.dispensersList = [];
  };

  setHumidity = (el: IDispenserItem, value: string) => {
    if (!el.component) {
      console.error("THE DISPENSER HAVE NO COMPONENT. A HUMIDITY FIELD CAN'T BE SET");
      return;
    }
    el.component.humidity = +value;
    el.component.dutyName = currentPersonService.name;

    try {
      runInAction(async () => {
        this.isLoading = true;
        await axios.put(DISPENSERS_URL, el);
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
    }
  };

  changeHumidity = (id: string, value: string) => {
    const current = this.dispensersList.find((el) => el.id === id)!;

    if (current.component && +value >= 0 && +value <= 10) {
      current.component.humidity = +value;
      return;
    }

    console.error("THE DISPENSER HAVE NO COMPONENT. A HUMIDITY FIELD CAN'T BE CHANGED");
  };

  changeQMCPoint = (id: string, value: string) => {
    const current = this.dispensersList.find((el) => el.id === id)!;
    if (+value >= 0 && +value <= 100) {
      current.qmcSetPoint = +value;
    }
  };

  changeIsCalc = (id: string, value: boolean) => {
    const current = this.dispensersList.find((el) => el.id === id)!;
    current.shouldBeIncludedToCalc = value;
    this.dispensersList = [...this.dispensersList];
  };

  changeTitle = (id: string, value: string) => {
    const current = this.dispensersList.find((el) => el.id === id)!;
    current.title = value;
    this.dispensersList = [...this.dispensersList];
  };

  getDispensers = async () => {
    try {
      this.isLoading = true;
      this.dispensersPlaces = [];
      const result: any = [];
      for (let i = 1; i <= DISPENSERS_COUNT; i++) {
        const current: IDispenserItem = (await axios.get(NUMBER_URL + i)).data;
        runInAction(() => {
          this.dispensersPlaces.push({
            label: current.component?.title === null ? "Материал" : current.component?.title,
            id: current.id,
            number: current.number,
          });
          result.push(current);
        });
      }
      runInAction(() => {
        this.dispensersList = result;
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
        if (this.isFirstLoading) this.isFirstLoading = false;
      });
    }
  };

  changeShouldBeincludedToCalc = (el: IDispenserItem) => {
    if (!el.component) {
      console.error("THE DISPENSER HAVE NO COMPONENT. A SHOULDBEINCLUDEDTOCALC FIELD CAN'T BE CHANGED");
      return;
    }
    el.shouldBeIncludedToCalc = !el.shouldBeIncludedToCalc;
    el.component.dutyName = currentPersonService.name;
    try {
      runInAction(async () => {
        this.isLoading = true;
        await axios.put(DISPENSERS_URL, el);
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
    }
  };

  setQMCPoint = (el: IDispenserItem, value: string) => {
    if (!el.component) {
      console.error("THE DISPENSER HAVE NO COMPONENT. A QMCSETPOINT FIELD CAN'T BE CHANGED");
      return;
    }
    el.qmcSetPoint = +value;
    el.component.dutyName = currentPersonService.name;
    try {
      runInAction(async () => {
        this.isLoading = true;
        await axios.put(DISPENSERS_URL, el);
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
    }
  };

  changeSubstance = (id: string, name: string, value: number) => {
    const currentSubstance = this.dispensersList.find((item) => item.id === id);
    if (currentSubstance?.component && name in currentSubstance.component) {
      currentSubstance[name as keyof IDispenserItem] = value as never;
    }
  };

  private setSubstance = (el: IDispenserItem) => {
    const copy = Object.assign({}, el);
    delete copy.component;
    try {
      runInAction(async () => {
        this.isLoading = true;
        await axios.put(COMPONENT_ID_URL + el.component?.id, copy);
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
    }
  };

  setSupplies = async () => {
    for (let i = 0; i < this.dispensersList.length; i++) {
      this.setSubstance(this.dispensersList[i]);
    }
    await setPointsPriority();
    await this.clearDispenserList();
    await getPoints();
    await this.getDispensers();
  };
  setSupp = async () => {
    for (let i = 0; i < this.dispensersList.length; i++) {
      this.setSubstance(this.dispensersList[i]);
    }
  };

  get dispensersPlaces() {
    return this._dispensersPlaces;
  }

  set dispensersPlaces(value: typeof this._dispensersPlaces) {
    this._dispensersPlaces = value;
  }
}
