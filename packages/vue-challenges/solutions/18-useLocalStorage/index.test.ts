import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import App from './App.vue';

describe('useLocalStorage', () => {
  it('should work', async () => {
    console.log = vi.fn();
    let wrapper = mount(App);
    expect(wrapper.find('p').text()).toBe('Counter: 0');
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('p').text()).toBe('Counter: 1');

    wrapper.unmount();

    wrapper = mount(App);
    expect(wrapper.find('p').text()).toBe('Counter: 1');
  });
});
