import type { HTMLProps } from 'react';
import type { HostConfig } from 'react-reconciler';
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
    type: string,
    props: Props,
    rootContainer: Container,
    hostContext: any,
    internalHandle: any
  ): Element {
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
    hostContext: any,
    internalHandle: any
  ): Text {
    const textElement = document.createTextNode(text);
    return textElement;
  },
  appendInitialChild(parentInstance: Element, child: Element | Text): void {
    parentInstance.appendChild(child);
  },
  appendChildToContainer(container: Container, child: Element | Text): void {
    container.appendChild(child);
  },
  removeChildFromContainer(container: Container, child: Element | Text): void {
    container.removeChild(child);
  },
  clearContainer(container: Container): void {
    while (container.firstChild) {
      container.firstChild.remove();
    }
  },
  finalizeInitialChildren(
    instance: Element,
    type: string,
    props: Props,
    rootContainer: Container,
    hostContext: any
  ): boolean {
    return false;
  },
  prepareUpdate(
    instance: Element,
    type: string,
    oldProps: Props,
    newProps: Props,
    rootContainer: Container,
    hostContext: any
  ): UpdatePayload | null {
    return null;
  },
  shouldSetTextContent(type: string, props: Props): boolean {
    return false;
  },
  getRootHostContext(rootContainer: Container): HostContext | null {
    return null;
  },
  getChildHostContext(
    parentHostContext: HostContext,
    type: string,
    rootContainer: Container
  ): HostContext {
    return parentHostContext;
  },
  getPublicInstance(instance: Element | Text): PublicInstance {
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
  cancelTimeout(id: any): void {
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
