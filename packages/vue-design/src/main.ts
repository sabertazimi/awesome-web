import { h, init } from 'snabbdom'
import './style.css'

const patch = init([])

const Component = (props: { title: string }) => h('h1', props.title)
const prevVNode = Component({ title: 'Prev State' })
const nextVNode = Component({ title: 'Next State' })
let state = true

patch(document.querySelector<HTMLDivElement>('#app')!, prevVNode)

const button = document.querySelector('.button')!
button.addEventListener('click', () => {
  state ? patch(prevVNode, nextVNode) : patch(nextVNode, prevVNode)
  state = !state
})
