import { useEffect, useState } from 'react';

export type ControlKeys = {
    [p in 'KeyW' | 'KeyS' | 'KeyA' | 'KeyD' | 'Space']: string;
};

export type ControlState = {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
    jump: boolean;
}


export const usePlayerControls = () => {
    const keys: ControlKeys = { KeyW: 'forward', KeyS: 'backward', KeyA: 'left', KeyD: 'right', Space: 'jump' };
    const moveFieldByKey: (key: keyof ControlKeys) => string = (key) => keys[key];

    const [movement, setMovement] = useState<ControlState>({ forward: false, backward: false, left: false, right: false, jump: false });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code as keyof ControlKeys)]: true }));
        const handleKeyUp = (e: KeyboardEvent) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code as keyof ControlKeys)]: false }));

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return movement;
};