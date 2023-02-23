import { app } from "../../src/server";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { generateUser } from "../factories/usersFactories";
import { cleanDb, generateValidToken } from "../helpers";
import { generateWifi } from "../factories/wifiFactories";


beforeEach(async () => {
    await cleanDb();
  });
  
afterAll(async () => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
});
  
const server = supertest(app);

describe("POST /wifi testing", () => {
    jest.setTimeout(30000);
    it("No token is provided, response -> 401", async () => {
        const response = await server.post("/wifi")
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    it("Wrong token is provided, response -> 401", async () => {
        const token = "XXXXXXX"
        const response = await server.post("/wifi").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    describe("Valid token is passed", () => {
        const generateWifiBody = () => ({
            title:faker.name.firstName(),
            network: faker.internet.url(),
            password: faker.internet.url()
          });
          const generateValidBody = () => ({
            email: faker.internet.email(),
            password: faker.internet.password(10),
          });
        it("Valid token is passed, but no body, response -> 401", async () => {
            const user = await generateValidBody()
            const token = await generateValidToken(user)
            const response = await server.post("/wifi").set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.UNAUTHORIZED)
        });
        
        it("Wrong body format", async () => {
            const user = generateValidBody()
            const body = {
                tie:faker.name.firstName(),
                network: faker.internet.url(),
                password: faker.internet.url()
              }
            const token = await generateValidToken(user)
            const response = await server.post("/wifi").set("Authorization", `Bearer ${token}`).send(body);
            expect(response.status).toBe(httpStatus.UNAUTHORIZED)
        });

        it("Valid token is passed and body, response -> 201", async () => {
            const userBody = generateValidBody()
            const user = await generateUser(userBody)
            const body = generateWifiBody();
            const token = await generateValidToken({id: String(user.id),email: user.email, password: user.password})
            
            const response = await server.post("/wifi").set("Authorization", `Bearer ${token}`).send(body);
            expect(response.status).toBe(httpStatus.CREATED)
        });
        
    });
});

describe("GET /wifi testing", () => {
    jest.setTimeout(30000);
    const generateWifiBody = () => ({
        title:faker.name.firstName(),
        network: faker.internet.url(),
        password: faker.internet.url()
      });
      const generateValidBody = () => ({
        email: faker.internet.email(),
        password: faker.internet.password(10),
      });
    it("No token is provided, response -> 401", async () => {
        const response = await server.get("/wifi")
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    it("Wrong token is provided, response -> 401", async () => {
        const token = "XXXXXXX"
        const response = await server.get("/wifi").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    describe("Right token is passed", () => {
        it("No credentials were previously inserted for this user, response", async () => {
            const userBody = generateValidBody()
            const user = await generateUser(userBody)
            const token = await generateValidToken({id: String(user.id),email: user.email, password: user.password})

            const response = await server.get("/wifi").set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.OK)
            expect(response.body).toHaveLength(0);
        });
        it("Credential were previosly inserted to this user", async () => {
            const userBody = generateValidBody()
            const user = await generateUser(userBody)
            const token = await generateValidToken({id: String(user.id),email: user.email, password: user.password})
            await generateWifi(user.id)
            const response = await server.get("/wifi").set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(httpStatus.OK)
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        title: expect.any(String),
                        network: expect.any(String),
                        password: expect.any(String)
                })
            ]))
        });
    });      
});

describe("GET /wifi/:id testing", () => {
    jest.setTimeout(30000);
    const generateWifiBody = () => ({
        title:faker.name.firstName(),
        network: faker.internet.url(),
        password: faker.internet.url()
      });
    const generateValidBody = () => ({
        email: faker.internet.email(),
        password: faker.internet.password(10),
    });
    it("No token is provided, response -> 401", async () => {
        const response = await server.get("/wifi/1")
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    it("Wrong token is provided, response -> 401", async () => {
        const token = "XXXXXXX"
        const response = await server.get("/wifi/1").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    describe("Right token is provided", () => {
        it("There's no such id in the db for this credential", async () => {

            const userBody = generateValidBody()
            const user = await generateUser(userBody)
            const token = await generateValidToken({id: String(user.id),email: user.email, password: user.password})                

            const randoNumber = faker.random.numeric()
            const response = await server.get(`/credential/${randoNumber}`).set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.FORBIDDEN)
        });
    });

    it("Credential were previosly inserted to this user", async () => {
        const userBody = generateValidBody()
        const user = await generateUser(userBody)
        const token = await generateValidToken({id: String(user.id),email: user.email, password: user.password})
        const wifi = await generateWifi(user.id)
        const response = await server.get(`/wifi/${wifi.id}`).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.OK)
        expect(response.body).toEqual(
                expect.objectContaining({
                    title: expect.any(String),
                    network: expect.any(String),
                    password: expect.any(String)
            })
        )
    });
    
});

describe("DELETE /wifi/:id testing ", () => {
    jest.setTimeout(30000);
    const generateWifiBody = () => ({
        title:faker.name.firstName(),
        network: faker.internet.url(),
        password: faker.internet.url()
      });
    const generateValidBody = () => ({
        email: faker.internet.email(),
        password: faker.internet.password(10),
    });
    it("No token is provided, response -> 401", async () => {
        const response = await server.delete("/wifi/1")
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    it("Wrong token is provided, response -> 401", async () => {
        const token = "XXXXXXX"
        const response = await server.delete("/wifi/1").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    });
    describe("Valid token is passed", () => {
       it("Invalid id sent", async () => {
        const userBody = generateValidBody()
        const user = await generateUser(userBody)
        const token = await generateValidToken({id: String(user.id),email: user.email, password: user.password})                

        const randoNumber = faker.random.numeric()
        const response = await server.delete(`/credential/${randoNumber}`).set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(httpStatus.FORBIDDEN)
       });
       it("Valid id is sent", async () => {
        const userBody = generateValidBody()
        const user = await generateUser(userBody)
        const token = await generateValidToken({id: String(user.id),email: user.email, password: user.password})
        const wifi = await generateWifi(user.id)
        const response = await server.delete(`/wifi/${wifi.id}`).set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.ACCEPTED)
       }); 
    });
});