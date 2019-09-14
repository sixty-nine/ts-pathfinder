import * as React from 'react';
import * as Distance from "../Model/Distance";

type MenuProps = {
    onSave: () => void;
    onChangeDist: (dist: Distance.Distance) => void;
};

const withDisabledButton = (button: HTMLElement, handler: () => void) => {
    button.setAttribute('disabled', 'disabled');
    setTimeout(() => {
        handler();
        button.removeAttribute('disabled');
    });
};

const Menu: React.FC<MenuProps> = (props) => (
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
        <button className="btn" onClick={props.onSave}>Save</button>
    </div>
);

export default Menu;
