import {NextRequest, NextResponse} from "next/server";
import Airtable, { FieldSet, Table } from 'airtable'

const base = new Airtable({apiKey: process.env.API_KEY_ODB}).base('app5C3EKxBArX6f00')
const table2 = base('Creative Catalyst');

const getIdeas = (table2: Table<FieldSet>) => {

    return new Promise((resolve, reject) => {
        table2.select({
            view: 'Grid view',
            fields: ['Heading' ,'Description']
        }).firstPage((err, records) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const data = records?.map(record => ({
                    id: record.id,
                    heading: record.get('Heading'),
                    idea: record.get('Description')
                }));
                resolve(data);
            }
        });
    });
}


export async function GET (request: NextRequest){
  try {
    const data = await getIdeas(table2);
    return NextResponse.json(data);
  }catch{
    // console.error(e);
    return NextResponse.error();
}
}

