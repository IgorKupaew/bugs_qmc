import axios from "axios";

export async function getNotifications(page: number) {
  try {
    return axios.get(`${process.env.REACT_APP_SERVER_URL}/Get?pageNumber=${page}`);
  } catch (error) {
    console.error(error);
  }
}
