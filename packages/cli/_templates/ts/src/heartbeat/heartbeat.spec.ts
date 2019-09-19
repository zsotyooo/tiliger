import { HeartBeat } from './HeartBeat';
import mockConsole, { RestoreConsole } from 'jest-mock-console';

describe('HeartBeat', () => {
  let heartBeat: HeartBeat;
  let restoreConsole: RestoreConsole;

  beforeEach(() => {
    restoreConsole = mockConsole('log');
    heartBeat = new HeartBeat();
  });

  afterEach(() => {
    restoreConsole();
  });

  it('is initializable', () => {
    expect(heartBeat).toBeInstanceOf(HeartBeat);
  });

  it('logs env variable', () => {
    heartBeat.logTestVar();
    expect(console.log).toHaveBeenCalledWith('test-env-value');
  });
});
