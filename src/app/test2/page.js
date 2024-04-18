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
            <div className="bg-gray-400 h-screen flex flex-col justify-center items-center">
                <Head />{
                    points.map((point) => {
                        return (

                            <div className="flex flex-row justify-center items-center">
                                <div className="flex flex-row">
                                    <div className="border px-4 py-2 w-100">{point.team_id}</div>
                                    <div className="border px-4 py-2 w-100">{point.team_name}</div>
                                    <div className="border px-4 py-2 w-100">{point.Matches}</div>
                                    <div className="border px-4 py-2 w-100">{point.Won}</div>
                                    <div className="border px-4 py-2 w-100">{point.Lost}</div>
                                    <div className="border px-4 py-2 w-100">{point.NetRunRate}</div>
                                    <div className="border px-4 py-2 w-100">{point.Points}</div>
                                </div>
                            </div>
                        );
                    })
                }
                <div className="flex flex-row justify-center items-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddClick}>Add</button>
                </div>
                {isClicked && (
                    <div className="flex flex-row justify-center items-center">
                        <div className="flex flex-col justify-center items-center  text-blue-800">
                            <div><input
                                className="mx-2 border-2 border-blue-600"
                                onChange={(e) => handleInputChange("team1_id", e.target.value)}
                                placeholder="Team 1 ID"
                            />
                                <input
                                    className="mx-2 border-2 border-blue-600"
                                    onChange={(e) => handleInputChange("team2_id", e.target.value)}
                                    placeholder="Team 2 ID"
                                /></div>
                            <div><input
                                className="mx-2 border-2 border-blue-600"
                                onChange={(e) => handleInputChange("winner_id", e.target.value)}
                                placeholder="Winner ID"
                            />
                                <input
                                    className="mx-2 border-2 border-blue-600"
                                    onChange={(e) => handleInputChange("no_result", e.target.value)}
                                    placeholder="No Result (true/false)"
                                /></div>
                            <div><input
                                className="mx-2 border-2 border-blue-600"
                                onChange={(e) => handleInputChange("Runs_scored_team1", e.target.value)}
                                placeholder="Runs scored by Team 1"
                            />
                                <input
                                    className="mx-2 border-2 border-blue-600"
                                    onChange={(e) => handleInputChange("Overs_faced_team1", e.target.value)}
                                    placeholder="Overs faced by Team 1"
                                /></div>
                            <div>  <input
                                className="mx-2 border-2 border-blue-600"
                                onChange={(e) => handleInputChange("Runs_scored_team2", e.target.value)}
                                placeholder="Runs scored by Team 2"
                            />
                                <input
                                    className="mx-2 border-2 border-blue-600"
                                    onChange={(e) => handleInputChange("Overs_faced_team2", e.target.value)}
                                    placeholder="Overs faced by Team 2"
                                /></div>
                            <div>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleSubmit}
                                >Submit
                                </button></div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
