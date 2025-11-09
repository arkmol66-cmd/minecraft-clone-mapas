// app.js — integra world.wasm (Module) com three.js
let CHUNK_SIZE = 16;
let CHUNK_HEIGHT = 64;
let scene, camera, renderer;

const blockColors = { 0: null, 1: 0x8B5A2B, 2: 0x228B22, 3: 0x888888 };

Module = typeof Module !== 'undefined' ? Module : {};
Module.onRuntimeInitialized = function() {
  const init_world = Module.cwrap('init_world', 'void', ['number']);
  const generate_chunk = Module.cwrap('generate_chunk', 'number', ['number','number']);
  const free_chunk = Module.cwrap('free_chunk', 'void', ['number']);
  const get_chunk_size = Module.cwrap('get_chunk_size','number',[]);
  const get_chunk_height = Module.cwrap('get_chunk_height','number',[]);

  CHUNK_SIZE = get_chunk_size();
  CHUNK_HEIGHT = get_chunk_height();

  init_world(0);
  setupThree();

  const ptr = generate_chunk(0,0);
  if(ptr === 0){ console.error('Erro ao gerar chunk'); return; }
  const size = CHUNK_SIZE * CHUNK_HEIGHT * CHUNK_SIZE;
  const voxels = new Uint8Array(Module.HEAPU8.buffer, ptr, size);
  buildMeshFromVoxelArray(voxels, 0, 0);
  free_chunk(ptr);
  animate();
};

function setupThree(){
  scene = new THREE.Scene(); scene.background = new THREE.Color(0x87ceeb);
  camera = new THREE.PerspectiveCamera(70, innerWidth/innerHeight, 0.1, 1000);
  camera.position.set(24,24,24); camera.lookAt(8,8,8);
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', ()=> { camera.aspect = innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });

  const hemi = new THREE.HemisphereLight(0xffffee, 0x444455, 0.9); scene.add(hemi);
  const dir = new THREE.DirectionalLight(0xffffff, 0.6); dir.position.set(10,20,10); scene.add(dir);
}

function buildMeshFromVoxelArray(voxels, chunkX, chunkZ){
  const cubeGeom = new THREE.BoxGeometry(1,1,1);
  const mat = new THREE.MeshLambertMaterial();
  const maxCount = CHUNK_SIZE * CHUNK_SIZE * CHUNK_HEIGHT;
  const inst = new THREE.InstancedMesh(cubeGeom, mat, maxCount);
  const dummy = new THREE.Object3D();
  let idx = 0;
  const color = new THREE.Color();
  for(let y=0;y<CHUNK_HEIGHT;y++){
    for(let z=0;z<CHUNK_SIZE;z++){
      for(let x=0;x<CHUNK_SIZE;x++){
        const arrIdx = (y * CHUNK_SIZE + z) * CHUNK_SIZE + x;
        const id = voxels[arrIdx];
        if(!id) continue;
        dummy.position.set(chunkX*CHUNK_SIZE + x + 0.5, y + 0.5, chunkZ*CHUNK_SIZE + z + 0.5);
        dummy.updateMatrix(); inst.setMatrixAt(idx, dummy.matrix);
        color.setHex(blockColors[id] || 0xffffff);
        if(!inst.instanceColor){
          const colors = new Float32Array(maxCount*3);
          inst.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);
        }
        inst.instanceColor.setXYZ(idx, color.r, color.g, color.b);
        idx++;
      }
    }
  }
  inst.count = idx;
  inst.instanceMatrix.needsUpdate = true;
  if(inst.instanceColor) inst.instanceColor.needsUpdate = true;
  scene.add(inst);
}

function animate(){ requestAnimationFrame(animate); renderer.render(scene, camera); }
