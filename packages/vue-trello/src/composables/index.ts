import { AppStore } from 'src/store';

const moveTask = (
  store: AppStore,
  event: React.DragEvent,
  toColumnIndex: number,
  toTaskIndex?: number
) => {
  const dataTransfer = event.dataTransfer;

  if (dataTransfer) {
    const fromColumnIndex = parseInt(dataTransfer.getData('fromColumnIndex'));
    const fromTaskIndex = parseInt(dataTransfer.getData('fromTaskIndex'));
    store.commit('moveTask', {
      fromColumnIndex,
      toColumnIndex,
      fromTaskIndex,
      toTaskIndex,
    });
  }
};

const moveColumn = (
  store: AppStore,
  event: React.DragEvent,
  toColumnIndex: number
) => {
  const dataTransfer = event.dataTransfer;

  if (dataTransfer) {
    const fromColumnIndex = parseInt(dataTransfer.getData('fromColumnIndex'));
    store.commit('moveColumn', { fromColumnIndex, toColumnIndex });
  }
};

const move = (
  store: AppStore,
  event: React.DragEvent,
  toColumnIndex: number,
  toTaskIndex?: number
) => {
  const dataTransfer = event.dataTransfer;
  const type = dataTransfer.getData('type');

  if (type === 'column') {
    moveColumn(store, event, toColumnIndex);
  } else {
    moveTask(store, event, toColumnIndex, toTaskIndex);
  }
};

export { move };
