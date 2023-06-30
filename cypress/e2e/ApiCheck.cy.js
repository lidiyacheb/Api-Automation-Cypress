it("check Posts status", () => {
  cy.request({
    method: "GET",
    url: " http://localhost:3000/posts/",
  }).then(({ status, headers }) => {
    expect(status).to.eq(200);
    expect(headers["content-type"]).to.eq("application/json; charset=utf-8");
  });
});

it("check first post status", () => {
  cy.request({
    method: "GET",
    url: " http://localhost:3000/posts/",
  }).then(({ status, headers, body }) => {
    expect(status).to.eq(200);
    expect(headers).to.have.property("content-type");
    expect(headers["content-type"]).to.eq("application/json; charset=utf-8");
    expect(body.slice(0, 10)).to.have.length(10);
    expect(body[0]).to.have.property("body");
  });
});

it("check 55 post status", () => {
  cy.request({
    method: "GET",
    url: "http://localhost:3000/posts/55",
  }).then(({ status, body }) => {
    console.log(body);
    expect(status).to.eq(200);
    expect(body.id).to.eq(55);
  });
});

it("check create post", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/664/posts",
    //If you do not want status codes to cause failures pass the option: 'failOnStatusCode: false'
    failOnStatusCode: false,
  }).then(({ status }) => {
    expect(status).to.eq(401);
  });
});

it("check create post with Auth", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/register",
    body:
        {
            "email": "user10555@gmail.com",
            "password": "bestPassw0rdkkk"
        }
  }).then(({status}) => {
    expect(status).to.eq(201);
  });
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxMDU1NUBnbWFpbC5jb20iLCJpYXQiOjE2ODQ5MTEzODYsImV4cCI6MTY4NDkxNDk4Niwic3ViIjoiMTQifQ.ysQkfWlhtqnW6MisQQEPXtEr0Y7tUOhmXP6kptap-PA";

it("login with token", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/login",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxMDU1NUBnbWFpbC5jb20iLCJpYXQiOjE2ODQ5MTEzODYsImV4cCI6MTY4NDkxNDk4Niwic3ViIjoiMTQifQ.ysQkfWlhtqnW6MisQQEPXtEr0Y7tUOhmXP6kptap-PA",
    },
    body: {
      email: "user10555@gmail.com",
      password: "bestPassw0rdkkk",
    },
  }).then(({ status }) => {
    expect(status).to.eq(200);
  });
});

it("check created post with authorised user", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/664/posts",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxMDU1NUBnbWFpbC5jb20iLCJpYXQiOjE2ODQ5MTEzODYsImV4cCI6MTY4NDkxNDk4Niwic3ViIjoiMTQifQ.ysQkfWlhtqnW6MisQQEPXtEr0Y7tUOhmXP6kptap-PA",
    },
    body: {
      email: "user10555@gmail.com",
      password: "bestPassw0rdkkk",
      name: "Lidia",
    },
  }).then(({ status, body }) => {
    console.log(body);
    expect(status).to.eq(201);
    expect(body.name).to.eq("Lidia");
  });
});

it("check created entity using JSON", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/posts",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxMDU1NUBnbWFpbC5jb20iLCJpYXQiOjE2ODQ5MTEzODYsImV4cCI6MTY4NDkxNDk4Niwic3ViIjoiMTQifQ.ysQkfWlhtqnW6MisQQEPXtEr0Y7tUOhmXP6kptap-PA",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "user10555@gmail.com",
      password: "bestPassw0rdkkk",
      name: "Lidia",
    }),
  }).then(({ status }) => {
    expect(status).to.eq(201);
  });
});

it("update non-existing entity", () => {
  cy.request({
    method: "PUT",
    url: "http://localhost:3000/posts",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxMDU1NUBnbWFpbC5jb20iLCJpYXQiOjE2ODQ5MTEzODYsImV4cCI6MTY4NDkxNDk4Niwic3ViIjoiMTQifQ.ysQkfWlhtqnW6MisQQEPXtEr0Y7tUOhmXP6kptap-PA",
    },
    body: {
      email: "user444@gmail.com",
      password: "bestPassw0rdkkk",
    },
    failOnStatusCode: false,
  }).then(({ status }) => {
    expect(status).to.eq(404);
  });
});

