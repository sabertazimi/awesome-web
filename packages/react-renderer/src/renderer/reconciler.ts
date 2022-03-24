import type { HTMLProps } from 'react';
import type { HostConfig, OpaqueHandle } from 'react-reconciler';
import ReactReconciler from 'react-reconciler';

type Type = string;
type Props = HTMLProps<HTMLElement>;
type PropKey = keyof Props;
export type Container = Document | DocumentFragment | Element;
type Instance = Element;
type TextInstance = Text;

type SuspenseInstance = any;
type HydratableInstance = any;
type PublicInstance = any;
type HostContext = {
  svg: boolean;
};
type UpdatePayload = boolean;
type _ChildSet = any;
type TimeoutHandle = any;
type NoTimeout = number;

const isClass = (propName: string) => propName === 'className';
const isChildren = (propName: string) => propName === 'children';
const isListener = (propName: string) => propName.startsWith('on');
const isAttribute = (propName: string) =>
  !isClass(propName) && !isChildren(propName) && !isListener(propName);

const isSVGType = (type: Type) => type === 'svg';
const isSVGContext = (context: HostContext) => context.svg;
const createHostContext = (svg: boolean) => {
  return {
    svg,
  };
};

const hostConfig: HostConfig<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  SuspenseInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  _ChildSet,
  TimeoutHandle,
  NoTimeout
> = {
  createInstance(
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: OpaqueHandle
  ): Instance {
    let element: Instance;

    if (isSVGType(type) || isSVGContext(hostContext)) {
      element = document.createElementNS('http://www.w3.org/2000/svg', type);
    } else {
      element = document.createElement(type);
    }

    Object.keys(props).forEach((propName: string) => {
      const propValue = props[propName as PropKey];

      if (isClass(propName)) {
        element.setAttribute('class', propValue);
      } else if (isChildren(propName)) {
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          element.textContent = propValue.toString();
        }
      } else if (isListener(propName)) {
        const eventType = propName.toLowerCase().substring(2);
        element.addEventListener(eventType, propValue);
      } else if (isAttribute(propName)) {
        if (propValue !== null && propValue !== undefined) {
          element.setAttribute(propName, propValue);
        }
      }
    });

    return element;
  },
  createTextInstance(
    text: string,
    rootContainer: Container,
    hostContext: HostContext,
    internalHandle: OpaqueHandle
  ): TextInstance {
    const textElement = document.createTextNode(text);
    return textElement;
  },
  appendInitialChild(
    parentInstance: Instance,
    child: Instance | TextInstance
  ): void {
    parentInstance.appendChild(child);
  },
  appendChild(parentInstance: Instance, child: Instance | TextInstance): void {
    parentInstance.appendChild(child);
  },
  appendChildToContainer(
    container: Container,
    child: Instance | TextInstance
  ): void {
    container.appendChild(child);
  },
  removeChildFromContainer(
    container: Container,
    child: Instance | TextInstance
  ): void {
    container.removeChild(child);
  },
  removeChild(parentInstance: Instance, child: Instance | TextInstance): void {
    parentInstance.removeChild(child);
  },
  clearContainer(container: Container): void {
    while (container.firstChild) {
      container.firstChild.remove();
    }
  },
  finalizeInitialChildren(
    instance: Instance,
    type: Type,
    props: Props,
    rootContainer: Container,
    hostContext: HostContext
  ): boolean {
    return false;
  },
  prepareUpdate(
    instance: Instance,
    type: Type,
    oldProps: Props,
    newProps: Props,
    rootContainer: Container,
    hostContext: HostContext
  ): UpdatePayload | null {
    return true;
  },
  commitUpdate(
    instance: Instance,
    updatePayload: UpdatePayload,
    type: Type,
    prevProps: Props,
    nextProps: Props,
    internalHandle: OpaqueHandle
  ): void {
    Object.keys(nextProps).forEach((propName: string) => {
      const propValue = nextProps[propName as PropKey];
      if (isChildren(propName)) {
        if (typeof propValue === 'string' || typeof propValue === 'number') {
          instance.textContent = propValue.toString();
        }
      } else if (isAttribute(propName)) {
        if (propValue !== null && propValue !== undefined) {
          instance.setAttribute(propName, propValue);
        }
      }
    });
  },
  commitTextUpdate(
    textInstance: TextInstance,
    oldText: string,
    newText: string
  ): void {
    textInstance.textContent = newText;
  },
  shouldSetTextContent(type: Type, props: Props): boolean {
    return (
      typeof props.children === 'string' || typeof props.children === 'number'
    );
  },
  resetTextContent(instance: Instance): void {
    instance.textContent = '';
  },
  getRootHostContext(rootContainer: Container): HostContext | null {
    return createHostContext(false);
  },
  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    rootContainer: Container
  ): HostContext {
    return isSVGType(type) ? createHostContext(true) : parentHostContext;
  },
  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    return instance;
  },
  prepareForCommit(containerInfo: Container): Record<string, any> | null {
    return null;
  },
  resetAfterCommit(containerInfo: Container): void {},
  preparePortalMount(containerInfo: Container): void {},
  now(): number {
    return performance.now();
  },
  scheduleTimeout(
    fn: (...args: unknown[]) => unknown,
    delay?: number
  ): TimeoutHandle {
    return setTimeout(fn, delay);
  },
  cancelTimeout(id: TimeoutHandle): void {
    clearTimeout(id);
  },
  noTimeout: -1,
  isPrimaryRenderer: true,
  supportsHydration: false,
  supportsMutation: true,
  supportsPersistence: false,
};

const reconciler = ReactReconciler(hostConfig);

export default reconciler;
