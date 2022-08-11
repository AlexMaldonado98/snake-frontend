import {useState} from "react";

export const Togglable = ({ buttonText, children, styleButton, initialVisibility = false }, ref) => {
    const [visible, setVisible] = useState(initialVisibility);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible)
    };

    return (
        <div>
            <div style={hideWhenVisible}>
                <button className="w-50" onClick={toggleVisibility}>{buttonText}</button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button className={styleButton} onClick={toggleVisibility}>
                    Cancel
                </button>
            </div>
        </div>
    );
};