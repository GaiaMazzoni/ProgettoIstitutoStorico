import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../stylesheets/Page.css';
import SubPage from './SubPage';
import ArchivePageInfoSchema from './ArchivePageInfoSchema';
import Index from './Index';

export default function Page(){

    const slug = useParams().slug;
    const [pagina, setPagina] = useState(null);
    const [subPagine, setSubPagine] = useState([]);
    const [archivePageInfo, setArchivePageInfo] = useState([]);
    const [indice, setIndice] = useState([]);

    useEffect(() => {
        setPagina(null); 
        setSubPagine([]); 
        setArchivePageInfo([]);
    }, [slug]);

    //Recuperare informazioni pagina
    useEffect(() => {
        const fetchPageBySlug = async () => {
            try {
                const response = await fetch(`http://localhost/ProgettoIstitutoStorico/backend/controller/api-page.php?slug=${slug}`);
                const data = await response.json();
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

    //Recuperare sottopagine
    useEffect(() => {
        const fetchSubPages = async () => {
            if(pagina){
                try{
                    const response = await fetch(`http://localhost/ProgettoIstitutoStorico/backend/controller/api-page.php?idPageForCollectionPage=${pagina.idPage}`);
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

    //Recuperare informazioni da visualizzare nel caso sia una pagina di archivio
    useEffect(() => {
        const fetchArchivePageInfo = async () => {
            if(pagina){
                
                try{
                    const response = await fetch(`http://localhost/ProgettoIstitutoStorico/backend/controller/api-page.php?idArchivePage=${pagina.idPage}`);
                    const data = await response.json();
                    setArchivePageInfo(data);
                } catch (error) {
                    console.error("Errore nel caricamento della pagina di archivio", error);
                }
            }
        };
        if(pagina?.idPage){
            fetchArchivePageInfo();
        }
    }, [pagina?.idPage]);

    //Recuperare indice della pagina, se presente (di solito presente in pagine di Studi di caso)
    useEffect(() => {
        const fetchIndice = async () => {
            if(pagina){
                
                try{
                    const response = await fetch(`http://localhost/ProgettoIstitutoStorico/backend/controller/api-page.php?idPagePerIndice=${pagina.idPage}`);
                    const data = await response.json();
                    setIndice(data);
                } catch (error) {
                    console.error("Errore nel caricamento dell'indice'", error);
                }
            }
        };
        if(pagina?.idPage){
            fetchIndice();
        }
    }, [pagina?.idPage]);

    return(
        <div className='pageContent' key={slug}>
            {/*Visualizzazione dell'indice se presente*/}
            {indice.length > 0 && pagina ? (
                <Index key={pagina.idPage} index={indice} />
            ): null}

            {/*Visualizzazione del contenuto di una pagina*/}
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

            {/*Visualizzazione delle informazioni di archivio, se presenti*/}
            {(archivePageInfo.length > 0 && pagina) ? (
                <ArchivePageInfoSchema key={pagina.idPage} info={archivePageInfo} />
            ) : null}

            {/*Visualizzazione delle sottopagine, se presenti*/}
            {Array.isArray(subPagine) ? (
                subPagine.map(subPagina => (
                    <SubPage key={subPagina.idPage} title={subPagina.title} text={subPagina.text} slug={subPagina.slug}/>
                ))
            ) : null}     
        </div>
    );
}