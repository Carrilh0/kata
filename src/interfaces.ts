import { Item } from "./gilded_rose";

export interface ItemUpdater {
  update(item: Item): void;
}