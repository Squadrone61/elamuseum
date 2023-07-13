import { useEffect, useState } from 'react';
import { ControlState } from "./usePlayerControls";

function openFullscreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
}
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

function UI({ cameraControl }: { cameraControl: (d: ControlState) => void }) {

    const [movement, setMovement] = useState<ControlState>({ forward: false, backward: false, left: false, right: false, jump: false });

    const switchFullScreen = () => {
        document.fullscreenElement ? closeFullscreen() : openFullscreen()
    }
    useEffect(() => {
        cameraControl(movement)
    })
    return (<>
        <button className='fullScreenBtn' onClick={() => switchFullScreen()}>
        ⃢
        </button>
        <div className='mobileControls'>
            <button onTouchStart={() => setMovement((m) => ({ ...m, forward: true }))} onTouchEnd={() => setMovement((m) => ({ ...m, forward: false }))}>↑</button>
            <button onTouchStart={() => setMovement((m) => ({ ...m, backward: true }))} onTouchEnd={() => setMovement((m) => ({ ...m, backward: false }))}>↓</button>
        </div>
    </>
    )
}


export default UI