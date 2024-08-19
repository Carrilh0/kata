import { Item, Shop } from "../src/gilded_rose";

function updateMultipleDays(shop: Shop, days: number): Item[] {
  for(let i = 0; i < days; i++) {
    shop.update()
  }

  return shop.items
}

describe("Teste unitário dos itens", () => {
  it("[Backstage]: A qualidade aumenta em 2 quando faltam 10 dias ou menos, em 3 quando faltam 5 dias ou menos, e cai para 0 após o show.", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
    // 4 Dias
    const items = updateMultipleDays(gildedRose, 4)
    
    expect(items[0].quality).toBe(28);
    expect(items[0].sellIn).toBe(6);
  });

  it("[Aged]: Aumenta 1 em qualidade quanto mais velho fica", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 3, 5)]);
    // 4 Dias
    const items = updateMultipleDays(gildedRose, 5)
    
    expect(items[0].quality).toBe(10);
    expect(items[0].sellIn).toBe(-2);
  });

  it("[Sulfuras]: Permanece a mesma quality e SellIn, é um item lendário", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
    // 4 Dias
    const items = updateMultipleDays(gildedRose, 5)
    
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(1);
  });

  
  describe('Uma vez que a data de validade tenha passado, a qualidade degrada-se duas vezes mais rápido', () => {
    it("[Default]: Degrada 1 de qualidade e 1 de SellIn por dia", function() {
      const gildedRose = new Shop([new Item("+5 Dexterity Vest", 4, 45)]);
      // 4 Dias
      const items = updateMultipleDays(gildedRose, 5)
      
      expect(items[0].quality).toBe(39);
      expect(items[0].sellIn).toBe(-1);
    });
    
    it("[Conjured]: Degradam em qualidade duas vezes mais rápido que os itens normais", function() {
      const gildedRose = new Shop([new Item("Conjured Mana Cake", 7, 25)]);
      // 4 Dias
      const items = updateMultipleDays(gildedRose, 5)
      
      expect(items[0].quality).toBe(15);
      expect(items[0].sellIn).toBe(2);
    });
  })

});
