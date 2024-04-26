"use client"
import { useEffect, useState } from "react"
import Head from "../../../head/Head";
import { useRouter } from "next/navigation";

// export function Lmao() {
//     const results = [1, 2, 3, 4, 5]
//     return (
//         <>
//             {
//                 results.map((result) => {
//                     return (
//                         <h1>{result}</h1>
//                     )
//                 })
//             }
//         </>
//     )
// }

export default function Test() {
    const [results, setResults] = useState([]);
    const [isClicked, setIsClicked] = useState(false)
    const [input, setInput] = useState({});


    const router = useRouter()

    useEffect(() => {
        async function getData() {
            let resp = await fetch("/getRow", {
                method: "GET"
            })
            let json = await resp.json()
            console.log(json)
            setResults(json)
        }

        getData()
    }, [])

    return (
        <>
            <div className="bg-gray-400 min-h-screen flex flex-col justify-center items-center">
                <Head />
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-black">
                        <thead>
                            <tr>
                                <th className="border border-black px-4 py-2">Team ID</th>
                                <th className="border border-black px-4 py-2">Team Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result, index) => (
                                <tr key={index}>
                                    <td className="border border-black px-4 py-2">{result.team_id}</td>
                                    <td className="border border-black px-4 py-2">{result.team_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsClicked(true)}>Add</button>
                </div>
                {isClicked && (
                    <div className="flex flex-row justify-center items-center text-blue-800 mt-3">
                        <input className="border border-blue-600 px-2 py-1 mr-2" onChange={(e) => setInput({ ...input, team_id: e.target.value })} placeholder="Team ID" />
                        <input className="border border-blue-600 px-2 py-1 mr-2" onChange={(e) => setInput({ ...input, team_name: e.target.value })} placeholder="Team Name" />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={async () => {
                            let resp = await fetch("/server", {
                                method: "POST",
                                body: JSON.stringify(input)
                            });
                            setResults([...results, input]);
                            setIsClicked(false);
                        }}>Submit</button>
                    </div>
                )}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-3 px-4 rounded" onClick={() => router.push("/test2")}>Confirm</button>
            </div>
        </>
    )

}