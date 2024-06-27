import { Service } from "typedi";
import { makeAutoObservable } from "mobx";

export interface NotificationsItem {
  status: 0 | 1 | 2 | 3;
  date: string;
  time: string;
  body: string;
  id: number;
}

const MOCK_VALUE: NotificationsItem[] = [
  {
    id: 1,
    status: 0,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 2,
    status: 1,
    date: "12.11.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 3,
    status: 2,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 4,
    status: 3,
    date: "11.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 5,
    status: 1,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 6,
    status: 2,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 7,
    status: 3,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 8,
    status: 0,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 9,
    status: 1,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 10,
    status: 3,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 11,
    status: 2,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 12,
    status: 1,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 13,
    status: 2,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 14,
    status: 0,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 15,
    status: 3,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 16,
    status: 0,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 17,
    status: 1,
    date: "12.11.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 18,
    status: 2,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 19,
    status: 3,
    date: "11.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 21,
    status: 1,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 22,
    status: 2,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 23,
    status: 3,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 24,
    status: 0,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 25,
    status: 1,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 26,
    status: 3,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 27,
    status: 2,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 28,
    status: 1,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 29,
    status: 2,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 30,
    status: 0,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
  {
    id: 31,
    status: 3,
    date: "12.12.2023",
    time: "09:45:34",
    body: "Lorem ipsum dolor sit amet consectetur. Ipsum.",
  },
];

@Service()
export class NotificationsService {
  constructor() {
    makeAutoObservable(this);
  }

  notificationsItems: NotificationsItem[] = [];

  getNotificationsItems = () => {
    this.notificationsItems = MOCK_VALUE;
  };
}
