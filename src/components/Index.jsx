export default function Index({ index }) {

    return (
        <div className="index">
            <b>INDICE</b>
            {index.map((indice, i) => (
                <a key={i} href={indice.targetAnchor}>{indice.indexItemTitle}</a>
            ))}
        </div>
    );
}