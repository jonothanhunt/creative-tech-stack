import { AsciiRenderer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = `
    varying vec3 vViewPosition;
    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const fragmentShader = `
    varying vec3 vViewPosition;
    void main() {
        float depth = -vViewPosition.z;
        float normalizedDepth = clamp(depth / 8.0, 0.1, 1.0);
        gl_FragColor = vec4(vec3(1.0 - normalizedDepth), 1.0);
    }
`;

function Box() {
    const groupRef = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = mousePos.x * 0.3;
            groupRef.current.rotation.x = mousePos.y * -0.3;
        }
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.04;
            meshRef.current.rotation.y += delta * 0.02;
        }
    });

    return (
        <group position={[2, 0, 0]} ref={groupRef}>
            <mesh ref={meshRef} rotation={[0.3, 0.2, 0]}>
                <octahedronGeometry args={[3, 1]} />
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    wireframe
                />
            </mesh>
        </group>
    );
}

interface HeaderCanvasProps {
    width?: string;
    height?: string;
}

const HeaderCanvas: React.FC<HeaderCanvasProps> = () => {
    return (
        <Canvas
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
            }}
            camera={{ position: [0, 0, 5], fov: 40, near: 0.1, far: 10 }}
            dpr={[0.1, 0.1]}

            onCreated={(state) => state.gl.setClearColor("black")}
        >
            <Box />
            <AsciiRenderer
                bgColor="transparent"
                fgColor="var(--color-ct-primary)"
                // invert={false}
                resolution={0.1}
                characters=" .:-+*=%@#"
            // characters=" #@%=*+-:."
            />
        </Canvas>
    );
};

export default HeaderCanvas;
