import '../stylesheets/MenuItem.css';

export default function MenuItem({ id, label, onClick} ) {
    return (
        <button
        type = "button"
        className = "menuItemButton"
        id = {id}
        onClick={onClick}
        >
            <span>{label}</span>
        </button>
    )
}
