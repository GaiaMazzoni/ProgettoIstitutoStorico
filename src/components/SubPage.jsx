import '../stylesheets/SubPage.css';

export default function SubPage({title, text, slug}){

    return(
        <a className="pagePreview">
            <div className="subPageText" dangerouslySetInnerHTML={{__html: text}}></div>
            <button onClick={() => window.location.href = `${slug}`}>Vai alla pagina completa</button>
        </a>
    );
}