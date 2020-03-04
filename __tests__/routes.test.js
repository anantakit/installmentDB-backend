const { app, start } = require("../src/routes/routes");
const supertest = require("supertest");
test("test get user route", async () => {
  await start();
  const response = await supertest(app).get("/users");

  expect(response.status).toEqual(200);
  //expect(response.body.length).toEqual(3);
});

test("test get finacials route", async () => {
  await start();
  const response = await supertest(app).get("/finacials");

  expect(response.status).toEqual(200);
  //expect(response.body.length).toEqual(1);
});

test("test get transactions route", async () => {
  await start();
  const response = await supertest(app).get("/transactions");

  expect(response.status).toEqual(200);
  //expect(response.body.length).toEqual(6);
});
