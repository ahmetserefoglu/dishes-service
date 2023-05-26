import { Injectable } from '@nestjs/common';
import { ClientRedis, ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_SERVICE') private readonly client: ClientProxy) {}

  public get(key: string): Promise<any> {
    return this.client.send('get', key).toPromise();
  }

  public set(key: string, value: any): Promise<any> {
    return this.client.send('set', { key, value }).toPromise();
  }
}
