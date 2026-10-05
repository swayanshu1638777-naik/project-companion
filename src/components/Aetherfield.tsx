import { Canvas, ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { ArrowLeft, ArrowUpRight, Hand, RotateCcw, Sparkles, Trash2, Undo2, Volume2, VolumeX } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";

type Material = "moss" | "clay" | "stone" | "bloom" | "glow";
type Block = { x: number; y: number; z: number; material: Material };
type Action = { key: string; before: Block | null; after: Block | null };
const MATERIALS: { id: Material; label: string; color: string; side: string }[] = [
  { id: "moss", label: "Meadow", color: "#a8d7aa", side: "#739d84" },
  { id: "clay", label: "Peach clay", color: "#efa78a", side: "#bd7b77" },
  { id: "stone", label: "Moonstone", color: "#b3a9c9", side: "#827b9f" },
  { id: "bloom", label: "Wildflower", color: "#f3d776", side: "#d7a969" },
  { id: "glow", label: "Glowglass", color: "#a1dddb", side: "#69b8bc" },
];
const keyOf = (x: number, y: number, z: number) => `${x},${y},${z}`;
const hash = (x: number, z: number) => Math.abs(Math.sin(x * 127.1 + z * 311.7) * 43758.5453) % 1;

function initialWorld() {
  const world = new Map<string, Block>();
  for (let x = -8; x <= 8; x++) for (let z = -8; z <= 8; z++) {
    const distance = Math.hypot(x * 0.93, z * 1.04);
    if (distance > 7.7 + (hash(x, z) - 0.5) * 1.3) continue;
    const height = Math.max(1, Math.round(2.8 - distance * 0.21 + Math.sin(x * 0.53) * 0.52 + Math.cos(z * 0.63) * 0.5));
    for (let y = -2; y <= height; y++) {
      if (y < -1 && distance > 5.8) continue;
      const material: Material = y === height ? (hash(x + 5, z - 4) > 0.94 ? "bloom" : "moss") : (y >= height - 1 && hash(x, z) > 0.8 ? "clay" : "stone");
      world.set(keyOf(x, y, z), { x, y, z, material });
    }
    if (height > 1 && distance < 6.4 && hash(x + 31, z + 17) > 0.975) {
      world.set(keyOf(x, height + 1, z), { x, y: height + 1, z, material: "glow" });
    }
  }
  return world;
}

function VoxelWorld({ blocks, selected, mode, onEdit }: {
  blocks: Map<string, Block>; selected: Material; mode: "place" | "remove";
  onEdit: (target: Block, normal: THREE.Vector3) => void;
}) {
  const [hovered, setHovered] = useState<{ block: Block; normal: THREE.Vector3 } | null>(null);
  const grouped = useMemo(() => MATERIALS.map(({ id }) => ({ id, blocks: Array.from(blocks.values()).filter((b) => b.material === id) })), [blocks]);
  const materials = useMemo(() => MATERIALS.map(({ color, side, id }) => [
    new THREE.MeshStandardMaterial({ color: side, roughness: id === "glow" ? 0.25 : 0.92, metalness: id === "glow" ? 0.22 : 0 }),
    new THREE.MeshStandardMaterial({ color: side, roughness: 0.92 }),
    new THREE.MeshStandardMaterial({ color, roughness: id === "glow" ? 0.27 : 0.95, metalness: id === "glow" ? 0.22 : 0 }),
    new THREE.MeshStandardMaterial({ color: side, roughness: 0.92 }),
    new THREE.MeshStandardMaterial({ color: side, roughness: 0.92 }),
    new THREE.MeshStandardMaterial({ color: side, roughness: 0.92 }),
  ]), []);
  useEffect(() => () => materials.flat().forEach((material) => material.dispose()), [materials]);
  const refs = useRef<(THREE.InstancedMesh | null)[]>([]);
  useEffect(() => {
    const dummy = new THREE.Object3D();
    grouped.forEach(({ blocks: items }, groupIndex) => {
      const mesh = refs.current[groupIndex];
      if (!mesh) return;
      items.forEach((block, i) => {
        dummy.position.set(block.x, block.y, block.z);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingSphere();
    });
  }, [grouped]);
  const preview = hovered && (mode === "remove" ? hovered.block : {
    x: hovered.block.x + Math.round(hovered.normal.x),
    y: hovered.block.y + Math.round(hovered.normal.y),
    z: hovered.block.z + Math.round(hovered.normal.z),
  });
  const validPreview = preview && (mode === "remove" || (!blocks.has(keyOf(preview.x, preview.y, preview.z)) && preview.y <= 9 && preview.y >= -3));
  return <group onPointerMissed={() => setHovered(null)}>
    {grouped.map(({ id, blocks: items }, groupIndex) => items.length && materials[groupIndex] ? (
      <instancedMesh key={id} ref={(mesh) => { refs.current[groupIndex] = mesh; }} args={[undefined, undefined, items.length]} material={materials[groupIndex]} castShadow receiveShadow
        onPointerMove={(event: ThreeEvent<PointerEvent>) => {
          event.stopPropagation();
          const block = items[event.instanceId ?? -1];
          if (block && event.face) setHovered({ block, normal: event.face.normal.clone() });
        }}
        onPointerOut={() => setHovered(null)}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          event.stopPropagation();
          const block = items[event.instanceId ?? -1];
          if (block && event.face) onEdit(block, event.face.normal.clone());
        }}
      ><boxGeometry args={[0.992, 0.992, 0.992]} /></instancedMesh>
    ) : null)}
    {validPreview && <mesh position={[preview.x, preview.y, preview.z]} raycast={() => null}>
      <boxGeometry args={[1.035, 1.035, 1.035]} />
      <meshBasicMaterial color={mode === "remove" ? "#f08c79" : (MATERIALS.find((m) => m.id === selected)?.color ?? "#a8d7aa")} transparent opacity={0.35} depthWrite={false} />
    </mesh>}
  </group>;
}

function Atmosphere() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    if (group.current) {
      group.current.rotation.y += dt * 0.035;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.48) * 0.16;
    }
  });
  const particles = useMemo(() => Array.from({ length: 36 }, (_, i) => {
    const a = i * 2.39996;
    const r = 8.9 + hash(i, 14) * 5;
    return [Math.cos(a) * r, -2 + hash(i, 8) * 9, Math.sin(a) * r] as [number, number, number];
  }), []);
  return <>
    <group ref={group}>
      {particles.map((position, i) => <mesh position={position} key={i} scale={0.055 + hash(i, 29) * 0.065}>
        <icosahedronGeometry args={[1, 0]} /><meshBasicMaterial color={i % 3 === 0 ? "#e6b87e" : "#fff1cd"} transparent opacity={0.8} />
      </mesh>)}
    </group>
    <mesh position={[0, -6.3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[11.8, 64]} /><meshBasicMaterial color="#d7e8e1" transparent opacity={0.24} depthWrite={false} />
    </mesh>
  </>;
}

