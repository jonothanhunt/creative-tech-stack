import { AsciiRenderer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
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
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.04;
            meshRef.current.rotation.y += delta * 0.02;
        }
    });

    return (
        <mesh ref={meshRef} position={[2, 0, 0]} rotation={[0.3, 0.2, 0]}>
            <octahedronGeometry args={[3, 1]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                wireframe
            />
        </mesh>
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
            dpr={[0.2, 0.2]}
            onCreated={(state) => state.gl.setClearColor("black")}
        >
            <Box />
            <AsciiRenderer
                bgColor="transparent"
                fgColor="var(--color-ct-primary)"
                // invert={false}
                resolution={0.2}
                characters=" .:-+*=%@#"
                // characters=" #@%=*+-:."
            />
        </Canvas>
    );
};

export default HeaderCanvas;
