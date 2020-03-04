const supertest = require("supertest");
const mongoose = require("mongoose");
const { app, start } = require("../src/routes/routes");

beforeEach(async () => {
  await start();
});
afterEach(async () => {
  await mongoose.connection.close();
});

test("test get user route", async () => {
  const response = await supertest(app).get("/users");

  expect(response.status).toEqual(200);
  //expect(response.body.length).toEqual(3);
});

test("test get finacials route", async () => {
  const response = await supertest(app).get("/finacials");

  expect(response.status).toEqual(200);
  //expect(response.body.length).toEqual(1);
});

test("test get transactions route", async () => {
  const response = await supertest(app).get("/transactions");

  expect(response.status).toEqual(200);
  //expect(response.body.length).toEqual(6);
});

test("test search by firstName", async () => {
  const response = await supertest(app).get("/users/ang");

  expect(response.status).toEqual(200);
  expect(response.body[0].firstName).toEqual("Angkana");
});
