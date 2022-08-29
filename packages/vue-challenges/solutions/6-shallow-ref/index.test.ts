import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import App from './App.vue';

describe('shallowRef', () => {
  it('should work', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(vi.fn(() => {}));
    mount(App);
    expect(spy).toHaveBeenCalled();
  });
});
