<script setup lang="ts">
import { ref, h } from 'vue';

interface ListProps {
  list: {
    name: string;
  }[];
  'active-index': number;
  onToggle(index: number): void;
}

/**
 * Implement a functional component :
 * 1. Render the list elements (ul/li) with the list data
 * 2. Change the list item text color to red when clicked.
 */
const ListComponent = (props: ListProps) => {
  return h(
    'ul',
    null,
    props.list.map((item, index) =>
      h(
        'li',
        {
          key: index,
          style:
            props['active-index'] === index
              ? {
                  color: 'red',
                }
              : undefined,
          onClick: props.onToggle.bind(null, index),
        },
        item.name
      )
    )
  );
};

const list = [
  {
    name: 'John',
  },
  {
    name: 'Doe',
  },
  {
    name: 'Smith',
  },
];

const activeIndex = ref(0);

function toggle(index: number) {
  activeIndex.value = index;
}
</script>

<template>
  <list-component :list="list" :active-index="activeIndex" @toggle="toggle" />
</template>
