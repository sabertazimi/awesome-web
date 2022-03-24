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
  createInstance: function (
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
  createTextInstance: function (
    text: string,
    rootContainer: Container,
    hostContext: any,
    internalHandle: any
  ): Text {
    const textElement = document.createTextNode(text);
    return textElement;
  },
  appendInitialChild: function (
    parentInstance: Element,
    child: Element | Text
  ): void {
    parentInstance.appendChild(child);
  },
  finalizeInitialChildren: function (
    instance: Element,
    type: string,
    props: Props,
    rootContainer: Container,
    hostContext: any
  ): boolean {
    throw new Error('Function not implemented.');
  },
  prepareUpdate: function (
    instance: Element,
    type: string,
    oldProps: Props,
    newProps: Props,
    rootContainer: Container,
    hostContext: any
  ) {
    throw new Error('Function not implemented.');
  },
  shouldSetTextContent: function (type: string, props: Props): boolean {
    throw new Error('Function not implemented.');
  },
  getRootHostContext: function (rootContainer: Container) {
    throw new Error('Function not implemented.');
  },
  getChildHostContext: function (
    parentHostContext: any,
    type: string,
    rootContainer: Container
  ) {
    throw new Error('Function not implemented.');
  },
  getPublicInstance: function (instance: Element | Text) {
    throw new Error('Function not implemented.');
  },
  prepareForCommit: function (
    containerInfo: Container
  ): Record<string, any> | null {
    throw new Error('Function not implemented.');
  },
  resetAfterCommit: function (containerInfo: Container): void {
    throw new Error('Function not implemented.');
  },
  preparePortalMount: function (containerInfo: Container): void {
    throw new Error('Function not implemented.');
  },
  now: function (): number {
    throw new Error('Function not implemented.');
  },
  scheduleTimeout: function (
    fn: (...args: unknown[]) => unknown,
    delay?: number
  ) {
    throw new Error('Function not implemented.');
  },
  cancelTimeout: function (id: any): void {
    throw new Error('Function not implemented.');
  },
  noTimeout: -1,
  isPrimaryRenderer: true,
  supportsHydration: false,
  supportsMutation: true,
  supportsPersistence: false,
};

const reconciler = ReactReconciler(hostConfig);

export default reconciler;
