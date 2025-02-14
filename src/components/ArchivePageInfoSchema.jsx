export default function ArchivePageInfoSchema({ info }) {
    const consistenze = info.filter(item => item.inventoryItem_idInventoryItem); 
    const cronologia = info.filter(item => item.chronologyStartYear); 
    const strumentiDiCorredo = info.filter(item => item.nameReferenceTool); 

    return (
        <>
        <p className="consistencyInfo">
            <b>Consistenza:</b>
            {Array.isArray(consistenze) ? (
                <ul>
                {consistenze.map((consistenza, index) => (
                    <li key={index}>
                        <b>{consistenza.inventoryitemname}:</b> {consistenza.itemQuantity}
                    </li>
                ))}
            </ul>
            ) : null }
        </p>
        <p className="chronologyInfo">
            <b>Cronologia:</b>{cronologia[0]?.chronologyStartYear} - {cronologia[0]?.chronologyEndYear}
        </p>
        <p className="referenceToolInfo">
            <b>Strumenti di corredo:</b>
            {Array.isArray(strumentiDiCorredo) ? (
                <ul>
                {strumentiDiCorredo.map((strumento, index) => (
                    <li key={index}>{strumento.nameReferenceTool}</li>
                ))}
            </ul>
            ) : null}
            
            
        </p>
        </>
    );
}