import Container, { Service } from "typedi";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

import { CurrentPersonService } from "../CurrentPersonService";

import { brokenIndexes, MockArchivedPiles, MockPiles, MockWarehouses } from "./mocks";

import type { IWarehouseItem, IPile, IIndexes, IArchivedPile } from "../../types";

export interface IComposition {
  siO2: number;
  al2O3: number;
  fe2O3: number;
  caO: number;
  mgO: number;
  sO3: number;
  kh: number;
  n: number;
  p: number;
  c3S: number;
  c2S: number;
  c3A: number;
  c4AF: number;
  tonnage: number;
  layer: number;
  row: number;
  meter_group: number;
}

interface IStacker {
  meter: number;
  row: number;
  layer: number;
}

const currentPersonService = Container.get(CurrentPersonService);

const GET_PILE_URL = `${process.env.REACT_APP_SERVER_URL}/PileComposition/GetPileComposition?`;
const GET_AGGREGATED_PILE_URL = `${process.env.REACT_APP_SERVER_URL}/PileComposition/GetAggregatedPileComposition?`;
const GET_INDEXES_URL = `${process.env.REACT_APP_SERVER_URL}/PileComposition/GetIndexes?`;
const GET_ALL_URL = `${process.env.REACT_APP_SERVER_URL}/GetAll`;
const DELETE_URL = `${process.env.REACT_APP_SERVER_URL}/Delete?id=`;
const GET_NUMBER_URL = `${process.env.REACT_APP_SERVER_URL}/Pile`;
const PILE_URL = `${process.env.REACT_APP_SERVER_URL}/Pile`;
const ARCHIVE_PILE_URL = `${process.env.REACT_APP_SERVER_URL}/Pile/GetArchivedPiles`;
const CREATE_URL = `${process.env.REACT_APP_SERVER_URL}/Create`;
const GRADIENT_URL = `${process.env.REACT_APP_SERVER_URL}/GradientThresholds`;

@Service()
export class WarehouseService {
  constructor() {
    makeAutoObservable(this);
  }

  private _warehouseItems: IWarehouseItem[] = [];
  private _currentWarehouse!: IWarehouseItem;
  allWarehouseItems: IWarehouseItem[] = [];
  maxSliceValue: number = 10;
  minSliceValue: number = 0;
  firstCurrentDate: any = null;
  lastCurrentDate: any = null;
  currentStackerNumber: number | null = null;
  currentDate: string = new Date().toISOString();
  currentLayer: number | null = null;
  currentRow: number | null = null;
  currentMeter: number | null = null;
  isHeatmapDirty: boolean = false;
  stacker: IStacker = {
    meter: 0,
    row: 0,
    layer: 0,
  };
  compositions: IComposition[] = [];
  private _pilesItems: IPile[] = [];
  archivedPilesItems: IArchivedPile[] = [];
  private _composition: IComposition | null = null;
  compositionForTable: IComposition | null = null;
  private _indexes: IIndexes[] | null = null;
  private _currentPile: IPile | null = null;
  private _gradientThresholds: any = {};
  private _isLoading: boolean = false;
  private _error: unknown;

  isArchivedError: boolean = false;
  isArchivedLoading: boolean = false;

  heatmapSize: number | null = null;

  currentArchiveId: string | null = null;

  setCurrentArchiveId = (val: string | null) => {
    this.currentArchiveId = val;
  };

  setHeatmapSize = (val: number) => {
    this.heatmapSize = val;
  };

  setIsHeatmapDirty = (val: boolean) => {
    this.isHeatmapDirty = val;
  };

  setCurrentStackerNumber = (number: number) => {
    this.currentStackerNumber = number;
  };

  getComposition = async (data: { meter?: number; layer?: number; row?: number }) => {
    // === [MOCKS] === \\
    if (process.env.REACT_APP_MOCKS === "TRUE") {
      this.compositions = brokenIndexes.data;
      return;
    }
    // === [MOCKS] === \\

    try {
      this.isLoading = true;
      if (this.currentArchiveId !== null) {
        runInAction(() => {
          this.isArchivedLoading = true;
        });
      }

      await runInAction(async () => {
        let params = `stackerNumber=${this.currentStackerNumber}&warehouseNumber=${this.currentWarehouse.number}`;

        if (data.meter) {
          params += `&meter=${data.meter}`;
        }

        if (data.row) {
          params += `&row=${data.row}`;
        }

        if (data.layer !== null && data.layer !== undefined && data.layer >= 0) {
          params += `&layer=${data.layer}`;
        }

        if (this.currentArchiveId !== null) {
          params += `&archivedPileid=${this.currentArchiveId}`;
        }

        const result = await axios.get(GET_PILE_URL + params);
        this.compositions = result.data;

        if (this.currentArchiveId !== null) {
          runInAction(() => {
            this.isArchivedError = false;
          });
        }
      });
    } catch (error) {
      if (this.currentArchiveId !== null) {
        runInAction(() => {
          this.isArchivedError = true;
        });
      }

      this.compositions = [];
      this.error = error;
    } finally {
      runInAction(() => {
        this.isArchivedLoading = false;
        this.isLoading = false;
      });
    }
  };

