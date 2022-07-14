import type { HTMLProps } from 'react';
import type {
  Fiber,
  HostConfig as _HostConfig,
  OpaqueHandle,
  OpaqueRoot,
} from 'react-reconciler';

type Type = string;
type Props = HTMLProps<HTMLElement>;
type PropKey = keyof Props;
type Container = Document | DocumentFragment | Element;
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

type HostConfig = _HostConfig<
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
>;

export type {
  Type,
  Props,
  PropKey,
  Container,
  Fiber,
  Instance,
  TextInstance,
  SuspenseInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  _ChildSet,
  TimeoutHandle,
  NoTimeout,
  HostConfig,
  OpaqueHandle,
  OpaqueRoot,
};
