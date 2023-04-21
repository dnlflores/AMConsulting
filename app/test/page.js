export default async function Testing() {
    const res = await fetch("/api/testing");
    const data = await res.json();

    console.log("here is the data -> ", data);
    return (
        <h2>hello</h2>
    )
}