import createPluginService from '.';
import PluginService from './PluginService';

describe('createPluginService', () => {
  it('creates PluinService', () => {
    expect(createPluginService()).toBeInstanceOf(PluginService);
  });
});
