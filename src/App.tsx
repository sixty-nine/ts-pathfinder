import React, {useRef} from 'react';
import './App.css';
import Draw from './Components/Draw';
import Menu from "./Components/Menu";
import {Distance} from "./Model/Distance";

const App: React.FC = () => {
    const drawRef: any = useRef();
    return (
        <React.Fragment>
            <Draw ref={drawRef}/>
            <Menu
                onSave={() => drawRef.current.save()}
                onChangeDist={(dist: Distance) => drawRef.current.setDistance(dist)}
            />
        </React.Fragment>
    );
};

export default App;
