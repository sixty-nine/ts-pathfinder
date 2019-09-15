import React, {useRef} from 'react';
import './App.css';
import Draw from './Components/Draw';
import Menu from "./Components/Menu";
import {Distance} from "./Model/Distance";
import {set, get} from 'idb-keyval';

const App: React.FC = () => {
    const drawRef: any = useRef();

    const onSave = () => {
        const name = prompt('Please enter the layout name');
        if (!!name) {
            const json = drawRef.current.save();
            console.groupCollapsed('JSON');
            console.log(json);
            console.groupEnd();
            set(name, json)
                .then(() => console.log('Saved'))
                .catch(err => console.error('Failed', err));
        }
    };

    const onLoad = (selected: string) => {
        get(selected)
            .then(data => drawRef.current.load(selected, data))
            .catch(err => console.log('Error', err));
    };


    return (
        <React.Fragment>
            <Draw ref={drawRef}/>
            <Menu
                onSave={onSave}
                onLoad={onLoad}
                onChangeDist={(dist: Distance) => drawRef.current.setDistance(dist)}
            />
        </React.Fragment>
    );
};

export default App;
