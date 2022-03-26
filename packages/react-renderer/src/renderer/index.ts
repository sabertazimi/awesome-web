import type { ReactElement } from 'react';
import Reconciler from './reconciler';
import type { Container } from './types';

const Renderer = {
  render: (
    element: ReactElement,
    container: Container | null,
    callback?: Function
  ) => {
    if (container) {
      const root = Reconciler.createContainer(container, 0, false, null);
      Reconciler.updateContainer(element, root, null);
    }
  },
};

export default Renderer;
