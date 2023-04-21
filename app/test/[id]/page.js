export default function Component({ params }) {
    
    const {id} = params;
    return (
        <h1 className="fun-stuff">{id}</h1>
    )

}