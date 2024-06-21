const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

let server;

beforeAll(done => {
  server = app.listen(3002, () => {
    global.agent = request.agent(server);
    done();
  });
});

afterAll(async done => {
  await mongoose.connection.close();
  server.close(done);
});

afterEach(async () => {
  await mongoose.connection.dropDatabase(); 
});

describe('Testes de Rotas de carros', () => {
  it('Deve listar todos os carros (GET /carros)', async () => {
    const response = await request(app).get('/carros');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Deve criar um novo carro com campos válidos (POST /carros)', async () => {
    const newCarros = {
      nome: 'Corsa',
      marca: 'Opel',
      modelo: 'duas portas',
      ano: 2011,
      foto: 'corsa.jpg',
    };

    const response = await request(app)
      .post('/carros')
      .send(newCarros);

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('Deve retornar erro ao criar um novo carro com campos inválidos (POST /carros)', async () => {
    const invalidCarros = {
      modelo: 'duas portas',
      ano: 2011,
      foto: 'corsa.jpg',
    };

    const response = await request(app)
      .post('/carros')
      .send(invalidCarros);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('message');
  });

  it('Deve retornar erro ao acessar uma rota inexistente (GET /rota-inexistente)', async () => {
    const response = await request(app).get('/rota-inexistente');
    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual({});
    response.req.connection.destroy(); // Certifica-se de fechar a conexão aberta
  });
});
