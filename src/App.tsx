import { CameraControls, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import './App.css';
import UI from './helpers/ui';
import { ControlState } from './helpers/usePlayerControls';
import PlayerControls from './helpers/viewcontrols';
import PiecesHandler from './models/pieces.handler';
import { Room } from './models/room/Room';

function Loading() {
  return (<div className='coverScreen'>
    <h1 className='loading'>🌀 Museum Loading...</h1>
  </div>);
}

function App() {
  const [uiControls, setUiControls] = useState<ControlState>({ forward: false, backward: false, left: false, right: false, jump: false });
  return (<>
    <Suspense fallback={Loading()}>
      <Canvas shadows>
        <Environment preset='night' background />
        <CameraControls />
        <PlayerControls externalControls={uiControls} />
        <Room position={[0, 0, 0]} scale={0.5} receiveShadow></Room>
        <PiecesHandler />
        {/* <gridHelper args={[500,500, 0xff0000, 'teal']} /> */}
      </Canvas>
      <UI cameraControl={setUiControls} />
    </Suspense>
  </>


  );
}


export default App;
