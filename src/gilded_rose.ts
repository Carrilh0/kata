import { ItemUpdaterRegistry } from "./itemUpdaterRegistry";

// ALTERAÇÃO FEITA APENAS PARA SE ADAPTAR AO TYPESCRIPT
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  items: Item[];

  constructor(items: Item[]){
    this.items = items;
  }
  
  updateQuality() {
    this.items.forEach((item) => {
      const updater = ItemUpdaterRegistry.getUpdaterByItem(item)
      updater.update(item)
    })

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
