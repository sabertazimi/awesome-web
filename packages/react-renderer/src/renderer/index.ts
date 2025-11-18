import type { ReactElement } from 'react'
import Reconciler from './reconciler'
import type { Container, OpaqueRoot } from './types'

const Renderer = {
  createRoot(
    container: Container | null,
    callback?: Function,
  ): OpaqueRoot {
    let root: OpaqueRoot | null = null

    if (container) {
      root = Reconciler.createContainer(
        container,
        0,
        null,
        true,
        null,
        '',
        (error: Error) => {
          // eslint-disable-next-line no-console -- Output error message
          console.error(error)
        },
        (error: Error) => {
          // eslint-disable-next-line no-console -- Output error message
          console.error(error)
        },
        (error: Error) => {
          // eslint-disable-next-line no-console -- Output error message
          console.error(error)
        },
        () => {
          // Default transition indicator callback
        },
        null,
      )

      root.render = function (element: ReactElement) {
        Reconciler.updateContainer(element, this, null)
      }

      if (callback) {
        callback(root)
      }

      return root
    }

    return root
  },
}

export default Renderer
