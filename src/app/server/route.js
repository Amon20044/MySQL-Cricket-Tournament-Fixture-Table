import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';


export async function POST(req) {
    const { team_id, team_name } = await req.json();
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '@Kruti14',
        database: 'cricket',
    });

    const [results, fields] = await connection.query(
        `INSERT INTO teams VALUES (${team_id}, "${team_name}")`
    );

    console.log(results)

    return NextResponse.json(results);
}