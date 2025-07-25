import { ArrayDB } from "#utils/array-db";

describe("Array DB Utility Class", () => {
  test("find", () => {
    const products = [
      {
        id: 1,
        name: "xbox",
        category: "videogame",
      },
      {
        id: 2,
        name: "regrigerator",
        category: "appliance",
      },
      {
        id: 3,
        name: "nintendo",
        category: "videogame",
      },
      {
        id: 4,
        name: "oven",
        category: "appliance",
      },
      {
        id: 5,
        name: "coffeemaker",
        category: "appliance",
      },
      {
        id: 6,
        name: "shampoo",
        category: "hair care",
      },
    ];

    const applianceProducts = new ArrayDB(products)
      .find({
        category: "appliance",
      })
      .value();

    const hairCareProducts = new ArrayDB(products)
      .find({
        category: "hair care",
      })
      .value();

    const videogameProducts = new ArrayDB(products)
      .find({
        category: "videogame",
      })
      .value();

    const gardenProducts = new ArrayDB(products)
      .find({
        category: "garden",
      })
      .value();

    const allProducts = new ArrayDB(products).find().value();
    const allProducts2 = new ArrayDB(products).find({}).value();

    expect(applianceProducts.length).toBe(3);
    expect(hairCareProducts.length).toBe(1);
    expect(videogameProducts.length).toBe(2);
    expect(gardenProducts.length).toBe(0);

    expect(allProducts.length).toBe(products.length);
    expect(allProducts2.length).toBe(products.length);

    expect(allProducts).toStrictEqual(products);

    expect(videogameProducts).toStrictEqual([
      {
        id: 1,
        name: "xbox",
        category: "videogame",
      },
      {
        id: 3,
        name: "nintendo",
        category: "videogame",
      },
    ]);
  });

  test("findOne", () => {
    const cars = [
      {
        id: 1,
        name: "BMW",
        year: 1990,
      },
      {
        id: 2,
        name: "Ford",
        year: 1984,
      },
      {
        id: 3,
        name: "BYD",
        year: 2025,
      },
      {
        id: 4,
        name: "Ferrari",
        year: 1984,
      },
    ];

    const car = new ArrayDB(cars).findOne({ name: "BYD" });
    const carNotFound = new ArrayDB(cars).findOne({ name: "Mercedes" });

    expect(car.year).toBe(2025);
    expect(carNotFound).toBeUndefined();
  });
});
