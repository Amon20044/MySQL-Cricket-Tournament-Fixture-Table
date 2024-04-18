import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';


export async function GET(req) {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '@Kruti14',
        database: 'cricket',
    });

    const [results, fields] = await connection.query(
        `SELECT *
        FROM PointsTable
        ORDER BY Points	 DESC, NetRunRate DESC;`
    );

    console.log(results)

    return NextResponse.json(results);
}