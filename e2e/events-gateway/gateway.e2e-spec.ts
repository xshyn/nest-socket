import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Socket, io } from 'socket.io-client';
import { AppModule } from '../../src/app.module.js';

describe('EventsGateway', () => {
  let app: INestApplication;
  let socket: Socket;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.listen(3000);
  });

  beforeEach(() => {
    return new Promise<void>((resolve) => {
      socket = io('http://localhost:3000');
      socket.on('connect', () => {
        resolve();
      });
    });
  });

  describe('message', () => {
    it('should recieve message', () => {
      return new Promise<void>((resolve, reject) => {
        socket.emit('message', 'message', (response: any) => {
          try {
            expect(response).toBe('message');
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      });
    });
  });

  afterEach(() => {
    socket.disconnect();
  });

  afterAll(async () => {
    await app.close();
  });
});
