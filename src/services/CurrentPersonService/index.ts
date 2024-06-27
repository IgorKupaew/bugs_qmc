import { Service } from "typedi";
import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

const emptyAction = () => console.error(new Error("No action to confirm"));

const LOG_URL = `${process.env.REACT_APP_SERVER_URL}/Add`;

function generateRandomId() {
  // Генерация случайного символа (буква или цифра)
  function getRandomChar() {
    const chars = "0123456789abcdef";
    const randomIndex = Math.floor(Math.random() * chars.length);
    return chars.charAt(randomIndex);
  }

  // Генерация случайного сегмента UUID
  function generateSegment(length: any) {
    let segment = "";
    for (let i = 0; i < length; i++) {
      segment += getRandomChar();
    }
    return segment;
  }

  // Формирование полного UUID
  return (
    generateSegment(8) +
    "-" +
    generateSegment(4) +
    "-" +
    generateSegment(4) +
    "-" +
    generateSegment(4) +
    "-" +
    generateSegment(12)
  );
}

function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

  const isoDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

  return isoDateTime;
}

@Service()
export class CurrentPersonService {
  constructor() {
    makeAutoObservable(this);
  }

  name: string = "";
  message: string = "";
  isModalOpen: boolean = false;
  action: any = emptyAction;

  sendLog = async () => {
    try {
      await axios.post(LOG_URL, {
        id: generateRandomId(),
        message: `[${this.name}]: ${this.message}`,
        ts: getCurrentDateTime(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  changePersonName = (value: string) => {
    runInAction(() => {
      this.name = value;
    });
  };

  changeIsModalOpen = (value: boolean) => {
    this.isModalOpen = value;
  };

  confirmAction = () => {
    this.action();
    this.sendLog();
    this.message = "";
    this.action = emptyAction;
    this.changeIsModalOpen(false);
  };

  openModalWithAction = (action: Function, message: string) => {
    if (message) {
      this.message = message;
    }
    this.changeIsModalOpen(true);
    this.action = action;
  };
}
