import type { HostContext, Type } from './types'

const isClass = (propName: string) => propName === 'className'
const isChildren = (propName: string) => propName === 'children'
const isListener = (propName: string) => propName.startsWith('on')
const isAttribute = (propName: string) =>
  !isClass(propName) && !isChildren(propName) && !isListener(propName)

const isSVGType = (type: Type) => type.toLowerCase() === 'svg'
const isSVGContext = (context: HostContext) => context.svg

export { isClass, isChildren, isListener, isAttribute, isSVGType, isSVGContext }
