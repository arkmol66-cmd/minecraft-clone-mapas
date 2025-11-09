#!/usr/bin/env bash
set -e
# Antes de rodar: source /path/to/emsdk/emsdk_env.sh
mkdir -p build
emcc src/world.cpp -O3 \
  -s WASM=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EXPORTED_FUNCTIONS="['_init_world','_generate_chunk','_free_chunk','_get_chunk_size','_get_chunk_height']" \
  -s EXTRA_EXPORTED_RUNTIME_METHODS="['ccall','cwrap']" \
  -o build/world.js
echo "Build concluído: build/world.js + build/world.wasm"
