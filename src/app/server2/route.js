import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';


export async function POST(req) {
    const { team1_id, team2_id, winner_id, no_result, Runs_scored_team1, Overs_faced_team1, Runs_scored_team2, Overs_faced_team2 } = await req.json();
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '@Kruti14',
        database: 'cricket',
    });

    const [results, fields] = await connection.query(
        `INSERT INTO matches (team1_id, team2_id, winner_id, no_result, Runs_scored_team1, Overs_faced_team1, Runs_scored_team2, Overs_faced_team2) VALUES (${team1_id}, ${team2_id}, ${winner_id}, ${no_result}, ${Runs_scored_team1}, ${Overs_faced_team1}, ${Runs_scored_team2}, ${Overs_faced_team2});`
    );

    console.log(results)

    return NextResponse.json(results);
}