  getAggregatedComposition = async (data: { layer?: number }) => {
    // === [MOCKS] === \\
    if (process.env.REACT_APP_MOCKS === "TRUE") {
      this.compositionForTable = brokenIndexes.data[0];
      return;
    }
    // === [MOCKS] === \\
    try {
      this.isLoading = true;
      await runInAction(async () => {
        let params = `stackerNumber=${this.currentStackerNumber}&warehouseNumber=${this.currentWarehouse.number}`;

        if (data.layer !== null && data.layer !== undefined && data.layer >= 0) {
          params += `&layer=${data.layer}`;
        }

        if (this.currentArchiveId !== null) {
          params += `&archivedPileid=${this.currentArchiveId}`;
        }

        const result = await axios.get(GET_AGGREGATED_PILE_URL + params);
        this.compositionForTable = result.data[0];
      });
    } catch (error) {
      this.compositionForTable = null;
      this.error = error;
    } finally {
      this.isLoading = false;
    }
  };

  getIndexes = async () => {
    try {
      this.isLoading = true;
      await runInAction(async () => {
        let params = `stackerNumber=${this.currentStackerNumber}&warehouseNumber=${
          this.currentWarehouse.number
        }&DateTo=${this.currentDate}&DateFrom=${new Date(+new Date(this.currentDate) - 864000000).toISOString()}`;

        if (this.currentArchiveId !== null) {
          params += `&archivedPileid=${this.currentArchiveId}`;
        }

        const result = await axios.get(GET_INDEXES_URL + params);
        this.indexes = result.data;
      });
    } catch (error) {
      this.error = error;
      console.error("Ошибка запроса", error);
    } finally {
      this.isLoading = false;
    }
  };

  getIndexesBack = () => {
    this.currentDate = new Date(+new Date(this.currentDate) - 864000000).toISOString();
    this.getIndexes();
  };

  getIndexesForward = () => {
    this.currentDate = new Date(+new Date(this.currentDate) + 864000000).toISOString();
    this.getIndexes();
  };

  getWareHouseItems = async () => {
    // === [MOCKS] === \\
    if (process.env.REACT_APP_MOCKS === "TRUE") {
      this.allWarehouseItems = MockWarehouses;
      this.warehouseItems = MockWarehouses.filter(
        (warehouse: IWarehouseItem) => warehouse.stackerNumber === this.currentStackerNumber,
      );
      this.currentWarehouse = this.warehouseItems[0];

      return;
    }
    // === [MOCKS] === \\
    try {
      this.isLoading = true;
      await runInAction(async () => {
        const result = await axios.get(GET_ALL_URL);
        this.allWarehouseItems = result.data;
        this.warehouseItems = result.data.filter(
          (warehouse: IWarehouseItem) => warehouse.stackerNumber === this.currentStackerNumber,
        );
        this.currentWarehouse = this.warehouseItems[0];
      });
    } catch (error) {
      this.error = error;
      console.error("Ошибка запроса", error);
    } finally {
      this.isLoading = false;
    }
  };

  getGradientThresholds = async () => {
    // === [MOCKS] === \\
    if (process.env.REACT_APP_MOCKS === "TRUE") {
      this.gradientThresholds = {
        khThreshold1: 0.98,
        khThreshold2: 1.1,
        pThreshold1: 1,
        pThreshold2: 1.5,
        nThreshold1: 2.3,
        nThreshold2: 2.8,
      };
      return;
    }
    // === [MOCKS] === \\
    try {
      this.isLoading = true;
      await runInAction(async () => {
        const result = await axios.get(GRADIENT_URL);
        this.gradientThresholds = result.data;
      });
    } catch (error) {
      this.error = error;
      console.error("Ошибка запроса", error);
    } finally {
      this.isLoading = false;
    }
  };

  removeWarehouse = async () => {
    try {
      runInAction(() => {
        this.isLoading = true;
        this.warehouseItems = this.warehouseItems.filter((item) => item.id !== this.currentWarehouse.id);
      });
      await runInAction(async () => {
        await axios.delete(DELETE_URL + this.currentWarehouse.id);
      });
      this.setCurrentWarehouse(this.warehouseItems[0].id);
    } catch (error) {
      this.error = error;
      console.error("Ошибка запроса", error);
    } finally {
      this.isLoading = false;
    }
  };

