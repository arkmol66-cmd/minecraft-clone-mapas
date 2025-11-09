# Web (WASM + three.js)

Instruções rápidas:
1. Compile o C++ via Emscripten (veja ../cpp/emscripten_build.sh).
2. Copie build/world.js e build/world.wasm para esta pasta (/web).
3. Sirva esta pasta por HTTP:
   python -m http.server 8000
4. Abra http://localhost:8000

Notas:
- Você precisa ter o Emscripten SDK instalado e ativado.
