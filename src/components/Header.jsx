import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from '@fortawesome/free-regular-svg-icons';
import { faSun } from '@fortawesome/free-regular-svg-icons';
export function Header(props) {

    const { lightMode, setLightMode, handleLightMode } = props

    return (
        <header >
            <h1 className="col-2">Todo App</h1>
            <button className="col-3 lightingMode" onClick={() => {
                const newMode = !lightMode
                setLightMode(newMode)
                handleLightMode(newMode)
                }}>
                {lightMode ? <FontAwesomeIcon icon={faMoon} style={{ color: '#4ade80', fontSize: '2.5rem' }}/> : 
                <FontAwesomeIcon icon={faSun} style={{ color: '#4ade80', fontSize: '2.5rem' }} />}
            </button>
        </header>
    )
}

export default Header