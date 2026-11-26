/**
 * Illustrated diorama of a Let's Work floor, built in metres.
 * Colours and furniture follow the real photos (yellow feature walls, white desks with lime
 * dividers, long wooden boardroom table, blue lounge sofas, olive slat wall). The layout is
 * illustrative, not a measured floor plan.
 *
 * @param {typeof import('three')} THREE
 * @param {{ RoundedBoxGeometry: any, mergeGeometries: Function }} addons
 */
export function buildScene(THREE, { RoundedBoxGeometry, mergeGeometries }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#151413');
  const disposables = [];
  const keep = (x) => {
    disposables.push(x);
    return x;
  };

  // ---------- textures (generated, so nothing extra to download) ----------
  function canvasTexture(size, paint, repeat = [1, 1]) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    paint(c.getContext('2d'), size);
    const t = keep(new THREE.CanvasTexture(c));
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(...repeat);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }
  const tileTex = canvasTexture(256, (g, s) => {
    g.fillStyle = '#e4ded3';
    g.fillRect(0, 0, s, s);
    g.strokeStyle = '#cbc3b5';
    g.lineWidth = 2;
    g.strokeRect(1, 1, s - 2, s - 2);
  }, [20, 13]);
  const woodTex = canvasTexture(512, (g, s) => {
    g.fillStyle = '#d6a046';
    g.fillRect(0, 0, s, s);
    for (let i = 0; i < 140; i++) {
      g.strokeStyle = `rgba(${120 + Math.random() * 40},${70 + Math.random() * 30},20,${0.08 + Math.random() * 0.12})`;
      g.lineWidth = 1 + Math.random() * 2;
      const y = Math.random() * s;
      g.beginPath();
      g.moveTo(0, y);
      g.bezierCurveTo(s * 0.3, y + 6, s * 0.6, y - 6, s, y + Math.random() * 4);
      g.stroke();
    }
  }, [2, 1]);
  const fabricTex = canvasTexture(128, (g, s) => {
    const img = g.createImageData(s, s);
    for (let i = 0; i < img.data.length; i += 4) {
      const n = 200 + Math.random() * 55;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = n;
      img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
  }, [4, 4]);

  // ---------- materials ----------
  const std = (color, roughness = 0.7, metalness = 0, extra = {}) => keep(new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra }));
  const phys = (opts) => keep(new THREE.MeshPhysicalMaterial(opts));
  const M = {
    floor: phys({ color: '#ffffff', map: tileTex, roughness: 0.16, clearcoat: 0.5, clearcoatRoughness: 0.25 }),
    plinth: std('#1c1b19', 0.9),
    wall: std('#f2eee6', 0.92),
    yellow: std('#f0b21d', 0.78),
    olive: std('#6c7c35', 0.8),
    lime: std('#8cc63f', 0.5),
    white: std('#fbfaf6', 0.3),
    ink: std('#1d1d1d', 0.45),
    chair: std('#202020', 0.6),
    wood: std('#ffffff', 0.35, 0, { map: woodTex }),
    blue: phys({ color: '#24408f', roughness: 0.95, map: fabricTex, sheen: 0.6, sheenColor: new THREE.Color('#6d86d6') }),
    steel: std('#b5b5b5', 0.25, 0.9),
    screen: std('#0b0d12', 0.15, 0.3),
    screenOn: std('#2b3f66', 0.3, 0, { emissive: '#3a5a9a', emissiveIntensity: 0.6 }),
    gold: std('#c9a24a', 0.25, 0.8),
    leaf: std('#3d7a3a', 0.75),
    leafDark: std('#2c5b2b', 0.8),
    rug: std('#e1d6bf', 1, 0, { map: fabricTex }),
    frame: std('#2b2b2b', 0.5),
    windowPane: std('#dbe9f2', 0.1, 0, { emissive: '#cfe4f5', emissiveIntensity: 0.9 }),
    bulb: std('#fff4d6', 0.3, 0, { emissive: '#ffd98a', emissiveIntensity: 2.2 }),
    glass: phys({ color: '#e5eef0', transparent: true, opacity: 0.14, roughness: 0.04, metalness: 0 }),
  };

  // ---------- geometry helpers (cached) ----------
  const geoCache = new Map();
  const cached = (key, make) => {
    if (!geoCache.has(key)) geoCache.set(key, make());
    return geoCache.get(key);
  };
  const rounded = (w, h, d, r) =>
    cached(`b|${w}|${h}|${d}|${r}`, () => {
      const radius = Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001);
      return new RoundedBoxGeometry(w, h, d, 2, Math.max(0.001, radius));
    });
  const cyl = (rt, rb, h, seg = 24) => cached(`c|${rt}|${rb}|${h}|${seg}`, () => new THREE.CylinderGeometry(rt, rb, h, seg));
  const capsule = (r, len) => cached(`k|${r}|${len}`, () => new THREE.CapsuleGeometry(r, len, 6, 14));
  const sphere = cached('sphere', () => new THREE.SphereGeometry(1, 28, 20));

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
  function group(x = 0, z = 0, rotY = 0, parent = scene) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = rotY;
    parent.add(g);
    return g;
  }

  // ---------- chair: one merged 5-star base, so 40 chairs stay cheap ----------
  const chairBase = cached('chairBase', () => {
    const parts = [new THREE.CylinderGeometry(0.035, 0.035, 0.32, 12).translate(0, 0.26, 0)];
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      parts.push(new THREE.BoxGeometry(0.04, 0.03, 0.3).translate(0, 0.08, 0.15).rotateY(a));
      parts.push(new THREE.SphereGeometry(0.035, 10, 8).translate(Math.sin(a) * 0.3, 0.035, Math.cos(a) * 0.3));
    }
    const merged = mergeGeometries(parts);
    parts.forEach((p) => p.dispose());
    return merged;
  });

  function officeChair(x, z, rotY, scale = 1) {
    const g = group(x, z, rotY);
    g.scale.setScalar(scale);
    addMesh(g, chairBase, M.steel, 0, 0, 0);
    box(g, 0.5, 0.09, 0.48, M.chair, 0, 0.47, 0, 0.04);
    const back = box(g, 0.46, 0.55, 0.06, M.chair, 0, 0.82, -0.25, 0.04);
    back.rotation.x = -0.12;
    box(g, 0.05, 0.05, 0.3, M.chair, -0.25, 0.64, -0.04, 0.02);
    box(g, 0.05, 0.05, 0.3, M.chair, 0.25, 0.64, -0.04, 0.02);
  }

  function whiteDesk(x, z, rotY, withMonitor) {
    const g = group(x, z, rotY);
    box(g, 1.4, 0.04, 0.7, M.white, 0, 0.74, 0, 0.012);
    for (const side of [-0.62, 0.62]) {
      for (const tilt of [-0.55, 0.55]) box(g, 0.035, 0.82, 0.035, M.white, side, 0.37, 0, 0.01).rotation.x = tilt;
    }
    if (withMonitor) {
      box(g, 0.56, 0.34, 0.025, M.screen, -0.25, 1.06, -0.2, 0.01);
      box(g, 0.52, 0.3, 0.01, M.screenOn, -0.25, 1.06, -0.185, 0.005);
      cylinder(g, 0.02, 0.02, 0.16, M.steel, -0.25, 0.84, -0.22);
      box(g, 0.18, 0.012, 0.12, M.steel, -0.25, 0.765, -0.22, 0.004);
    }
    box(g, 0.34, 0.015, 0.24, M.steel, 0.25, 0.77, 0.05, 0.005);
    box(g, 0.34, 0.22, 0.012, M.steel, 0.25, 0.88, -0.07, 0.005).rotation.x = -0.28;
    cylinder(g, 0.04, 0.035, 0.09, M.white, 0.55, 0.8, 0.15); // mug
  }

  function plant(x, z, size = 1) {
    const g = group(x, z);
    g.scale.setScalar(size);
    cylinder(g, 0.24, 0.18, 0.46, M.gold, 0, 0.23, 0);
    for (let i = 0; i < 14; i++) {
      const leaf = addMesh(g, sphere, i % 2 ? M.leaf : M.leafDark, Math.sin(i * 2.4) * 0.22, 0.6 + i * 0.07, Math.cos(i * 2.4) * 0.22);
      leaf.scale.set(0.18, 0.06, 0.32);
      leaf.rotation.set(0.6 * Math.sin(i), i * 2.4, 0.4);
    }
  }

  function pendant(x, z) {
    const g = group(x, z);
    addMesh(g, cyl(0.006, 0.006, 1.2, 6), M.ink, 0, 3.0, 0).castShadow = false;
    addMesh(g, cyl(0.06, 0.26, 0.24, 24), M.ink, 0, 2.3, 0).castShadow = false;
    addMesh(g, sphere, M.bulb, 0, 2.2, 0).scale.setScalar(0.07);
  }

  // ---------- people ----------
  const SKINS = [std('#c98e66', 0.55), std('#a8774f', 0.55), std('#b7835c', 0.55)];
  const SHIRTS = [std('#2c4a8f', 0.85), std('#f4f1ea', 0.85), std('#2a2a2a', 0.8), std('#6f7f37', 0.85), std('#b5452e', 0.85), std('#d9c7a0', 0.85)];
  const HIJABS = [std('#2f4a3a', 0.85), std('#7a2f3a', 0.85), std('#1f2f5a', 0.85)];
  const hair = std('#151515', 0.85);
  const trousers = std('#22252b', 0.8);

  function head(parent, y, z, n, hijab) {
    addMesh(parent, capsule(0.045, 0.06), SKINS[n % 3], 0, y - 0.15, z); // neck
    addMesh(parent, sphere, SKINS[n % 3], 0, y, z).scale.set(0.105, 0.125, 0.11);
    if (hijab) {
      addMesh(parent, sphere, HIJABS[n % 3], 0, y + 0.01, z - 0.015).scale.set(0.125, 0.145, 0.125);
      addMesh(parent, capsule(0.1, 0.06), HIJABS[n % 3], 0, y - 0.15, z - 0.01).scale.set(1.2, 1, 1);
    } else {
      addMesh(parent, sphere, hair, 0, y + 0.04, z - 0.02).scale.set(0.11, 0.1, 0.115);
    }
  }

  /** A member seated on a chair at (x, z), facing +z after rotY. */
  function seated(x, z, rotY, n) {
    const g = group(x, z, rotY);
    const shirt = SHIRTS[n % SHIRTS.length];
    const woman = n % 3 === 1;
    addMesh(g, capsule(0.15, 0.3), woman ? std('#f5b82e', 0.8) : shirt, 0, 0.86, -0.06).scale.set(1.15, 1, 0.8);
    head(g, 1.32, -0.04, n, woman);
    for (const side of [-1, 1]) {
      addMesh(g, capsule(0.068, 0.34), trousers, side * 0.1, 0.56, 0.18).rotation.x = Math.PI / 2;
      addMesh(g, capsule(0.06, 0.36), trousers, side * 0.1, 0.3, 0.38);
      const upper = addMesh(g, capsule(0.05, 0.22), woman ? std('#f5b82e', 0.8) : shirt, side * 0.2, 0.92, 0.02);
      upper.rotation.x = 0.5;
      const fore = addMesh(g, capsule(0.045, 0.24), SKINS[n % 3], side * 0.17, 0.8, 0.22);
      fore.rotation.x = Math.PI / 2.3;
    }
  }

  /** The walking member: returns her limb pivots so the tour can animate them. */
  function walker() {
    const g = new THREE.Group();
    scene.add(g);
    const kurta = std('#f5b82e', 0.75);
    const legs = [];
    const arms = [];
    for (const side of [-1, 1]) {
      const hip = new THREE.Group();
      hip.position.set(side * 0.09, 0.92, 0);
      g.add(hip);
      addMesh(hip, capsule(0.07, 0.72), trousers, 0, -0.44, 0);
      addMesh(hip, rounded(0.11, 0.07, 0.24, 0.03), M.ink, 0, -0.86, 0.05);
      legs.push(hip);
      const shoulder = new THREE.Group();
      shoulder.position.set(side * 0.2, 1.4, 0);
      g.add(shoulder);
      addMesh(shoulder, capsule(0.052, 0.46), kurta, 0, -0.27, 0);
      addMesh(shoulder, sphere, SKINS[0], 0, -0.57, 0).scale.setScalar(0.05);
      arms.push(shoulder);
    }
    addMesh(g, capsule(0.18, 0.56), kurta, 0, 1.12, 0).scale.set(1.1, 1, 0.75); // long kurta
    head(g, 1.64, 0.01, 0, true);
    addMesh(g, rounded(0.26, 0.3, 0.08, 0.03), std('#efe6d2', 0.9), -0.24, 1.0, -0.02); // tote bag
    return { group: g, legs, arms };
  }

  // ---------- shell ----------
  box(scene, 24.6, 0.5, 16.6, M.plinth, 0, -0.36, 0, 0.08);
  addMesh(scene, new THREE.BoxGeometry(24, 0.2, 16), M.floor, 0, -0.1, 0);
  box(scene, 24, 3, 0.2, M.wall, 0, 1.5, -8, 0.02);
  box(scene, 0.2, 3, 16, M.wall, -12, 1.5, 0, 0.02);
  // daylight windows on the back wall, between the two yellow rooms
  for (const wx of [-2.2, 0.4, 3.0]) {
    box(scene, 2.2, 2.0, 0.08, M.frame, wx, 1.6, -7.88, 0.01);
    addMesh(scene, rounded(2.05, 1.85, 0.04, 0.005), M.windowPane, wx, 1.6, -7.84).castShadow = false;
    box(scene, 0.04, 1.85, 0.06, M.frame, wx, 1.6, -7.82, 0.005);
  }

  // ---------- reception (front-left) ----------
  box(scene, 0.06, 2.6, 4.2, M.yellow, -11.86, 1.4, 5.6, 0.01);
  for (let i = 0; i < 12; i++) box(scene, 0.06, 2.5, 0.12, M.olive, -11.8, 1.35, 3.0 - i * 0.16, 0.01);
  const logoPanel = box(scene, 0.05, 0.62, 2.6, M.ink, -11.8, 2.1, 5.7, 0.02);
  logoPanel.castShadow = false;
  const logoTex = keep(new THREE.TextureLoader().load('/img/logo.png'));
  logoTex.colorSpace = THREE.SRGBColorSpace;
  const logoMat = keep(new THREE.MeshBasicMaterial({ map: logoTex, transparent: true }));
  const logo = new THREE.Mesh(keep(new THREE.PlaneGeometry(2.3, 0.41)), logoMat);
  logo.position.set(-11.76, 2.1, 5.7);
  logo.rotation.y = Math.PI / 2;
  scene.add(logo);
  const counter = group(-8.6, 5.6, Math.PI / 2);
  box(counter, 2.8, 1.05, 0.6, M.ink, 0, 0.52, 0, 0.02);
  box(counter, 2.95, 0.06, 0.8, M.white, 0, 1.08, 0.08, 0.02);
  officeChair(-9.6, 5.8, Math.PI / 2);
  plant(-11.2, 7.3, 1.1);

  // ---------- hot desks (centre) ----------
  let member = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const x = -3 + col * 1.55;
      const z = -0.6 + row * 2.7;
      whiteDesk(x, z, 0, (row + col) % 2 === 0);
      whiteDesk(x, z + 0.72, Math.PI, (row + col) % 2 === 1);
      box(scene, 1.4, 0.4, 0.03, M.lime, x, 0.97, z + 0.36, 0.01);
      officeChair(x, z - 0.6, 0);
      officeChair(x, z + 1.32, Math.PI);
      if ((row + col) % 2 === 0) seated(x, z - 0.6, 0, member++);
      if ((row * 3 + col) % 4 === 1) seated(x, z + 1.32, Math.PI, member++);
    }
    pendant(-2.2, -0.24 + row * 2.7);
    pendant(0.9, -0.24 + row * 2.7);
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
  for (const cx of [-1.0, 0, 1.0]) box(sofa, 0.85, 0.1, 0.7, M.blue, cx, 0.56, 0.08, 0.05);
  box(scene, 0.7, 0.4, 0.7, M.blue, 8.0, 0.22, 5.6, 0.12);
  box(scene, 1.2, 0.04, 0.7, M.wood, 8.3, 0.46, 4.6, 0.02);
  cylinder(scene, 0.04, 0.04, 0.44, M.steel, 8.3, 0.22, 4.6);
  plant(6.6, 3.3, 1.2);
  seated(7.6, 3.5, 0, 7);

  // ---------- boardroom (back-left) ----------
  box(scene, 7.6, 3, 0.06, M.yellow, -7.2, 1.5, -7.86, 0.01);
  box(scene, 6.6, 0.12, 0.08, M.wall, -7.2, 2.35, -7.8, 0.01);
  box(scene, 0.12, 1.6, 0.08, M.wall, -9.6, 1.6, -7.8, 0.01);
  box(scene, 0.12, 1.6, 0.08, M.wall, -4.8, 1.6, -7.8, 0.01);
  box(scene, 1.6, 0.92, 0.06, M.screen, -7.2, 1.6, -7.78, 0.01);
  box(scene, 1.5, 0.82, 0.01, M.screenOn, -7.2, 1.6, -7.74, 0.005);
  addMesh(scene, rounded(7.6, 2.6, 0.04, 0.01), M.glass, -7.2, 1.3, -2.2).castShadow = false;
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
    box(scene, 0.32, 0.012, 0.22, M.steel, x, 0.8, -5.55, 0.004);
  }
  officeChair(-10.4, -5.0, Math.PI / 2, 1.1);
  plant(-11.3, -7.3, 1.1);

  // ---------- private office (back-right) ----------
  box(scene, 6.2, 3, 0.06, M.yellow, 7.8, 1.5, -7.86, 0.01);
  for (const [fx, fy] of [[6.2, 1.9], [7.1, 2.1], [8.2, 1.85], [9.2, 2.05]]) {
    box(scene, 0.62, 0.48, 0.04, M.frame, fx, fy, -7.8, 0.01);
    box(scene, 0.5, 0.36, 0.02, M.white, fx, fy, -7.77, 0.005);
  }
  addMesh(scene, rounded(6.2, 2.6, 0.04, 0.01), M.glass, 7.8, 1.3, -2.6).castShadow = false;
  box(scene, 6.2, 0.06, 0.08, M.steel, 7.8, 2.6, -2.6, 0.01);
  box(scene, 2.2, 0.72, 0.85, M.ink, 7.8, 0.37, -5.9, 0.02);
  box(scene, 2.4, 0.05, 1.0, M.wood, 7.8, 0.76, -5.85, 0.02);
  box(scene, 0.56, 0.34, 0.025, M.screen, 7.4, 1.08, -6.15, 0.01);
  box(scene, 0.52, 0.3, 0.01, M.screenOn, 7.4, 1.08, -6.13, 0.005);
  officeChair(7.8, -6.75, 0, 1.15);
  seated(7.8, -6.75, 0, 4);
  for (const ax of [6.9, 8.7]) {
    const arm = group(ax, -4.4, Math.PI);
    box(arm, 0.85, 0.45, 0.8, M.blue, 0, 0.28, 0, 0.12);
    box(arm, 0.85, 0.5, 0.18, M.blue, 0, 0.66, -0.32, 0.08);
  }
  plant(10.4, -7.2, 1.0);

  // ---------- lights ----------
  scene.add(new THREE.HemisphereLight('#fff6e8', '#3a352c', 0.55));
  const sun = new THREE.DirectionalLight('#fff0d4', 2.6);
  sun.position.set(9, 16, 11);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 14, bottom: -14, near: 1, far: 50 });
  sun.shadow.bias = -0.0003;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);
  const windowLight = new THREE.DirectionalLight('#cfe2ff', 0.7);
  windowLight.position.set(0, 6, -14);
  scene.add(windowLight);
  for (const z of [-0.24, 2.46, 5.16]) {
    const lamp = new THREE.PointLight('#ffd58a', 1.4, 5, 2);
    lamp.position.set(-0.6, 2.05, z);
    scene.add(lamp);
  }

  const person = walker();

  // small "you are here" ring under her feet
  const ringGeo = keep(new THREE.RingGeometry(0.42, 0.52, 48));
  const ringMat = keep(new THREE.MeshBasicMaterial({ color: '#f5b82e', transparent: true, opacity: 0.9, side: THREE.DoubleSide }));
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.012;
  scene.add(ring);

  function dispose() {
    geoCache.forEach((g) => g.dispose());
    disposables.forEach((d) => d.dispose?.());
  }

  return { scene, ring, person, dispose };
}

/** Camera stops, in scroll order: pos = camera position, look = target. Low, close angles read more real. */
export const STOPS = [
  { pos: [13, 13, 17], look: [0, 0.4, 0] },
  { pos: [-4.2, 2.6, 10.4], look: [-9.4, 1.1, 5.4] },
  { pos: [5.2, 3.0, 8.4], look: [0.2, 0.8, 2.0] },
  { pos: [4.6, 2.2, 9.6], look: [9.2, 0.7, 4.0] },
  { pos: [-3.4, 3.1, 1.2], look: [-7.6, 0.8, -5.4] },
  { pos: [5.0, 2.9, 0.8], look: [8.0, 0.9, -5.8] },
  { pos: [-15, 15, 15], look: [0, 0.4, 0] },
];

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
  { p: [6.6, 5.4], stop: 3 },
  { p: [3.2, 4.2] },
  { p: [3.2, -1.85] },
  { p: [-3.0, -1.85] },
  { p: [-3.7, -5.0], stop: 4 },
  { p: [5.4, -4.2], stop: 5 },
  { p: [5.6, -4.0], stop: 6 },
];
