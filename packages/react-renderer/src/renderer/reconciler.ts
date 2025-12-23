import createReactReconciler from 'react-reconciler'
import hostConfig from '@/renderer/hostConfig'

const reconciler = createReactReconciler(hostConfig)

export default reconciler
