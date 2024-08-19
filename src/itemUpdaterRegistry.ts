import { Item } from "./gilded_rose";
import { ItemUpdater } from "./interfaces";
import { updateAged, updateBackstage, updateConjured, updateDefault, updateSulfuras } from "./updaters";

export class ItemUpdaterRegistry {
  static updaters: Map<string, ItemUpdater> = new Map();

  static registryUpdater(name: string, updater: ItemUpdater) {
    this.updaters.set(name, updater)
  }

  static getUpdaterByItem(item: Item) {
    for (let [key, updater] of this.updaters.entries()) {
      if(item.name.includes(key)) {
        return updater
      }
    }

    return new updateDefault()
  }
}

ItemUpdaterRegistry.registryUpdater('Default', new updateDefault())
ItemUpdaterRegistry.registryUpdater('Backstage', new updateBackstage())
ItemUpdaterRegistry.registryUpdater('Aged', new updateAged())
ItemUpdaterRegistry.registryUpdater('Sulfuras', new updateSulfuras())
ItemUpdaterRegistry.registryUpdater('Conjured', new updateConjured())