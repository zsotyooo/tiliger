import { HeartBeat } from './src/heartbeat/HeartBeat';

export { HeartBeat };

export function createHeartBeat(): HeartBeat {
  return new HeartBeat();
}
