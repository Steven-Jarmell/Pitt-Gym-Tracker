export default function Gym({params} : {params: {gym: string}}) {
    console.log(params.gym)
    return (
        <p>{params.gym}</p>
    );
}