  createWarehouse = async () => {
    const newWarehouse = {
      number: this.currentWarehouse.number === 1 ? 2 : 1,
      stackerNumber: this.currentStackerNumber,
      startMeter: 0,
      endMeter: 200,
      numberOfRows: 24,
      numberOfLayers: 12,
    };

    try {
      this.isLoading = true;
      await runInAction(async () => {
        const result = await axios.post(CREATE_URL, newWarehouse);
      });
      await this.getWareHouseItems();
    } catch (error) {
      this.error = error;
      console.error("Ошибка запроса", error);
    } finally {
      this.isLoading = false;
    }
  };

  setCurrentWarehouse = (id: string) => {
    const current = this.warehouseItems.find((el) => el.id === id);

    if (current) {
      this.currentWarehouse = current;
      this.setCurrentPile();
    }
  };

  getPiles = async () => {
    // === [MOCKS] === \\
    if (process.env.REACT_APP_MOCKS === "TRUE") {
      this.pilesItems = MockPiles;
      return;
    }
    // === [MOCKS] === \\
    try {
      this.isLoading = true;
      await runInAction(async () => {
        const result = await axios.get(
          PILE_URL + `?StackerNumber=${this.currentStackerNumber}&WarehouseNumber=${this.currentWarehouse.number}`,
        );
        this.pilesItems = result.data;
      });
    } catch (error) {
      this.error = error;
      console.error("Ошибка запроса", error);
    } finally {
      this.isLoading = false;
    }
  };

  getArchivedPiles = async (pageNumber: number) => {
    // === [MOCKS] === \\
    if (process.env.REACT_APP_MOCKS === "TRUE") {
      this.archivedPilesItems = MockArchivedPiles;
      return;
    }
    // === [MOCKS] === \\
    try {
      this.isLoading = true;
      await runInAction(async () => {
        const result = await axios.get(
          ARCHIVE_PILE_URL +
            `?StackerNumber=${this.currentStackerNumber}&WarehouseNumber=${this.currentWarehouse.number}&pageNumber=${pageNumber}`,
        );
        this.archivedPilesItems = result.data;
      });
    } catch (error) {
      this.error = error;
      console.error("Ошибка запроса", error);
    } finally {
      this.isLoading = false;
    }
  };

  createPile = async () => {
    try {
      this.isLoading = true;
      await axios.post(
        `${GET_NUMBER_URL}?WarehouseNumber=${this.currentWarehouse.number}&StackerNumber=${this.currentStackerNumber}&CreatorName=${currentPersonService.name}`,
      );
    } catch (error) {
      this.error = error;
      console.error("Ошибка запроса", error);
    } finally {
      this.isLoading = false;
    }
  };

  setCommonView = () => {
    if (this.currentPile?.currentFillingLayer) {
      this.currentLayer = null;
    }
    if (this.currentPile?.currentFillingMeter) {
      this.currentMeter = Math.floor(this.currentPile?.currentFillingMeter / 10) * 10;
    }
    if (this.currentPile?.currentFillingRow) {
      this.currentRow = this.currentPile?.currentFillingRow;
    }
  };

  setPileById = (id: string) => {
    const targetPile = this.pilesItems.find((pile) => pile.id === id);

    if (targetPile) {
      this.currentPile = targetPile;
      this.stacker = {
        layer: targetPile.currentFillingLayer,
        meter: targetPile.currentFillingMeter,
        row: targetPile.currentFillingRow,
      };
      this.setCommonView();
    }
  };

  setCurrentPile = () => {
    const filtered = this.pilesItems.filter((el) => el.warehouseNumber === this.currentWarehouse.number);
    let currentPile = filtered[filtered.length - 1] || null;
    // === [MOCKS] === \\
    if (process.env.REACT_APP_MOCKS === "TRUE") {
      currentPile = {
        creationTime: "2024-03-30T09:01:31.667554Z",
        currentFillingLayer: 2,
        currentFillingMeter: 73,
        currentFillingRow: 6,
        endMeter: 105,
        finishDate: "0001-01-01T00:00:00",
        id: "74b7c8e6-23e0-4bd2-bc13-cb63e0438058",
        isFull: false,
        numberOfLayers: 14,
        numberOfRows: 28,
        stackerIsRun: true,
        stackerNumber: 5,
        startMeter: 35,
        warehouseNumber: 1,
      };
      // const currentPile = {
      //   id: "0deedec8-9bd7-41e9-b5e9-17990144ceb7",
      //   isFull: false,
      //   stackerIsRun: false,
      //   currentFillingMeter: -1,
      //   currentFillingLayer: -1,
      //   currentFillingRow: -1,
      //   stackerNumber: 7,
      //   creationTime: "2024-03-27T12:18:53.662923Z",
      //   finishDate: "0001-01-01T00:00:00",
      //   warehouseNumber: 1,
      //   numberOfRows: 28,
      //   startMeter: 115,
      //   endMeter: 185,
      //   numberOfLayers: 14,
      // };
    }
    // === [MOCKS] === \\

    this.currentPile = currentPile as any;

    if (currentPile) {
      this.stacker = {
        layer: currentPile.currentFillingLayer,
        meter: currentPile.currentFillingMeter,
        row: currentPile.currentFillingRow,
      };
      this.setCommonView();
    }
  };

