import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js'; // Cambia la ruta según la ubicación de tu archivo principal

describe('Alertas API', () => {
  // Crear una alerta de prueba antes de cada test
  let alertaId;
  
  it('should create an alerta', async () => {
    const response = await request(app)
      .post('/api/alerta')
      .send({
        nombre: 'Test Alerta',
        fechaEntrega: '2024-08-25',
        estadoActivo: true
      });
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('id');
    alertaId = response.body.id; // Guarda el ID para usar en otros tests
  });

  it('should get all alertas', async () => {
    const response = await request(app)
      .get('/api/alerta')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.have.property('nombre');
    expect(response.body[0]).to.have.property('fechaEntrega');
  });

  it('should update an alerta', async () => {
    const response = await request(app)
      .put(`/api/alerta/${alertaId}`)
      .send({
        nombre: 'Updated Test Alerta',
        fechaEntrega: '2024-09-01',
        estadoActivo: true
      });
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('nombre', 'Updated Test Alerta');
    expect(response.body).to.have.property('fechaEntrega', '2024-09-01');
  });

  it('should deactivate an alerta', async () => {
    const response = await request(app)
      .put(`/api/alerta/desactivar/${alertaId}`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).to.have.property('message', 'Alerta dada de baja');
  });
  
  it('should handle not found error for desactivar', async () => {
    const response = await request(app)
      .put('/api/alerta/desactivar/9999')
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body).to.have.property('message', 'Alerta no encontrada');
  });

  it('should handle error on update', async () => {
    const response = await request(app)
      .put('/api/alerta/9999')
      .send({
        nombre: 'Nonexistent Alerta',
        fechaEntrega: '2024-09-01'
      })
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body).to.have.property('message', 'Alerta no encontrada');
  });
});
