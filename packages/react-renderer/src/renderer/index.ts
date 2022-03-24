import type { ReactElement } from 'react';
import type { Container } from './reconciler';
import Reconciler from './reconciler';

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
