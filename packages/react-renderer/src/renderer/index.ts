import type { ReactElement } from 'react';
import Reconciler from './reconciler';
import type { Container, OpaqueRoot } from './types';

const Renderer = {
  createRoot: (
    container: Container | null,
    callback?: Function
  ): OpaqueRoot => {
    if (container) {
      const root = Reconciler.createContainer(container, 0, false, null);

      root.render = function (element: ReactElement) {
        Reconciler.updateContainer(element, this, null);
      };

      return root;
    }
  },
};

export default Renderer;
