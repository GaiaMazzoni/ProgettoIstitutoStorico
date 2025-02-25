import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { fetchPageBySlug } from '../ApiClient';
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
        .then(data => {
            console.log(data);
            setPagina(data.pageData[0] || null);
            setSubPagine(data.subPages || null);
            setArchivePageInfo(data.archiveInfo || null);
            setIndice(data.indexData || null);
        })
        .catch(error => console.error("Errore nel caricamento della pagina", error));
    }, [slug]);

    

    return(
        <div className='pageContent' key={slug}>
            {/*Visualizzazione dell'indice se presente*/}
            { pagina && indice && indice.length > 0 ?(
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