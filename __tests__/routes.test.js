const supertest = require("supertest");
const mongoose = require("mongoose");
const { app, start } = require("../src/routes/routes");

beforeEach(async () => {
  await start("mongodb://103.74.254.244:27017/testoddsInstallmentDB");
});
afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.remove();
  }
  await mongoose.connection.close();
});

test("test get user route", async () => {
  const response = await supertest(app).get("/users");

  expect(response.status).toEqual(200);
  //expect(response.body.length).toEqual(3);
});

test("test get finacials route", async () => {
  const response = await supertest(app).get("/financials");

  expect(response.status).toEqual(200);
  //expect(response.body.length).toEqual(1);
});

test("test get transactions route", async () => {
  const response = await supertest(app).get("/transactions");

  expect(response.status).toEqual(200);
  //expect(response.body.length).toEqual(6);
});

test("test search by firstName", async () => {
  await supertest(app)
    .post("/users")
    .send({
      firstName: "Angkana",
      lastName: "Luprasit",
      nickName: "Hmoo",
      email: "pirom@gmail.com",
      phone: "0931235533"
    });
  const response = await supertest(app).get("/users/search?name=ang");

  expect(response.status).toEqual(200);
  expect(response.body[0].firstName).toEqual("Angkana");
});
