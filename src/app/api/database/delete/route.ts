import db from '@/server/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
) {
  const body = await request.json();
  const query = body;
  console.log("sql_update received:", query);

  if (!query) {
    console.log("bad update sent.");
    return NextResponse.json(
      { message: "bad update sent." },
      { status: 401 }
    );
  }


  try {
    const statement = db.prepare(query);
    const info = statement.run();

    return NextResponse.json(
      info.changes
    );
  } catch (error) {
    console.error('Error querying the database:', error);

    return NextResponse.json(
      { message: "error querying the database", error },
      { status: 401 }
    );
  }

  // try {
  //   // const rows = db.prepare('SELECT * FROM person').all();
  //   const rows = db.prepare('SELECT * FROM semester').all();
  //   console.log('Persons:', rows); // Logs to the server console
  // } catch (error) {
  //   console.error('Error querying the database:', error);
  // }

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

}
