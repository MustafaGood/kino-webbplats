const request = require('supertest');
const app = require('./server'); // Ersätt './server' med den korrekta sökvägen till din server.js-fil

// Test för att kontrollera att hemsidan svarar korrekt
describe('GET /', () => {
  it('ska svara med statuskod 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

// Test för att kontrollera att individuella filmsidor hanteras korrekt
describe('GET /movies/:id', () => {
  it('ska svara med statuskod 200 för existerande film', async () => {
    // Använd ett giltigt film-id här
    const response = await request(app).get('/movies/1');
    expect(response.statusCode).toBe(200);
  });

  it('ska svara med statuskod 404 för icke existerande film', async () => {
    // Använd ett ogiltigt film-id här
    const response = await request(app).get('/movies/9999');
    expect(response.statusCode).toBe(404);
  });
});

// Stäng servern efter att alla tester har körts
afterAll((done) => {
  // Ersätt app.close med din metod för att stänga ner servern, t.ex. app.server.close om du har en HTTP-server
  if (app.close) {
    app.close(done);
  } else {
    done();
  }
});
