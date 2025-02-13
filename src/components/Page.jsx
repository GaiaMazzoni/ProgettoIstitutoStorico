import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../stylesheets/Page.css';
import SubPage from './SubPage';

export default function Page(){

    const slug = useParams().slug;
    const [pagina, setPagina] = useState(null);
    const [subPagine, setSubPagine] = useState([]);

    useEffect(() => {
        setPagina(null); // Forza il re-render della pagina
        setSubPagine([]); // Resetta le sottopagine
    }, [slug]);

    useEffect(() => {
        const fetchPageBySlug = async () => {
            try {
                const response = await fetch(`http://localhost/progetto_tesi_react/backend/controller/api-page.php?slug=${slug}`);
                const data = await response.json();
                console.log("Fetched page data:", data);
                if (data && data.length > 0) { 
                    setPagina(data[0]);
                } else {
                    setPagina(null);
                }
            } catch (error) {
                console.error("Errore nel caricamento della pagina", error);
            }
        }
        fetchPageBySlug();
    }, [slug]);

    useEffect(() => {
        const fetchSubPages = async () => {
            console.log("Dentro fetchSubPages");
            if(pagina){
                console.log("Id pagina è", pagina.idPage);
                try{
                    console.log("fetching pagine", pagina.idPage);
                    const response = await fetch(`http://localhost/progetto_tesi_react/backend/controller/api-page.php?idPageForCollectionPage=${pagina.idPage}`);
                    const data = await response.json();
                    
                    setSubPagine(data);
                } catch (error) {
                    console.error("Errore nel caricamento delle sottopagine", error);
                }
            }
        };
        if(pagina?.idPage){
            fetchSubPages();
        }
    }, [pagina?.idPage]);

    useEffect(() => {
        const fetchArchivePageInfo(){
            
        }
    })

    return(
        <div className='pageContent' key={slug}>
            {pagina ? (
                <div>
                    {pagina.text ? (
                        <div dangerouslySetInnerHTML={{__html: pagina.text}}></div>
                    ) : (
                        <p> </p>
                    )}
                </div>
            ) : (
                <p>Caricamento pagina...</p>
            )}
            {Array.isArray(subPagine) ? (
                subPagine.map(subPagina => (
                    <SubPage key={subPagina.idPage} title={subPagina.title} text={subPagina.text} slug={subPagina.slug}/>
                ))
            ) : null}
        </div>
    );
}