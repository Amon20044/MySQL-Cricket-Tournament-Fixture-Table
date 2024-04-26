"use client"

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "../../../head2/head";

export default function Test() {

    const [results, setResults] = useState([]);
    const [points, setPoints] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [input, setInput] = useState({});

    useEffect(() => {
        async function getData() {
            let resp = await fetch("/getRow", {
                method: "GET"
            });
            let json = await resp.json();
            console.log(json);
            setResults(json);
        }

        getData();
    }, []);

    useEffect(() => {
        async function getPoints() {
            let resp = await fetch("/getRow2", {
                method: "GET"
            });
            let json = await resp.json();
            console.log(json);
            setPoints(json);
        }

        getPoints();
    }, []);

    const handleAddClick = () => {
        setIsClicked(true);
    };

    const handleInputChange = (key, value) => {
        setInput({
            ...input,
            [key]: value
        });
    };

    const handleSubmit = async () => {
        let resp = await fetch("/server2", {
            method: "POST",
            body: JSON.stringify({
                team1_id: input.team1_id,
                team2_id: input.team2_id,
                winner_id: input.winner_id,
                no_result: input.no_result,
                Runs_scored_team1: input.Runs_scored_team1,
                Overs_faced_team1: input.Overs_faced_team1,
                Runs_scored_team2: input.Runs_scored_team2,
                Overs_faced_team2: input.Overs_faced_team2
            })
        });
        let json = await resp.json();
        setResults([...results, json]);
        setInput({});
        setIsClicked(false);
    };

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
                                <th className="border border-black px-4 py-2">Matches</th>
                                <th className="border border-black px-4 py-2">Won</th>
                                <th className="border border-black px-4 py-2">Lost</th>
                                <th className="border border-black px-4 py-2">Net Run Rate</th>
                                <th className="border border-black px-4 py-2">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {points.map((point, index) => (
                                <tr key={index}>
                                    <td className="border border-black px-4 py-2">{point.team_id}</td>
                                    <td className="border border-black px-4 py-2">{point.team_name}</td>
                                    <td className="border border-black px-4 py-2">{point.Matches}</td>
                                    <td className="border border-black px-4 py-2">{point.Won}</td>
                                    <td className="border border-black px-4 py-2">{point.Lost}</td>
                                    <td className="border border-black px-4 py-2">{point.NetRunRate}</td>
                                    <td className="border border-black px-4 py-2">{point.Points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-row justify-center items-center mt-3">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddClick}>Add</button>
                </div>
                {isClicked && (
                    <div className="flex flex-row justify-center items-center mt-3">
                        <div className="flex flex-col justify-center items-center text-blue-800">
                            <input className="border border-blue-600 px-2 py-1 mt-2" onChange={(e) => handleInputChange("team1_id", e.target.value)} placeholder="Team 1 ID" />
                            <input className="border border-blue-600 px-2 py-1 mt-2" onChange={(e) => handleInputChange("team2_id", e.target.value)} placeholder="Team 2 ID" />
                            <input className="border border-blue-600 px-2 py-1 mt-2" onChange={(e) => handleInputChange("winner_id", e.target.value)} placeholder="Winner ID" />
                            <input className="border border-blue-600 px-2 py-1 mt-2" onChange={(e) => handleInputChange("no_result", e.target.value)} placeholder="No Result (true/false)" />
                            <input className="border border-blue-600 px-2 py-1 mt-2" onChange={(e) => handleInputChange("Runs_scored_team1", e.target.value)} placeholder="Runs scored by Team 1" />
                            <input className="border border-blue-600 px-2 py-1 mt-2" onChange={(e) => handleInputChange("Overs_faced_team1", e.target.value)} placeholder="Overs faced by Team 1" />
                            <input className="border border-blue-600 px-2 py-1 mt-2" onChange={(e) => handleInputChange("Runs_scored_team2", e.target.value)} placeholder="Runs scored by Team 2" />
                            <input className="border border-blue-600 px-2 py-1 mt-2" onChange={(e) => handleInputChange("Overs_faced_team2", e.target.value)} placeholder="Overs faced by Team 2" />
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );

}
