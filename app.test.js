const request = require('supertest');
const app = require('../app');
const hexToRgb = require('../hextorgb');

describe('Hex to RGB Library (Unit Tests)', () => {
  test('converts standard 6-digit hex values correctly', () => {
    expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('00FF00')).toEqual({ r: 0, g: 255, b: 0 });
  });

  test('converts 3-digit shorthand hex values correctly', () => {
    expect(hexToRgb('#000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('fff')).toEqual({ r: 255, g: 255, b: 255 });
  });

  test('throws an error for invalid hex lengths or characters', () => {
    expect(() => hexToRgb('invalid')).toThrow('Invalid hex color format');
    expect(() => hexToRgb('#12345')).toThrow('Invalid hex color format');
  });
});

describe('REST API (Integration Tests)', () => {
  test('GET /convert with valid hex returns 200 and RGB object', async () => {
    const res = await request(app).get('/convert?hex=3498db');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('rgb', { r: 52, g: 152, b: 219 });
  });

  test('GET /convert with missing hex query parameter returns 400', async () => {
    const res = await request(app).get('/convert');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  test('GET /convert with invalid hex string returns 400', async () => {
    const res = await request(app).get('/convert?hex=xyz123');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});