import { app } from "../../src/server";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { generateUser } from "../factories/usersFactories";
import { cleanDb } from "../helpers";
import { disconnectDB } from "@/Config/database";

beforeEach(async () => {
  await cleanDb();
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
});

const server = supertest(app);

describe("POST /signin", () => {
  jest.setTimeout(30000);
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/signin");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { email: faker.lorem.word() };
    const response = await server.post("/signin").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(8),
    });

    it("should respond with status 400 if there is no user for given email", async () => {
      const body = { email: faker.internet.email() };

      const response = await server.post("/signin").send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 if there is a user for given email but password is not correct", async () => {
      const body = generateValidBody();
      await generateUser(body);

      const response = await server.post("/signin").send({
        ...body,
        password: faker.lorem.word(),
      });
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 200", async () => {
      const body = { 
        email: faker.internet.email(),
        password: faker.internet.password()
      }
      const user = await generateUser(body);
      const response = await server.post("/signin").send(body)
      expect(response.status).toBe(httpStatus.OK)
    });

      it("should respond with session token", async () => {
        const body = { 
          email: faker.internet.email(),
          password: faker.internet.password()
        }
        await generateUser(body);
        const response = await server.post("/signin").send(body);

        expect(response.body.token).toBeDefined();
      });
  });
});

describe("POST /signup", () => {
  jest.setTimeout(30000);
  const generateValidBody = () => ({
    email: faker.internet.email(),
    password: faker.internet.password(10),
  });
  it('No body is given -> response 400', async () => {
    const response = await server.post("/signup")
    expect(response.status).toBe(httpStatus.BAD_REQUEST)
  });

  it("Wrong body is given, response -> 400", async () => {
    const body = { 
      email: faker.internet.domainName(),
      passord: faker.internet.password()}
    const response = await server.post("/signup").send(body)
    expect(response.status).toBe(httpStatus.BAD_REQUEST)
  });

  it("Successfull request is sent, response is 200", async () => {
    const body = { 
      email: faker.internet.email(),
      password: faker.internet.password()}
    const response = await server.post("/signup").send(body)
    expect(response.status).toBe(httpStatus.CREATED)
  });

  it("POST with an user already created with this email", async () => {
    const body = await generateValidBody()
    const user = await generateUser(body);
    const response = await server.post("/signup").send(user)
    expect(response.status).toBe(httpStatus.BAD_REQUEST)
  });
});
