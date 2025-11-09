# Minecraft Recreate — Full Package (WASM + Native + Server)

Este repositório contém **tudo** preparado para as duas abordagens:
- **Opção A** — WebAssembly (Emscripten) + three.js (roda no navegador)
- **Opção B** — C++ nativo (OpenGL) + Browser via WebSocket (Node.js relay)

Estrutura principal:
- /web        → frontend (HTML, JS, assets) + integração WASM
- /cpp        → código C++ (exemplos para nativo e Emscripten)
- /server     → Node.js WebSocket relay
- /build      → placeholder para artefatos gerados (WASM build)

Leia os arquivos `README` dentro de cada pasta para instruções de build/exec.

Autor: Gerado por ChatGPT — ajuste e compile localmente conforme instruções.
