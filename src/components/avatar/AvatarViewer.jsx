import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei'
import { motion } from 'framer-motion'
import useAppStore from '../../store/useAppStore'

const AnimatedAvatar = ({ isTalking, gender }) => {
  const groupRef = useRef()
  const headRef = useRef()
  const leftEyeRef = useRef()
  const rightEyeRef = useRef()
  const bodyRef = useRef()
  const [breathOffset, setBreathOffset] = useState(0)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Breathing animation
      const breath = Math.sin(state.clock.elapsedTime * 0.8) * 0.02
      groupRef.current.scale.y = 1 + breath
      groupRef.current.scale.x = 1 - breath * 0.3
      
      // Subtle floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }

    if (headRef.current) {
      // Head movement
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }

    // Blinking
    if (leftEyeRef.current && rightEyeRef.current) {
      const blink = Math.sin(state.clock.elapsedTime * 0.1) > 0.95 ? 0.1 : 1
      leftEyeRef.current.scale.y = blink
      rightEyeRef.current.scale.y = blink
    }

    // Talking animation
    if (isTalking && bodyRef.current) {
      const talk = Math.sin(state.clock.elapsedTime * 10) * 0.05
      bodyRef.current.rotation.z = talk
    }
  })

  const avatarColor = gender === 'male' ? '#3b82f6' : '#ec4899'
  const skinColor = '#f5d0b9'
  const hairColor = gender === 'male' ? '#4a3728' : '#2d1f1a'

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        {/* Body */}
        <group ref={bodyRef}>
          {/* Torso */}
          <mesh position={[0, 0, 0]}>
            <capsuleGeometry args={[0.35, 0.6, 8, 16]} />
            <meshStandardMaterial color={avatarColor} roughness={0.5} />
          </mesh>
          
          {/* Head */}
          <group ref={headRef} position={[0, 1, 0]}>
            {/* Face */}
            <mesh>
              <sphereGeometry args={[0.4, 32, 32]} />
              <meshStandardMaterial color={skinColor} roughness={0.8} />
            </mesh>
            
            {/* Hair */}
            <mesh position={[0, 0.15, -0.1]}>
              <sphereGeometry args={[0.42, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color={hairColor} roughness={0.9} />
            </mesh>
            
            {/* Eyes */}
            <group position={[0, 0.05, 0.35]}>
              <mesh ref={leftEyeRef} position={[-0.15, 0, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="#ffffff" />
              </mesh>
              <mesh position={[-0.15, 0, 0.04]}>
                <sphereGeometry args={[0.035, 16, 16]} />
                <meshStandardMaterial color="#1a1a2e" />
              </mesh>
              
              <mesh ref={rightEyeRef} position={[0.15, 0, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="#ffffff" />
              </mesh>
              <mesh position={[0.15, 0, 0.04]}>
                <sphereGeometry args={[0.035, 16, 16]} />
                <meshStandardMaterial color="#1a1a2e" />
              </mesh>
            </group>
            
            {/* Mouth */}
            <mesh position={[0, -0.15, 0.38]} rotation={[0, 0, 0]}>
              <sphereGeometry args={[isTalking ? 0.08 : 0.04, 16, 16]} />
              <meshStandardMaterial color={isTalking ? "#e87979" : "#c48b7a"} />
            </mesh>
            
            {/* Nose */}
            <mesh position={[0, -0.02, 0.4]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial color={skinColor} roughness={0.8} />
            </mesh>
          </group>
          
          {/* Arms */}
          <mesh position={[-0.5, 0.2, 0]} rotation={[0, 0, 0.3]}>
            <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
            <meshStandardMaterial color={skinColor} roughness={0.8} />
          </mesh>
          <mesh position={[0.5, 0.2, 0]} rotation={[0, 0, -0.3]}>
            <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
            <meshStandardMaterial color={skinColor} roughness={0.8} />
          </mesh>
          
          {/* Legs */}
          <mesh position={[-0.15, -0.7, 0]}>
            <capsuleGeometry args={[0.12, 0.5, 8, 16]} />
            <meshStandardMaterial color="#1a1a2e" roughness={0.7} />
          </mesh>
          <mesh position={[0.15, -0.7, 0]}>
            <capsuleGeometry args={[0.12, 0.5, 8, 16]} />
            <meshStandardMaterial color="#1a1a2e" roughness={0.7} />
          </mesh>
        </group>
      </Float>
    </group>
  )
}

const AvatarViewer = ({ isTalking = false, showControls = true }) => {
  const { gender, avatarConfig } = useAppStore()
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div 
      className="w-full h-full min-h-[400px] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
      >
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <AnimatedAvatar isTalking={isTalking} gender={gender} />
        
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4} 
        />
        
        {showControls && (
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        )}
        
        <Environment preset="city" />
      </Canvas>
      
      {/* Overlay glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-violet-500/30 blur-2xl rounded-full" />
      </div>
    </motion.div>
  )
}

export default AvatarViewer