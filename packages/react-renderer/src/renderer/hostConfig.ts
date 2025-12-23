import type {
  Container,
  Fiber,
  HostConfig,
  HostContext,
  Instance,
  OpaqueHandle,
  PropKey,
  Props,
  PublicInstance,
  TextInstance,
  TimeoutHandle,
  Type,
} from '@/renderer/types'
import {
  isAttribute,
  isChildren,
  isClass,
  isListener,
  isSVGContext,
  isSVGType,
} from '@/renderer/utils'

/**
 * Creates a host context object for the renderer.
 * @param {boolean} svg A boolean value indicating whether the host context is for SVG rendering.
 * @returns {{svg: boolean}} The host context object.
 */
function createHostContext(svg: boolean) {
  return svg
}

const hostConfig: HostConfig = {
  createInstance(
    type: Type,
    props: Props,
    _rootContainer: Container,
    hostContext: HostContext,
    _internalHandle: OpaqueHandle,
  ): Instance {
    let element: Instance

    if (isSVGType(type) || isSVGContext(hostContext)) {
      element = document.createElementNS('http://www.w3.org/2000/svg', type)
    } else {
      element = document.createElement(type)
    }

    Object.keys(props).forEach((propName: string) => {
      const propValue = props[propName as PropKey]

      if (isClass(propName)) {
        element.setAttribute('class', propValue)
      } else if (isChildren(propName)) {
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          element.textContent = propValue.toString()
        }
      } else if (isListener(propName)) {
        const eventType = propName.toLowerCase().slice(2)
        element.addEventListener(eventType, propValue)
      } else if (isAttribute(propName)) {
        if (propValue !== null && typeof propValue !== 'undefined') {
          element.setAttribute(propName, propValue)
        }
      }
    })

    return element
  },
  createTextInstance(
    text: string,
    _rootContainer: Container,
    _hostContext: HostContext,
    _internalHandle: OpaqueHandle,
  ): TextInstance {
    const textElement = document.createTextNode(text)
    return textElement
  },
  appendInitialChild(
    parentInstance: Instance,
    child: Instance | TextInstance,
  ): void {
    parentInstance.appendChild(child)
  },
  appendChild(parentInstance: Instance, child: Instance | TextInstance): void {
    parentInstance.appendChild(child)
  },
  appendChildToContainer(
    container: Container,
    child: Instance | TextInstance,
  ): void {
    container.appendChild(child)
  },
  removeChild(parentInstance: Instance, child: Instance | TextInstance): void {
    parentInstance.removeChild(child)
  },
  removeChildFromContainer(
    container: Container,
    child: Instance | TextInstance,
  ): void {
    container.removeChild(child)
  },
  clearContainer(container: Container): void {
    while (container.firstChild) {
      container.firstChild.remove()
    }
  },
  finalizeInitialChildren(
    _instance: Instance,
    _type: Type,
    _props: Props,
    _rootContainer: Container,
    _hostContext: HostContext,
  ): boolean {
    return false
  },
  commitUpdate(
    instance: Instance,
    _type: Type,
    _prevProps: Props,
    nextProps: Props,
    _internalHandle: OpaqueHandle,
  ): void {
    Object.keys(nextProps).forEach((propName: string) => {
      const propValue = nextProps[propName as PropKey]
      if (isChildren(propName)) {
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          instance.textContent = propValue.toString()
        }
      } else if (isAttribute(propName)) {
        if (propValue !== null && typeof propValue !== 'undefined') {
          instance.setAttribute(propName, propValue)
        }
      }
    })
  },
  commitTextUpdate(
    textInstance: TextInstance,
    _oldText: string,
    newText: string,
  ): void {
    textInstance.textContent = newText
  },
  shouldSetTextContent(_type: Type, props: Props): boolean {
    return (
      typeof props.children === 'string' || typeof props.children === 'number'
    )
  },
  resetTextContent(instance: Instance): void {
    instance.textContent = ''
  },
  getRootHostContext(rootContainer: Container): HostContext | null {
    return isSVGType(rootContainer.nodeName)
      ? createHostContext(true)
      : createHostContext(false)
  },
  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    _rootContainer: Container,
  ): HostContext {
    return isSVGType(type) ? createHostContext(true) : parentHostContext
  },
  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    return instance
  },
  prepareForCommit(_containerInfo: Container): Record<string, any> | null {
    return null
  },
  resetAfterCommit(_containerInfo: Container): void {},
  preparePortalMount(_containerInfo: Container): void {},
  scheduleTimeout(
    fn: (...args: unknown[]) => unknown,
    delay?: number,
  ): TimeoutHandle {
    return setTimeout(fn, delay)
  },
  cancelTimeout(id: TimeoutHandle): void {
    clearTimeout(id)
  },
  noTimeout: -1,
  isPrimaryRenderer: true,
  supportsHydration: false,
  supportsMutation: true,
  supportsPersistence: false,
  getInstanceFromNode(_node: any): Fiber | null | undefined {
    return null
  },
  beforeActiveInstanceBlur(): void {},
  afterActiveInstanceBlur(): void {},
  prepareScopeUpdate(_scopeInstance: any, _instance: any): void {},
  getInstanceFromScope(_scopeInstance: any): Element | null {
    return null
  },
  detachDeletedInstance(_node: Element): void {},

  // New required methods for react-reconciler 0.32.0
  getCurrentUpdatePriority(): number {
    return 16 // DefaultEventPriority
  },
  setCurrentUpdatePriority(_newPriority: number): void {},
  resolveUpdatePriority(): number {
    return 16 // DefaultEventPriority
  },
  shouldAttemptEagerTransition(): boolean {
    return false
  },
  NotPendingTransition: null,
  HostTransitionContext: {
    $$typeof: Symbol.for('react.context'),
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0,
    Provider: null as any,
    Consumer: null as any,
  } as any,
  requestPostPaintCallback(_callback: (time: number) => void): void {
    // No-op for basic implementation
  },
  maySuspendCommit(_type: Type, _props: Props): boolean {
    return false
  },
  preloadInstance(_type: Type, _props: Props): boolean {
    return true
  },
  startSuspendingCommit(): void {},
  suspendInstance(_type: Type, _props: Props): void {},
  waitForCommitToBeReady(): null {
    return null
  },
  supportsMicrotasks: false,
  scheduleMicrotask(_fn: () => unknown): void {
    // No-op implementation
  },
  resetFormInstance(_instance: Instance): void {},
  trackSchedulerEvent(): void {},
  resolveEventType(): null {
    return null
  },
  resolveEventTimeStamp(): number {
    return Date.now()
  },
}

export default hostConfig
