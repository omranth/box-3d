import { useState, useEffect } from 'react';
import { OrbitControls, Sky } from '@react-three/drei';

export const Experience = () => {
  return (
    <>
      <Light />
      <Sky />
      <Ground />
      <Box3D />
    </>
  );
};

// المكعب
const Box3D = () => {
  const [position, setPosition] = useState([0, 0.5, 0]);
  const [keysPressed, setKeysPressed] = useState({});

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeysPressed((prevKeys) => ({ ...prevKeys, [event.key]: true }));
    };

    const handleKeyUp = (event) => {
      setKeysPressed((prevKeys) => ({ ...prevKeys, [event.key]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    console.log(position);

    let newPosition = [...position];

    if (keysPressed['w']) {
      newPosition[2] -= 0.1; // تحريك للأمام
    }
    if (keysPressed['s']) {
      newPosition[2] += 0.1; // تحريك للخلف
    }
    if (keysPressed['a']) {
      newPosition[0] -= 0.1; // تحريك لليسار
    }
    if (keysPressed['d']) {
      newPosition[0] += 0.1; // تحريك لليمين
    }

    setPosition(newPosition);
  }, [keysPressed]); // هذا الـ useEffect سيعمل عند تحديث keysPressed

  return (
    <>
      <OrbitControls />
      <mesh position={position}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
};

// اضاءة المكعب
const Light = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
    </>
  );
};

// الأرضية
const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[10, 100]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};
