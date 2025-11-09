const serverUrl = 'ws://localhost:8139';
const ws = new WebSocket(serverUrl);

ws.onopen = () => {
  console.log('WS aberto (navegador) ->', serverUrl);
  ws.send(JSON.stringify({type:'hello', from:'browser'}));
};

ws.onmessage = (ev) => {
  try {
    const msg = JSON.parse(ev.data);
    console.log('Recebido:', msg);
  } catch(e) {
    console.log('Recebido (não JSON):', ev.data);
  }
};

// minimal three.js demo
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(70, innerWidth/innerHeight, 0.1, 1000);
cam.position.set(15,20,25); cam.lookAt(8,8,8);
const r = new THREE.WebGLRenderer({antialias:true}); r.setSize(innerWidth, innerHeight);
document.body.appendChild(r.domElement);
const light = new THREE.HemisphereLight(0xffffee,0x444455,0.9); scene.add(light);

const geo = new THREE.BoxGeometry(1,1,1);
const mat = new THREE.MeshLambertMaterial({color:0x8B5A2B});
const m = new THREE.Mesh(geo, mat); m.position.set(8,1,8); scene.add(m);

function loop(){ requestAnimationFrame(loop); r.render(scene, cam); }
loop();
