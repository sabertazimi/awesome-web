import type { HostConfig } from 'react-reconciler';
import ReactReconciler from 'react-reconciler';

type Type = string;
type Props = { [key: string]: any };
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
  supportsMutation: false,
  supportsPersistence: false,
  createInstance: function (
    type: string,
    props: Props,
    rootContainer: Container,
    hostContext: any,
    internalHandle: any
  ): Element {
    throw new Error('Function not implemented.');
  },
  createTextInstance: function (
    text: string,
    rootContainer: Container,
    hostContext: any,
    internalHandle: any
  ): Text {
    throw new Error('Function not implemented.');
  },
  appendInitialChild: function (
    parentInstance: Element,
    child: Element | Text
  ): void {
    throw new Error('Function not implemented.');
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
  noTimeout: 0,
  isPrimaryRenderer: false,
  supportsHydration: false,
};

const reconciler = ReactReconciler(hostConfig);

export default reconciler;
