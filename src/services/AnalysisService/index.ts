import Container, { Service } from "typedi";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

import type { IDispenserComponent } from "../../types";
import { MainChartsService } from "../MainChartsService";

type IComponentDict = Record<string, Omit<IDispenserComponent, "ts">[]>;

const mainChartsService = Container.get(MainChartsService);
const getPoints = mainChartsService.getPoints.bind(mainChartsService);

const COMPONENT_URL = `${process.env.REACT_APP_SERVER_URL}/Component`;
const SHIFT_URL = `${process.env.REACT_APP_SERVER_URL}/ChangeShift/IsFirstShift=`;

@Service()
export class AnalysisService {
  constructor() {
    makeAutoObservable(this);
  }

  components: IDispenserComponent[] = [];
  shiftComponent: any = {};
  componentsDict: IComponentDict = {};
  componentsArray: IDispenserComponent[] = [];
  isLoading: boolean = false;
  isFirstLoading: boolean = true;
  error: unknown;

  getComponents = async () => {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const data = (await axios.get(COMPONENT_URL)).data;
      runInAction(() => {
        this.shiftComponent = data;
        this.components = this.shiftComponent.components;
      });
      runInAction(() => {
        for (const item of this.components) {
          const key = item.ts.slice(0, item.ts.indexOf("T"));
          if (Array.isArray(this.componentsDict[key])) {
            (this.componentsDict[key] as IDispenserComponent[]).push(item);
            continue;
          }
          this.componentsDict[key] = [item];
        }
      });
    } catch (error) {
      this.error = error;
      console.error("Ошибка запроса", error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
        if (this.isFirstLoading) this.isFirstLoading = false;
      });
    }
  };

  resetComponents = async () => {
    runInAction(() => {
      this.componentsDict = {};
      this.components = [];
      this.componentsArray = [];
    });
    await getPoints();
    await this.getComponents();
  };

  clearComponents = () => {
    this.componentsDict = {};
    this.components = [];
    this.componentsArray = [];
  };

  changeDateOfComponents = (prevDate: string, newDate: string) => {
    const currentDateComponents: IDispenserComponent[] = this.components.filter((item) => {
      return item.ts.split("T")[0] === prevDate;
    });
    const newComponentsArray: IDispenserComponent[] = [];
    currentDateComponents.forEach((componentWithPrevDate) => {
      newComponentsArray.push({ ...componentWithPrevDate, ts: newDate });
    });

    this.componentsArray = newComponentsArray;
  };

  changeComponentsName = (date: string, name: string, value: string | number) => {
    [...this.componentsDict[date]].forEach((currentSubstance) => {
      currentSubstance[name as keyof Omit<IDispenserComponent, "ts">] = value as never;
      this.componentsArray.push(currentSubstance as IDispenserComponent);
    });

    const unique = new Set();
    this.componentsArray = this.componentsArray.filter((item: IDispenserComponent) => {
      if (!unique.has(item.id)) {
        unique.add(item.id);
        return true;
      }
      return false;
    });
  };

  changeComponents = (date: string, name: string, value: string | number, id: string) => {
    const target = [...this.componentsDict[date]].find((item) => item.id === id);

    if (target) {
      target[name as keyof Omit<IDispenserComponent, "ts">] = value as never;
      this.componentsArray.push(target as IDispenserComponent);
    }

    const unique = new Set();
    this.componentsArray = this.componentsArray.filter((item: IDispenserComponent) => {
      if (!unique.has(item.id)) {
        unique.add(item.id);
        return true;
      }
      return false;
    });
  };

  setComponents = async () => {
    if (this.componentsArray.length === 0) {
      console.log("values are empty");
      return;
    }
    for (const object of this.componentsArray) {
      try {
        await axios.put(COMPONENT_URL, object);
        this.isLoading = true;
      } catch (error) {
        this.error = error;
        console.error("Ошибка запроса", error);
      } finally {
        this.isLoading = false;
      }
    }
    await this.resetComponents();
  };

  shiftToOne = async () => {
    if (this.shiftComponent.isFirstShift) {
      return;
    }
    try {
      this.isLoading = true;
      await axios.put(SHIFT_URL + true);
    } catch (error) {
      this.error = error;
      console.error("Ошибка запроса", error);
    } finally {
      this.isLoading = false;
    }
    await this.resetComponents();
  };

  shiftToTwo = async () => {
    if (!this.shiftComponent.isFirstShift) {
      return;
    }
    try {
      this.isLoading = true;
      await axios.put(SHIFT_URL + false);
    } catch (error) {
      this.error = error;
      console.error("Ошибка запроса", error);
    } finally {
      this.isLoading = false;
    }
    await this.resetComponents();
  };
}
