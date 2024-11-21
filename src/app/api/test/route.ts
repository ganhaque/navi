import db from '@/server/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
) {
  // const body = await request.json();
  // console.log("received", body);
  // const message = body;
  // console.log("message", message);
  console.log("TEST");

  try {
    // const rows = db.prepare('SELECT * FROM person').all();
    const rows = db.prepare('SELECT * FROM semester').all();
    console.log('Persons:', rows); // Logs to the server console
  } catch (error) {
    console.error('Error querying the database:', error);
  }

  // db.all("SELECT id, name, data FROM person", [], (err, rows) => {
  //   if (err) {
  //     console.log("err");
  //   }
  //   else {
  //     console.log(rows);
  //   }
  //   // if (err) {
  //   //   reject(err);
  //   // } else {
  //   //   resolve(rows);
  //   // }
  // });

  return NextResponse.json(
    "message sent successfully",
  );
}
