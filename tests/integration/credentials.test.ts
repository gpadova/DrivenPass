import { app } from "../../src/server";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { generateUser } from "../factories/usersFactories";
import { cleanDb, generateValidToken } from "../helpers";

import { generateValidCredential } from "../factories/credentialsFactories";

beforeEach(async () => {
  await cleanDb();
});

afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
});

const server = supertest(app);

describe("POST /credential route", () => {
    jest.setTimeout(30000);
    it("No token is provided, response -> 401", async () => {
        const response = await server.post("/credential")
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    it("Wrong token is provided, response -> 401", async () => {
        const token = "XXXXXXX"
        const response = await server.post("/credential").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    describe("Valid token is passed", () => {
        const generateCredential = () => ({
            title:faker.name.firstName(),
            url: faker.internet.url(),
            username: faker.internet.userName(),
            password: faker.internet.url(),
          });
          const generateValidBody = () => ({
            email: faker.internet.email(),
            password: faker.internet.password(10),
          });
        it("Valid token is passed, but no body, response -> 401", async () => {
            const user = await generateValidBody()
            const token = await generateValidToken(user)
            const response = await server.post("/credential").set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.UNAUTHORIZED)
        });
        it("Valid token is passed, but no wrong body format, response 403", async () => {
            const user = await generateValidBody()
            const body = {
                tle:faker.name.firstName(),
                url: faker.internet.url(),
                username: faker.internet.userName(),
                password: faker.internet.url(),
              }
            const token = await generateValidToken(user)
            const response = await server.post("/credential").set("Authorization", `Bearer ${token}`).send(body);
            expect(response.status).toBe(httpStatus.UNAUTHORIZED)
        });
        it("Valid token is passed and body, response -> 201", async () => {
            const userBody = generateValidBody()
            const user = await generateUser(userBody)
            const body = generateCredential();
            const token = await generateValidToken({id: String(user.id),email: user.email, password: user.password})
            
            const response = await server.post("/credential").set("Authorization", `Bearer ${token}`).send(body);
            expect(response.status).toBe(httpStatus.CREATED)
        });
        it("Credential with the same name", async () => {
            const userBody = generateValidBody()
            const user = await generateUser(userBody)
            const credential = await generateValidCredential(user.id)
            
            const token = await generateValidToken({id: String(user.id),email: user.email, password: userBody.password})
            const response = await server.post("/credential").set("Authorization", `Bearer ${token}`).send({title: credential.title, url: credential.url, username: credential.username, password: credential.password});
            expect(response.status).toBe(httpStatus.FORBIDDEN)
        });
    });
});

describe("GET /credentials testing", () => {
    jest.setTimeout(30000);
    const generateCredential = () => ({
        title:faker.name.firstName(),
        url: faker.internet.url(),
        username: faker.internet.userName(),
        password: faker.internet.url(),
      });
      const generateValidBody = () => ({
        id: faker.random.numeric(),
        email: faker.internet.email(),
        password: faker.internet.password(10),
      });
    it("No token is provided, response -> 401", async () => {
        const response = await server.get("/credential")
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    it("Wrong token is provided, response -> 401", async () => {
        const token = "XXXXXXX"
        const response = await server.get("/credential").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    describe("Right token is passed", () => {
        it("No credentials were previously inserted for this user, response", async () => {
            const userBody = generateValidBody()
            const user = await generateUser(userBody)
            const token = await generateValidToken({id: String(user.id),email: user.email, password: user.password})

            const response = await server.get("/credential").set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.NOT_FOUND)
        });
        it("Credential were previosly inserted to this user", async () => {
            const userBody = generateValidBody()
            const user = await generateUser(userBody)
            const token = await generateValidToken({id: String(user.id),email: user.email, password: user.password})
            const body = await generateCredential();
            await generateValidCredential(Number(user.id))
            const response = await server.get("/credential").set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(httpStatus.OK)
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        title: expect.any(String),
                        url: expect.any(String),
                        username: expect.any(String),
                        password: expect.any(String)
                })
            ]))
        });
    });
});

describe("GET /credential/:id testing", () => {
    jest.setTimeout(30000);
    const generateCredential = () => ({
        title:faker.name.firstName(),
        url: faker.internet.url(),
        username: faker.internet.userName(),
        password: faker.internet.url(),
      });
      const generateValidBody = () => ({
        id: faker.random.numeric(),
        email: faker.internet.email(),
        password: faker.internet.password(10),
      });
    it("No token is provided, response -> 401", async () => {
        const response = await server.get("/credential/1")
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    it("Wrong token is provided, response -> 401", async () => {
        const token = "XXXXXXX"
        const response = await server.get("/credential/1").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    describe("Right token is provided", () => {
        it("There's no such id in the db for this credential", async () => {
            const body = await generateCredential();
            const userBody = generateValidBody()
            const user = await generateUser(userBody)
            const token = await generateValidToken({id: String(user.id),email: user.email, password: user.password})                

            const randoNumber = faker.random.numeric()
            const response = await server.get(`/credential/${randoNumber}`).set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.FORBIDDEN)
        });
        it("Succesfull request made", async () => {
            const body = await generateCredential();
            const userBody = generateValidBody()
            const user = await generateUser(userBody)
            const token = await generateValidToken({id: String(user.id),email: user.email, password: user.password})
            const credential = await generateValidCredential(Number(user.id))
            const response = await server.get(`/credential/${credential.id}`).set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(httpStatus.OK)
            expect(response.body).toEqual(
                expect.objectContaining({
                        id: expect.any(Number),
                        title: expect.any(String),
                        url: expect.any(String),
                        username: expect.any(String),
                        password: expect.any(String),
                        userId: expect.any(Number)
                }))
        });
    });
});

describe("DELETE /credential/:id testing", () => {
    jest.setTimeout(30000);
    const generateCredential = () => ({
        title:faker.name.firstName(),
        url: faker.internet.url(),
        username: faker.internet.userName(),
        password: faker.internet.url(),
      });
      const generateValidBody = () => ({
        id: faker.random.numeric(),
        email: faker.internet.email(),
        password: faker.internet.password(10),
      });
    it("No token is provided, response -> 401", async () => {
        const response = await server.delete("/credential/1")
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    it("Wrong token is provided, response -> 401", async () => {
        const token = "XXXXXXX"
        const response = await server.delete("/credential/1").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    describe("Valid token is passed", () => {
        it("Not a valid id passed", async () => {
            const user = generateValidBody()
            const body = generateCredential();
            const token = await generateValidToken(user)
            const randoNumber = faker.random.numeric(3)
            const response = await server.delete(`/credential/${randoNumber}`).set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.FORBIDDEN)
        });
        it("Valid id is passed", async () => {
            const body = await generateCredential();
            const userBody = generateValidBody()
            const user = await generateUser(userBody)
            const token = await generateValidToken({id: String(user.id),email: user.email, password: user.password})
            const credential = await generateValidCredential(Number(user.id))

            const response = await server.delete(`/credential/${credential.id}`).set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.ACCEPTED)
        });
    });
});