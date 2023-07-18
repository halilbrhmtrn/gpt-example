const request = require('supertest');
const app = require('./index');


describe('API Endpoint Tests', () => {
  it('should extract new appointment intent and datetime', async () => {
    const response = await request(app)
      .post('/extract-intent')
      .send({ message: "Yarın öğlen 2'de müsait misiniz?" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      intent: 'new_appointment',
      datetimeStr: expect.any(String),
    });
  });

  it('should extract new appointment intent and datetime 2', async () => {
    const response = await request(app)
      .post('/extract-intent')
      .send({ message: "30 ağustos sabah 10'a randevu oluşturmak istiyorum." });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      intent: 'new_appointment',
      datetimeStr: expect.any(String),
    });
  });

  it('should classify other intents', async () => {
    const response = await request(app)
      .post('/extract-intent')
      .send({ message: 'Yarınki randevumu iptal etmek istiyorum!' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      intent: 'other',
      datetimeStr: expect.any(String),
    });
  });

  it('should handle invalid message', async () => {
    const response = await request(app)
      .post('/extract-intent')
      .send({ message: 123 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'message is required and should be a string' });
  });
});
