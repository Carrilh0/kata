import { Item } from "./gilded_rose";
import { ItemUpdater } from "./interfaces";

export class updateDefault implements ItemUpdater {
  update (item: Item): void {
    item.quality--
    item.sellIn--
  }
}

export class updateSulfuras implements ItemUpdater {
  update(item: Item): void {
    //Eu realmente não quero atualizar nada
  }
}

export class updateAged implements ItemUpdater {
  update(item: Item): void {
    item.quality++
    item.sellIn--
  }
}

export class updateBackstage implements ItemUpdater {
  update(item: Item): void {
    let conditionalQuality: number;
    if (item.sellIn <= 0) {
      conditionalQuality = 0
    } else if (item.sellIn <= 5) {
      conditionalQuality = item.quality + 3
    } else if (item.sellIn <= 10) {
      conditionalQuality = item.quality + 2
    } else {
      conditionalQuality = item.quality + 1
    }

    item.quality = Math.min(50, conditionalQuality)
    item.sellIn--
  }
}

export class updateConjured implements ItemUpdater {
  update(item: Item): void {
    item.quality = item.quality - 2
    item.sellIn--
  }
}
