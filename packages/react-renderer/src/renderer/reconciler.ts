import type { HTMLProps } from 'react';
import type { HostConfig } from 'react-reconciler';
import ReactReconciler from 'react-reconciler';

type Type = string;
type Props = HTMLProps<HTMLElement>;
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
    if (props.className) element.className = props.className;
    if (props.id) element.id = props.id;
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
  ) {
    throw new Error('Function not implemented.');
  },
  shouldSetTextContent(type: string, props: Props): boolean {
    return false;
  },
  getRootHostContext(rootContainer: Container) {
    return null;
  },
  getChildHostContext(
    parentHostContext: any,
    type: string,
    rootContainer: Container
  ) {
    return parentHostContext;
  },
  getPublicInstance(instance: Element | Text) {
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