function Scene({ blocks, selected, mode, onEdit }: {
  blocks: Map<string, Block>; selected: Material; mode: "place" | "remove";
  onEdit: (target: Block, normal: THREE.Vector3) => void;
}) {
  const { camera, size } = useThree();
  useEffect(() => {
    const narrow = size.width < 650;
    camera.position.set(narrow ? 25 : 18, narrow ? 19 : 13, narrow ? 27 : 19);
    camera.lookAt(0, 0, 0);
  }, [camera, size.width]);
  return <>
    <color attach="background" args={["#d9ebe7"]} />
    <fog attach="fog" args={["#d9ebe7", 24, 60]} />
    <hemisphereLight args={["#f7f2de", "#83a99f", 2.3]} />
    <ambientLight intensity={0.55} />
    <directionalLight position={[-6, 15, 9]} intensity={2.1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-camera-left={-17} shadow-camera-right={17} shadow-camera-top={17} shadow-camera-bottom={-17} />
    <Environment><Lightformer intensity={1.5} position={[0, 9, 4]} scale={[14, 10, 1]} /><Lightformer intensity={0.7} color="#f7d7ae" position={[-9, 2, -3]} scale={[10, 6, 1]} /></Environment>
    <Atmosphere />
    <VoxelWorld blocks={blocks} selected={selected} mode={mode} onEdit={onEdit} />
    <OrbitControls makeDefault target={[0, 0, 0]} minDistance={11} maxDistance={39} minPolarAngle={0.22} maxPolarAngle={Math.PI / 2.05} enablePan={false} enableDamping dampingFactor={0.07} rotateSpeed={0.65} />
  </>;
}

function soundClick(type: "place" | "remove") {
  try {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(type === "place" ? 490 : 300, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(type === "place" ? 680 : 170, context.currentTime + 0.12);
    gain.gain.setValueAtTime(0.045, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.15);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(); oscillator.stop(context.currentTime + 0.15);
    oscillator.onended = () => { void context.close(); };
  } catch { /* Sound is optional when audio isn't available. */ }
}

export function Aetherfield() {
  const [blocks, setBlocks] = useState(initialWorld);
  const [selected, setSelected] = useState<Material>("moss");
  const [mode, setMode] = useState<"place" | "remove">("place");
  const [history, setHistory] = useState<Action[]>([]);
  const [sound, setSound] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
  const [edits, setEdits] = useState(0);
  const soundRef = useRef(sound);
  soundRef.current = sound;
  const onEdit = useCallback((target: Block, normal: THREE.Vector3) => {
    const x = target.x + (mode === "place" ? Math.round(normal.x) : 0);
    const y = target.y + (mode === "place" ? Math.round(normal.y) : 0);
    const z = target.z + (mode === "place" ? Math.round(normal.z) : 0);
    if (y > 9 || y < -3) return;
    const key = keyOf(x, y, z);
    if (mode === "place" && blocks.has(key)) return;
    const before = blocks.get(key) ?? null;
    const after = mode === "place" ? { x, y, z, material: selected } : null;
    setBlocks((previous) => {
      const next = new Map(previous);
      if (after) next.set(key, after); else next.delete(key);
      return next;
    });
    setHistory((previous) => [...previous, { key, before, after }]);
    setEdits((n) => n + 1);
    setShowHelp(false);
    if (soundRef.current) soundClick(mode);
  }, [blocks, mode, selected]);
  const undo = useCallback(() => {
    const last = history.at(-1);
    if (!last) return;
    setBlocks((previous) => {
      const next = new Map(previous);
      if (last.before) next.set(last.key, last.before); else next.delete(last.key);
      return next;
    });
    setHistory((previous) => previous.slice(0, -1));
    setEdits((n) => Math.max(0, n - 1));
  }, [history]);
  const reset = () => { setBlocks(initialWorld()); setHistory([]); setEdits(0); setShowHelp(true); };
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key >= "1" && event.key <= "5") { const material = MATERIALS[Number(event.key) - 1]; if (material) { setSelected(material.id); setMode("place"); } }
      if (event.key.toLowerCase() === "x") setMode((previous) => previous === "place" ? "remove" : "place");
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z") { event.preventDefault(); undo(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo]);
  return <main className="world-screen relative h-dvh min-h-[580px] overflow-hidden bg-world-sky text-world-ink font-sans">
    <div className="absolute inset-0"><Canvas shadows dpr={[1, 1.7]} camera={{ position: [18, 13, 19], fov: 42, near: 0.1, far: 100 }} gl={{ antialias: true }}><Scene blocks={blocks} selected={selected} mode={mode} onEdit={onEdit} /></Canvas></div>

    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between">
      <header className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-9 sm:pt-8">
        <div className="pointer-events-auto flex items-start gap-3 sm:gap-5">
          <Button variant="ghost" size="icon" className="world-icon mt-1 size-9 rounded-full bg-world-panel/80 text-world-ink hover:bg-world-panel" aria-label="Back to Smart College" title="Back to Smart College" asChild><Link to="/"><ArrowLeft /></Link></Button>
          <div><div className="flex items-center gap-2 text-[10px] font-bold uppercase text-world-subtle"><Sparkles className="size-3 text-world-accent" /> A LITTLE WORLD TO SHAPE</div><h1 className="font-display text-4xl font-bold uppercase leading-none text-world-ink sm:text-6xl">Aetherfield<span className="text-world-accent">.</span></h1></div>
        </div>
        <div className="pointer-events-auto flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => setSound((v) => !v)} title={sound ? "Mute sound" : "Enable sound"} aria-label={sound ? "Mute sound" : "Enable sound"} className="world-icon size-9 rounded-full bg-world-panel/80 text-world-ink hover:bg-world-panel">{sound ? <Volume2 /> : <VolumeX />}</Button>
          <Button variant="ghost" size="icon" onClick={reset} title="Reset world" aria-label="Reset world" className="world-icon size-9 rounded-full bg-world-panel/80 text-world-ink hover:bg-world-panel"><RotateCcw /></Button>
        </div>
      </header>

      <div className="absolute right-5 top-28 hidden text-right sm:right-9 sm:top-36 md:block">
        <div className="font-display text-7xl font-semibold leading-none text-world-ink/15">{String(edits).padStart(2, "0")}</div>
        <div className="text-[10px] font-bold uppercase text-world-subtle">changes made</div>
      </div>

      {showHelp && <div className="pointer-events-none absolute left-1/2 top-[23%] w-max max-w-[calc(100%-2rem)] -translate-x-1/2 text-center sm:top-[21%]"><p className="text-[11px] font-bold uppercase text-world-subtle sm:text-xs">Your own little corner of the sky</p><p className="mt-1 font-display text-2xl font-bold uppercase text-world-ink/80 sm:text-3xl">Tap the island to shape it <ArrowUpRight className="inline size-5" /></p></div>}

      <div className="flex flex-col items-center gap-3 px-3 pb-4 sm:pb-7">
        <div className="hidden items-center gap-5 rounded-full bg-world-panel/80 px-5 py-2 text-[11px] font-semibold text-world-subtle shadow-sm backdrop-blur-md sm:flex"><span>Drag to orbit</span><span className="size-1 rounded-full bg-world-accent" /><span>Scroll to zoom</span><span className="size-1 rounded-full bg-world-accent" /><span>Click to build</span><span className="size-1 rounded-full bg-world-accent" /><span>1–5 to choose</span></div>
        <div className="pointer-events-auto flex w-full max-w-[650px] items-center justify-center gap-0.5 rounded-lg border border-world-line bg-world-panel/95 p-1.5 shadow-xl backdrop-blur-xl sm:gap-2 sm:p-3">
          <div className="flex shrink-0 gap-0.5 sm:gap-2">
            {MATERIALS.map((material, index) => <Button key={material.id} type="button" variant="ghost" onClick={() => { setSelected(material.id); setMode("place"); }} title={`${material.label} · ${index + 1}`} aria-label={`Place ${material.label}`} aria-pressed={mode === "place" && selected === material.id} className={`world-tool flex h-14 w-10 shrink-0 flex-col gap-1 rounded-md px-0.5 text-[8px] font-bold text-world-subtle hover:bg-world-hover sm:h-16 sm:w-16 sm:px-1 sm:text-[9px] ${mode === "place" && selected === material.id ? "bg-world-hover text-world-ink ring-1 ring-world-accent" : ""}`}><span className="world-swatch block size-6 rounded-sm border border-world-ink/10 sm:size-7" style={{ backgroundColor: material.color }} /><span className="max-w-full truncate">{material.label}</span></Button>)}
          </div>
          <div className="mx-1 h-9 w-px shrink-0 bg-world-line" />
          <Button type="button" variant="ghost" onClick={() => setMode("remove")} title="Remove block · X" aria-label="Remove block" aria-pressed={mode === "remove"} className={`world-tool flex h-14 w-10 shrink-0 flex-col gap-1 rounded-md px-0.5 text-[8px] font-bold text-world-subtle hover:bg-world-hover sm:h-16 sm:w-14 sm:text-[9px] ${mode === "remove" ? "bg-world-hover text-world-ink ring-1 ring-world-accent" : ""}`}><Trash2 className="size-5" /><span>Remove</span></Button>
          <Button type="button" variant="ghost" onClick={undo} disabled={!history.length} title="Undo · Ctrl/⌘ Z" aria-label="Undo" className="world-tool flex h-14 w-10 shrink-0 flex-col gap-1 rounded-md px-0.5 text-[8px] font-bold text-world-subtle hover:bg-world-hover sm:h-16 sm:w-14 sm:text-[9px]"><Undo2 className="size-5" /><span>Undo</span></Button>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-world-subtle sm:hidden"><Hand className="size-3" /> Drag to rotate · Pinch to zoom · Tap to build</div>
      </div>
    </div>
  </main>;
}
