export default function Gym({params} : {params: {gym: string}}) {
    return (
        <p>{params.gym}</p>
    );
}