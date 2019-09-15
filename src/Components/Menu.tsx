import * as React from 'react';
import * as Distance from "../Model/Distance";
import {keys} from "idb-keyval";
import {useState} from "react";

type MenuProps = {
    onSave: () => void;
    onLoad: (item: string) => void;
    onChangeDist: (dist: Distance.Distance) => void;
};

const withDisabledButton = (button: HTMLElement, handler: () => void) => {
    button.setAttribute('disabled', 'disabled');
    setTimeout(() => {
        handler();
        button.removeAttribute('disabled');
    });
};

const Menu: React.FC<MenuProps> = (props) => {
    const [ files, setFiles ] = useState();
    const [ selected, setSelected ] = useState('');

    keys().then((keys: any) => setFiles(keys));

    return (
        <div className="menu">
            <button className="btn" onClick={(e) => withDisabledButton(
                e.target as HTMLElement,
                () => props.onChangeDist(Distance.euclideanDistance))}>
                Euclidean dist
            </button>

            <button className="btn" onClick={(e) => withDisabledButton(
                e.target as HTMLElement,
                () => props.onChangeDist(Distance.chebyshevDistance))}>
                Chebyshev dist
            </button>
            <button className="btn" onClick={(e) => withDisabledButton(
                e.target as HTMLElement,
                () => props.onChangeDist(Distance.manhattanDistance))}>
                Manhattan dist
            </button>
            <div>
                <select className="input" onChange={(e) => setSelected(e.target.value)}>
                    <option value="">Select...</option>
                    {files && files.map(
                        (key: any, idx: number) => <option key={idx} value={key}>{key}</option>
                    )}
                </select>
                <button className="btn" onClick={() => props.onLoad(selected)}>Load</button>
            </div>
            <button className="btn" onClick={props.onSave}>Save</button>
        </div>
    )
};

export default Menu;