  setCurrentLayer = (layer: number) => {
    this.currentLayer = layer;
  };

  setCurrentRow = (row: number) => {
    this.currentRow = row;
  };

  setCurrentMeter = (meter: number) => {
    this.currentMeter = meter;
  };

  resetPile = async () => {
    runInAction(() => {
      this.warehouseItems = [];
    });
    this.createPile().then(async () => {
      await this.getPiles();
      await this.getWareHouseItems();
      await this.getComposition({});
      await this.getGradientThresholds();
      this.setCurrentPile();
    });
  };

  setSpliceNumberPlus = async () => {
    if (this.minSliceValue > 43 && this.maxSliceValue > 48) {
      return;
    }
    runInAction(() => {
      this.maxSliceValue = this.maxSliceValue + 5;
      this.minSliceValue = this.minSliceValue + 5;
    });
  };

  setSpliceNumberMinus = async () => {
    if (this.minSliceValue <= 0 && this.maxSliceValue <= 10) {
      return;
    }
    runInAction(() => {
      this.maxSliceValue = this.maxSliceValue - 5;
      this.minSliceValue = this.minSliceValue - 5;
    });
  };

  setCurrentDate = (moment: any) => {
    const firstOriginalDate = new Date(moment[0]._d);
    const firstYear = firstOriginalDate.getFullYear();
    const firstMonth = (firstOriginalDate.getMonth() + 1).toString().padStart(2, "0");
    const firstDay = firstOriginalDate.getDate().toString().padStart(2, "0");

    const lastOriginalDate = new Date(moment[1]._d);
    const lastYear = lastOriginalDate.getFullYear();
    const lastMonth = (lastOriginalDate.getMonth() + 1).toString().padStart(2, "0");
    const lastDay = lastOriginalDate.getDate().toString().padStart(2, "0");
    this.firstCurrentDate = `${firstYear}-${firstDay}-${firstMonth}`;
    this.lastCurrentDate = `${lastYear}-${lastDay}-${lastMonth}`;
  };

  get currentWarehouse() {
    return this._currentWarehouse;
  }

  set currentWarehouse(value) {
    this._currentWarehouse = value;
  }

  get warehouseItems() {
    return this._warehouseItems;
  }

  set warehouseItems(value: typeof this._warehouseItems) {
    this._warehouseItems = value;
  }

  get isLoading() {
    return this._isLoading;
  }

  set isLoading(value: typeof this._isLoading) {
    this._isLoading = value;
  }

  get error() {
    return this._error;
  }

  set error(value: typeof this._error) {
    this._error = value;
  }

  get pilesItems() {
    return this._pilesItems;
  }

  set pilesItems(value: typeof this._pilesItems) {
    this._pilesItems = value;
  }

  get currentPile() {
    return this._currentPile;
  }

  set currentPile(value: typeof this._currentPile) {
    this._currentPile = value;
  }

  get composition() {
    if (this.currentLayer && this.currentRow && this.currentMeter) {
      return (
        this.compositions.find(
          (item) =>
            item.layer === this.currentLayer && item.row === this.currentRow && item.meter_group === this.currentMeter,
        ) || null
      );
    }

    if (this.currentLayer && this.currentRow) {
      return this.compositions.find((item) => item.layer === this.currentLayer && item.row === this.currentRow) || null;
    }

    if (this.currentRow && this.currentMeter) {
      return (
        this.compositions.find((item) => item.row === this.currentRow && item.meter_group === this.currentMeter) || null
      );
    }

    if (this.currentRow) {
      return this.compositions.find((item) => item.row === this.currentRow) || null;
    }

    if (this.currentMeter) {
      return (
        this.compositions.find((item) => item.layer === this.currentLayer && item.meter_group === this.currentMeter) ||
        null
      );
    }
    return this.compositions.find((item) => item.layer === this.currentLayer) || null;
  }

  set composition(value: typeof this._composition) {
    this._composition = value;
  }
  get gradientThresholds() {
    return this._gradientThresholds;
  }

  set gradientThresholds(value: typeof this._gradientThresholds) {
    this._gradientThresholds = value;
  }

  get indexes() {
    return this._indexes;
  }

  set indexes(value: typeof this._indexes) {
    this._indexes = value;
  }
}
