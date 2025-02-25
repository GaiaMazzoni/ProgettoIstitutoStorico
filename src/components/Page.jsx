import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { fetchPageBySlug, fetchArchivePageInfo, fetchSubPages, fetchIndice } from '../ApiClient';
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
        fetchPageBySlug(slug)
        .then(data => setPagina(data[0] || null))
        .catch(error => console.error("Errore nel caricamento della pagina", error));
    }, [slug]);

    //Recuperare sottopagine
    useEffect(() => {
        const loadSubPages = async () => {
            if(pagina) {
                try {
                    const data = await fetchSubPages(pagina.idPage);
                    setSubPagine(data);
                } catch (error) {
                    console.error("Errore nel caricamento delle sottopagine", error);
                }
            }
        };
        if(pagina?.idPage) {
            loadSubPages();
        }
    }, [pagina?.idPage]);

    //Recuperare informazioni da visualizzare nel caso sia una pagina di archivio
    useEffect(() => {
        const loadArchivePageInfo = async () => {
            if (pagina) {
                try {
                    const data = await fetchArchivePageInfo(pagina.idPage);
                    setArchivePageInfo(data);
                } catch (error) {
                    console.error("Errore nel caricamento della pagina di archivio", error);
                }
            }
        };
        if(pagina?.idPage){
            loadArchivePageInfo();
        }
    }, [pagina?.idPage]);

    //Recuperare indice della pagina, se presente (di solito presente in pagine di Studi di caso)
    useEffect(() => {
        const loadIndice = async () => {
            if(pagina) {
                try {
                    const data = await fetchIndice(pagina.idPage);
                    setIndice(data);
                } catch(error){
                    console.error("Errore nel caricamento dell'indice", error);
                }
            }
        };
        if(pagina?.idPage){
            loadIndice();
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