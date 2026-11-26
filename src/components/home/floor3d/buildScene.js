/**
 * Illustrated diorama of a Let's Work floor, built in metres.
 * Colours and furniture are taken from the real photos (yellow feature walls, white desks with
 * lime dividers, long wooden boardroom table, blue lounge sofas, olive slat wall). The layout
 * itself is illustrative, not a measured floor plan.
 *
 * @param {typeof import('three')} THREE
 * @param {any} RoundedBoxGeometry
 */
export function buildScene(THREE, RoundedBoxGeometry) {
  const scene = new THREE.Scene();
  const disposables = [];

  const mat = (color, roughness = 0.7, metalness = 0, extra = {}) => {
    const m = new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
    disposables.push(m);
    return m;
  };
  const glass = new THREE.MeshPhysicalMaterial({ color: '#dfeaec', transparent: true, opacity: 0.16, roughness: 0.05 });
  disposables.push(glass);
  const M = {
    floor: mat('#ebe7df', 0.32),
    plinth: mat('#1c1b19', 0.9),
    wall: mat('#f4f0e7', 0.9),
    yellow: mat('#f0b21d', 0.75),
    olive: mat('#6f7f37', 0.85),
    lime: mat('#8cc63f', 0.55),
    white: mat('#fbfaf6', 0.35),
    ink: mat('#1d1d1d', 0.5),
    chair: mat('#232323', 0.65),
    wood: mat('#d9a23c', 0.3),
    blue: mat('#22398c', 0.92),
    steel: mat('#a3a3a3', 0.3, 0.8),
    screen: mat('#0c0c0c', 0.15, 0.2),
    gold: mat('#c9a24a', 0.25, 0.7),
    leaf: mat('#3d7a3a', 0.8),
    rug: mat('#e3d9c4', 0.95),
    frame: mat('#2b2b2b', 0.5),
    sign: mat('#f5b82e', 0.4, 0, { emissive: '#f5b82e', emissiveIntensity: 0.55 }),
    glass,
  };

  const geoCache = new Map();
  function rounded(w, h, d, r) {
    const key = `${w}|${h}|${d}|${r}`;
    if (!geoCache.has(key)) {
      const radius = Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001);
      geoCache.set(key, new RoundedBoxGeometry(w, h, d, 2, Math.max(0.001, radius)));
    }
    return geoCache.get(key);
  }
  function cyl(rt, rb, h) {
    const key = `c|${rt}|${rb}|${h}`;
    if (!geoCache.has(key)) geoCache.set(key, new THREE.CylinderGeometry(rt, rb, h, 20));
    return geoCache.get(key);
  }

  function addMesh(parent, geometry, material, x, y, z) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  const box = (parent, w, h, d, material, x, y, z, r = 0.025) => addMesh(parent, rounded(w, h, d, r), material, x, y, z);
  const cylinder = (parent, rt, rb, h, material, x, y, z) => addMesh(parent, cyl(rt, rb, h), material, x, y, z);
  function group(x = 0, z = 0, rotY = 0) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = rotY;
    scene.add(g);
    return g;
  }

  // ---------- furniture ----------
  function officeChair(x, z, rotY, scale = 1) {
    const g = group(x, z, rotY);
    g.scale.setScalar(scale);
    cylinder(g, 0.27, 0.27, 0.04, M.chair, 0, 0.05, 0);
    cylinder(g, 0.03, 0.03, 0.36, M.steel, 0, 0.26, 0);
    box(g, 0.5, 0.08, 0.48, M.chair, 0, 0.48, 0, 0.03);
    box(g, 0.48, 0.56, 0.06, M.chair, 0, 0.82, -0.23, 0.03);
  }

  function whiteDesk(x, z, rotY) {
    const g = group(x, z, rotY);
    box(g, 1.4, 0.05, 0.7, M.white, 0, 0.74, 0, 0.015);
    for (const side of [-0.62, 0.62]) {
      for (const tilt of [-0.55, 0.55]) {
        box(g, 0.04, 0.82, 0.04, M.white, side, 0.37, 0, 0.01).rotation.x = tilt; // X-frame legs like the real desks
      }
    }
    box(g, 0.34, 0.015, 0.24, M.steel, 0.1, 0.775, 0.05, 0.005);
    box(g, 0.34, 0.22, 0.012, M.steel, 0.1, 0.88, -0.07, 0.005).rotation.x = -0.25;
  }

  // ---------- shell ----------
  box(scene, 24.6, 0.5, 16.6, M.plinth, 0, -0.36, 0, 0.08);
  box(scene, 24, 0.2, 16, M.floor, 0, -0.1, 0, 0.02);
  box(scene, 24, 3, 0.2, M.wall, 0, 1.5, -8, 0.02);
  box(scene, 0.2, 3, 16, M.wall, -12, 1.5, 0, 0.02);

  // ---------- reception (front-left) ----------
  box(scene, 0.06, 2.6, 4.2, M.yellow, -11.86, 1.4, 5.6, 0.01);
  for (let i = 0; i < 12; i++) box(scene, 0.06, 2.5, 0.12, M.olive, -11.8, 1.35, 3.0 - i * 0.16, 0.01);
  box(scene, 0.05, 0.42, 1.6, M.sign, -11.8, 2.15, 5.8, 0.01);
  const counter = group(-8.6, 5.6, Math.PI / 2);
  box(counter, 2.8, 1.05, 0.6, M.ink, 0, 0.52, 0, 0.02);
  box(counter, 2.95, 0.06, 0.8, M.white, 0, 1.08, 0.08, 0.02);
  officeChair(-9.6, 5.8, Math.PI / 2);

  // ---------- people ----------
  const SHIRTS = [mat('#2c4a8f', 0.85), mat('#f4f1ea', 0.85), mat('#2a2a2a', 0.8), mat('#6f7f37', 0.85), mat('#b5452e', 0.85)];
  const SKINS = [mat('#c98e66', 0.6), mat('#a8774f', 0.6), mat('#b7835c', 0.6)];
  const hair = mat('#1b1b1b', 0.9);
  const capsules = new Map();
  function capsule(r, len) {
    const key = `${r}|${len}`;
    if (!capsules.has(key)) capsules.set(key, new THREE.CapsuleGeometry(r, len, 4, 10));
    return capsules.get(key);
  }
  const sphere = new THREE.SphereGeometry(1, 20, 14);
  disposables.push(sphere);

  /** A member seated on a chair at (x, z) facing +z after rotY. */
  function seated(x, z, rotY, n) {
    const g = group(x, z, rotY);
    const shirt = SHIRTS[n % SHIRTS.length];
    const skin = SKINS[n % SKINS.length];
    addMesh(g, capsule(0.16, 0.34), shirt, 0, 0.9, -0.05);
    addMesh(g, sphere, skin, 0, 1.3, 0).scale.setScalar(0.115);
    addMesh(g, sphere, hair, 0, 1.34, -0.02).scale.set(0.12, 0.09, 0.12);
    for (const side of [-0.1, 0.1]) {
      addMesh(g, capsule(0.07, 0.34), M.ink, side, 0.58, 0.2).rotation.x = Math.PI / 2; // thighs
      addMesh(g, capsule(0.055, 0.38), shirt, side * 2, 0.95, 0.24).rotation.x = Math.PI / 2.4; // forearms to desk
    }
  }

  /** The walking member: returns her limb pivots so the tour can animate them. */
  function walker() {
    const g = new THREE.Group();
    scene.add(g);
    const kurta = mat('#f5b82e', 0.8);
    const scarf = mat('#2f4a3a', 0.85);
    const legs = [];
    const arms = [];
    for (const side of [-0.09, 0.09]) {
      const hip = new THREE.Group();
      hip.position.set(side, 0.9, 0);
      g.add(hip);
      addMesh(hip, capsule(0.075, 0.7), M.ink, 0, -0.45, 0);
      legs.push(hip);
      const shoulder = new THREE.Group();
      shoulder.position.set(side * 2.5, 1.38, 0);
      g.add(shoulder);
      addMesh(shoulder, capsule(0.055, 0.46), kurta, 0, -0.29, 0);
      addMesh(shoulder, sphere, SKINS[0], 0, -0.6, 0).scale.setScalar(0.05);
      arms.push(shoulder);
    }
    addMesh(g, capsule(0.19, 0.5), kurta, 0, 1.15, 0).scale.set(1, 1, 0.8);
    addMesh(g, sphere, SKINS[0], 0, 1.62, 0.02).scale.setScalar(0.115);
    addMesh(g, sphere, scarf, 0, 1.64, -0.03).scale.set(0.135, 0.14, 0.13);
    addMesh(g, capsule(0.12, 0.12), scarf, 0, 1.47, -0.02);
    return { group: g, legs, arms };
  }

  // ---------- hot desks (centre) ----------
  let member = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const x = -3 + col * 1.55;
      const z = -0.6 + row * 2.7;
      whiteDesk(x, z, 0);
      whiteDesk(x, z + 0.72, Math.PI);
      box(scene, 1.4, 0.4, 0.03, M.lime, x, 0.97, z + 0.36, 0.01);
      officeChair(x, z - 0.6, 0);
      officeChair(x, z + 1.32, Math.PI);
      if ((row + col) % 2 === 0) seated(x, z - 0.6, 0, member++);
      if ((row * 3 + col) % 4 === 1) seated(x, z + 1.32, Math.PI, member++);
    }
  }

  // ---------- lounge (front-right) ----------
  box(scene, 6.4, 0.02, 4.6, M.rug, 8.6, 0.01, 4.8, 0.01);
  for (let i = 0; i < 20; i++) box(scene, 0.12, 2.6, 0.06, M.olive, 6.0 + i * 0.3, 1.3, 2.4, 0.01);
  const sofa = group(8.6, 3.4);
  box(sofa, 3.2, 0.42, 0.95, M.blue, 0, 0.3, 0, 0.12);
  box(sofa, 3.2, 0.55, 0.24, M.blue, 0, 0.72, -0.36, 0.1);
  box(sofa, 0.24, 0.62, 0.95, M.blue, -1.6, 0.42, 0, 0.1);
  box(sofa, 0.95, 0.42, 2.0, M.blue, 1.15, 0.3, 1.0, 0.12);
  box(sofa, 0.24, 0.55, 2.0, M.blue, 1.52, 0.72, 1.0, 0.1);
  box(scene, 0.7, 0.4, 0.7, M.blue, 8.0, 0.22, 5.6, 0.12);
  box(scene, 1.2, 0.05, 0.7, M.white, 8.3, 0.46, 4.6, 0.02);
  cylinder(scene, 0.04, 0.04, 0.44, M.steel, 8.3, 0.22, 4.6);
  const plant = group(6.6, 3.3);
  cylinder(plant, 0.26, 0.2, 0.5, M.gold, 0, 0.25, 0);
  for (let i = 0; i < 7; i++) {
    const geo = new THREE.IcosahedronGeometry(0.32 - i * 0.02, 0);
    disposables.push(geo);
    addMesh(plant, geo, M.leaf, Math.sin(i * 1.9) * 0.22, 0.75 + i * 0.16, Math.cos(i * 1.9) * 0.22);
  }

  // ---------- boardroom (back-left) ----------
  box(scene, 7.6, 3, 0.06, M.yellow, -7.2, 1.5, -7.86, 0.01);
  box(scene, 6.6, 0.12, 0.08, M.wall, -7.2, 2.35, -7.8, 0.01);
  box(scene, 0.12, 1.6, 0.08, M.wall, -9.6, 1.6, -7.8, 0.01);
  box(scene, 0.12, 1.6, 0.08, M.wall, -4.8, 1.6, -7.8, 0.01);
  box(scene, 1.6, 0.92, 0.06, M.screen, -7.2, 1.6, -7.78, 0.01);
  box(scene, 7.6, 2.6, 0.04, M.glass, -7.2, 1.3, -2.2, 0.01);
  box(scene, 7.6, 0.06, 0.08, M.steel, -7.2, 2.6, -2.2, 0.01);
  const table = group(-7.2, -5.0);
  box(table, 5.6, 0.07, 1.5, M.wood, 0, 0.76, 0, 0.03);
  for (const lx of [-2.5, 0, 2.5]) box(table, 0.1, 0.72, 1.1, M.ink, lx, 0.36, 0, 0.02);
  for (let i = 0; i < 5; i++) {
    const x = -9.4 + i * 1.1;
    officeChair(x, -6.05, 0);
    officeChair(x, -3.95, Math.PI);
    if (i % 2 === 0) seated(x, -6.05, 0, member++);
    if (i === 1 || i === 3) seated(x, -3.95, Math.PI, member++);
  }
  officeChair(-10.4, -5.0, Math.PI / 2, 1.1);

  // ---------- private office (back-right) ----------
  box(scene, 6.2, 3, 0.06, M.yellow, 7.8, 1.5, -7.86, 0.01);
  for (const [fx, fy] of [[6.2, 1.9], [7.1, 2.1], [8.2, 1.85], [9.2, 2.05]]) {
    box(scene, 0.62, 0.48, 0.04, M.frame, fx, fy, -7.8, 0.01);
    box(scene, 0.5, 0.36, 0.02, M.white, fx, fy, -7.77, 0.005);
  }
  box(scene, 6.2, 2.6, 0.04, M.glass, 7.8, 1.3, -2.6, 0.01);
  box(scene, 6.2, 0.06, 0.08, M.steel, 7.8, 2.6, -2.6, 0.01);
  box(scene, 2.2, 0.72, 0.85, M.ink, 7.8, 0.37, -5.9, 0.02);
  box(scene, 2.4, 0.06, 1.0, M.white, 7.8, 0.76, -5.85, 0.02);
  officeChair(7.8, -6.75, 0, 1.15);
  for (const ax of [6.9, 8.7]) {
    const arm = group(ax, -4.4, Math.PI);
    box(arm, 0.85, 0.45, 0.8, M.blue, 0, 0.28, 0, 0.12);
    box(arm, 0.85, 0.5, 0.18, M.blue, 0, 0.66, -0.32, 0.08);
  }

  // ---------- lights ----------
  scene.add(new THREE.HemisphereLight('#fff7e6', '#3a352c', 1.1));
  const sun = new THREE.DirectionalLight('#fff1d6', 2.1);
  sun.position.set(10, 18, 12);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 14, bottom: -14, near: 1, far: 50 });
  sun.shadow.bias = -0.0004;
  scene.add(sun);
  const fill = new THREE.DirectionalLight('#ffe2a8', 0.45);
  fill.position.set(-12, 8, 6);
  scene.add(fill);

  // floor tiles — a small canvas texture so the floor reads as polished tile, not flat plastic
  const tile = document.createElement('canvas');
  tile.width = tile.height = 256;
  const ctx = tile.getContext('2d');
  ctx.fillStyle = '#efebe4';
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = '#ddd7cc';
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, 256, 256);
  const tileTex = new THREE.CanvasTexture(tile);
  tileTex.wrapS = tileTex.wrapT = THREE.RepeatWrapping;
  tileTex.repeat.set(16, 11);
  tileTex.colorSpace = THREE.SRGBColorSpace;
  M.floor.map = tileTex;
  M.floor.roughness = 0.22;
  M.floor.needsUpdate = true;
  disposables.push(tileTex);

  const person = walker();

  // small "you are here" ring under her feet
  const ringGeo = new THREE.RingGeometry(0.42, 0.52, 48);
  const ringMat = new THREE.MeshBasicMaterial({ color: '#f5b82e', transparent: true, opacity: 0.9, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.03;
  scene.add(ring);
  disposables.push(ringGeo, ringMat);

  function dispose() {
    geoCache.forEach((g) => g.dispose());
    capsules.forEach((g) => g.dispose());
    disposables.forEach((d) => d.dispose?.());
  }

  return { scene, ring, person, dispose };
}

/**
 * Her route through the aisles (x, z). `stop` marks the waypoint she reaches at each camera stop;
 * the points in between keep her out of desks, sofas and glass.
 */
export const ROUTE = [
  { p: [-5.0, 7.5], stop: 0 },
  { p: [-7.3, 5.6], stop: 1 },
  { p: [-4.6, 7.3] },
  { p: [3.2, 7.3] },
  { p: [3.2, 2.6], stop: 2 },
  { p: [7.0, 5.0], stop: 3 },
  { p: [3.2, 4.2] },
  { p: [3.2, -1.85] },
  { p: [-3.0, -1.85] },
  { p: [-3.7, -5.0], stop: 4 },
  { p: [5.4, -4.2], stop: 5 },
  { p: [5.6, -4.0], stop: 6 },
];

/** Camera stops, in scroll order. pos = camera position, look = target, mark = ring position. */
export const STOPS = [
  { pos: [15, 17, 19], look: [0, 0, 0], mark: [0, 0, 20] },
  { pos: [-3.5, 3.4, 11.5], look: [-8.8, 0.9, 5.4], mark: [-7.6, 0, 5.6] },
  { pos: [4.6, 4.4, 9.8], look: [0.6, 0.6, 1.6], mark: [-0.7, 0, 2.6] },
  { pos: [5.2, 2.8, 11], look: [9.0, 0.7, 4.4], mark: [8.4, 0, 5.4] },
  { pos: [-4.2, 4.2, 3.2], look: [-7.4, 0.8, -5.2], mark: [-7.2, 0, -3.2] },
  { pos: [6.0, 3.9, 2.6], look: [7.8, 0.8, -5.6], mark: [7.8, 0, -4.0] },
  { pos: [-17, 19, 17], look: [0, 0, 0], mark: [0, 0, 20] },
];
