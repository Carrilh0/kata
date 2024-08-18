// ALTERAÇÃO FEITA APENAS PARA SE ADAPTAR AO TYPESCRIPT
class Item {
  protected name: string;
  protected sellIn: number;
  protected quality: number;

  constructor(name: string, sellIn: number, quality: number){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

interface IGenericItem {
  updateQuality(quality: number): number;
}

class ActionItem extends Item {
  private qualityLimit: number;
  constructor(name: string, sellIn: number, quality: number, qualityLimit = 50) {
    super(name,sellIn, quality)
    this.qualityLimit = qualityLimit
    this.qualityValidation(quality)
  }

  private qualityValidation(quality: number): void {
    console.log(this.qualityLimit)
    if (quality > this.qualityLimit) {
      throw new Error(`Quantidade não pode ser maior que ${this.qualityLimit}`)
    }
  }

  getName(): string {
    return this.name
  }

  getQuality(): number {
    return this.quality
  }

  getSellIn(): number {
    return this.sellIn
  }
  
  setQuality(quality: number): number {
    this.qualityValidation(quality)
    this.quality = Math.max(0, quality)
    return this.quality
  }
}

class DefaultItem extends ActionItem implements IGenericItem {
  constructor(name: string, sellIn: number, quality: number) {
    super(name,sellIn, quality)
  }

  updateQuality(quality: number) {
    return this.setQuality(quality--)
  }
}

class AgedItem extends ActionItem implements IGenericItem {
  constructor(name: string, sellIn: number, quality: number) {
    super(name,sellIn, quality)
  }

  updateQuality() {
    return this.setQuality(this.quality++)
  }
}

class SpecialItem extends ActionItem implements IGenericItem {
  constructor(name: string, sellIn: number, quality: number) {
    const qualityLimit = 80;
    super(name,sellIn, quality, qualityLimit)
  }

  updateQuality() {
    return this.setQuality(this.quality)
  }
}

class ConjuredItem extends ActionItem implements IGenericItem {
  constructor(name: string, sellIn: number, quality: number) {
    super(name,sellIn, quality)
  }

  updateQuality() {
    return this.setQuality(this.quality - 2)
  }
}

console.log(new SpecialItem("Vitor",2,50))

class Shop {
  items: ActionItem[];

  constructor(items: ActionItem[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      if (item.getName().includes("Aged") || item.getName().includes("Backstage")) {
        item.setQuality(item.getQuality() + 1)
      } else if  (item.getName().includes("Sulfuras")) {
        item.setQuality(item.getQuality())
      } else {
        item.setQuality(item.getQuality() - 1)
      }
    })
    // for (let i = 0; i < this.items.length; i++) {
    //   if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
    //     if (this.items[i].quality > 0) {
    //       if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
    //         this.items[i].quality = this.items[i].quality - 1;
    //       }
    //     }
    //   } else {
    //     if (this.items[i].quality < 50) {
    //       this.items[i].quality = this.items[i].quality + 1;
    //       if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
    //         if (this.items[i].sellIn < 11) {
    //           if (this.items[i].quality < 50) {
    //             this.items[i].quality = this.items[i].quality + 1;
    //           }
    //         }
    //         if (this.items[i].sellIn < 6) {
    //           if (this.items[i].quality < 50) {
    //             this.items[i].quality = this.items[i].quality + 1;
    //           }
    //         }
    //       }
    //     }
    //   }
    //   if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
    //     this.items[i].sellIn = this.items[i].sellIn - 1;
    //   }
    //   if (this.items[i].sellIn < 0) {
    //     if (this.items[i].name != 'Aged Brie') {
    //       if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
    //         if (this.items[i].quality > 0) {
    //           if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
    //             this.items[i].quality = this.items[i].quality - 1;
    //           }
    //         }
    //       } else {
    //         this.items[i].quality = this.items[i].quality - this.items[i].quality;
    //       }
    //     } else {
    //       if (this.items[i].quality < 50) {
    //         this.items[i].quality = this.items[i].quality + 1;
    //       }
    //     }
    //   }
    // }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
