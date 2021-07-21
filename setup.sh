#!/bin/bash

work_dir=$(pwd)
css_proj=()
react_proj=()
vue_proj=()

echo "[JOBS] Start sub-projects building ..."

for proj in ${css_proj[@]}
do
    echo "[JOB] Start 'css/$proj' building ..."
    bash -c "cd $work_dir/css/$proj && npm install && npm run build && rm -fr src && mv ./build/* ." &
done

for proj in ${react_proj[@]}
do
    echo "[JOB] Start 'react/$proj' building ..."
    bash -c "cd $work_dir/react/$proj && npm install && npm run build && rm -fr src && mv ./build/* ." &
done

for proj in ${vue_proj[@]}
do
    echo "[JOB] Start 'vue/$proj' building ..."
    bash -c "cd $work_dir/vue/$proj && npm install && npm run build && rm -fr src && mv ./dist/* ." &
done

wait
echo "[SUCCESS] All jobs completed !"
