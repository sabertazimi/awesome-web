import type { HTMLProps } from 'react'
import type {
  HostConfig as _HostConfig,
  Fiber,
  OpaqueHandle,
  OpaqueRoot,
} from 'react-reconciler'

type Type = string
type Props = HTMLProps<HTMLElement>
type PropKey = keyof Props
type Container = Document | DocumentFragment | Element
type Instance = Element
type TextInstance = Text

type SuspenseInstance = any
type HydratableInstance = any
type PublicInstance = any
type HostContext = boolean
type UpdatePayload = boolean
type _ChildSet = any
type TimeoutHandle = any
type NoTimeout = number
type TransitionStatus = any

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
  NoTimeout,
  TransitionStatus
>

export type {
  _ChildSet,
  Container,
  Fiber,
  HostConfig,
  HostContext,
  HydratableInstance,
  Instance,
  NoTimeout,
  OpaqueHandle,
  OpaqueRoot,
  PropKey,
  Props,
  PublicInstance,
  SuspenseInstance,
  TextInstance,
  TimeoutHandle,
  Type,
  UpdatePayload,
}
