import {NextRequest, NextResponse} from "next/server";
import Airtable, { FieldSet, Table } from 'airtable'

const base = new Airtable({apiKey: process.env.API_KEY_ODB}).base('app5C3EKxBArX6f00')
const table3 = base('Image prompts');


const getImagesData = (table3: Table<FieldSet>) => {

    return new Promise((resolve, reject) => {
        table3.select({
            view: 'Grid view',
            fields: ['Name' ,'image']
        }).firstPage((err, records) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                const data = records?.map(record => ({
                    id: record.id,
                    prompt: record.get('Name'),
                    image: record.get('image')
                }));
                resolve(data);
            }
        });
    });
}


export async function GET(request: NextRequest) {
    try {
        const data = await getImagesData(table3);
        return NextResponse.json(data);
    }catch{
        // console.error(e);
        return NextResponse.error();
    }
}