import type { HTMLProps } from 'react';
import type { HostConfig, OpaqueHandle } from 'react-reconciler';
import ReactReconciler from 'react-reconciler';

type Type = string;
type Props = HTMLProps<HTMLElement>;
type PropKey = keyof Props;
type ElementKey = Exclude<
  Extract<keyof Element, PropKey>,
  'children' | 'prefix'
>;
export type Container = Document | DocumentFragment | Element;
type Instance = Element;
type TextInstance = Text;

type SuspenseInstance = any;
type HydratableInstance = any;
type PublicInstance = any;
type HostContext = any;
type UpdatePayload = any;
type _ChildSet = any;
type TimeoutHandle = any;
type NoTimeout = number;

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
    const element = document.createElement(type);

    const isListener = (propName: string) => propName.startsWith('on');
    const isAttribute = (propName: string) =>
      !isListener(propName) && propName !== 'children';

    Object.keys(props)
      .filter(isListener)
      .forEach((propName: string) => {
        const eventType = propName.toLowerCase().substring(2);
        element.addEventListener(eventType, props[propName as PropKey]);
      });

    Object.keys(props)
      .filter(isAttribute)
      .forEach((propName: string) => {
        element[propName as ElementKey] = props[propName as PropKey];
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
    return null;
  },
  commitTextUpdate(
    textInstance: TextInstance,
    oldText: string,
    newText: string
  ): void {
    const newTextInstance = document.createTextNode(newText);
    textInstance.replaceWith(newTextInstance);
  },
  shouldSetTextContent(type: Type, props: Props): boolean {
    return false;
  },
  getRootHostContext(rootContainer: Container): HostContext | null {
    return null;
  },
  getChildHostContext(
    parentHostContext: HostContext,
    type: Type,
    rootContainer: Container
  ): HostContext {
    return parentHostContext;
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
