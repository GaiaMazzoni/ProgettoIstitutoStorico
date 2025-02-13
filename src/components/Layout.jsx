import LogoAndTitle from './LogoAndTitle';
import Menu from './Menu';
import '../stylesheets/Layout.css';

export default function Layout() {

    return (
        <div className="layout">
        <LogoAndTitle />
        <Menu />
        </div>
    );
}