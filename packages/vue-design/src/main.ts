import { h, init } from 'snabbdom';
import './style.css';

const patch = init([]);

const Component = (props: { title: string }) => h('h1', props.title);
const prevVNode = Component({ title: 'prev' });

patch(document.querySelector<HTMLDivElement>('#app')!, prevVNode);
