import { ITrendItem } from "../../../types";

export type TTrendListItem = keyof Omit<ITrendItem, "ts">;
