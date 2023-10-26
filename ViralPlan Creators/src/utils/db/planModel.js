import { client } from './db.js';

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export async function getPlans(filter) {
    try {
        const result = await client.db('companies').collection("companies").find(filter).toArray();
        return result[0]['company']['plans'];
    } catch (e) {
        console.error(e);
    }
}

export async function pushPlan(filter, plans, options) {
    try {
        let today = formatDate();
        const result = await client.db('companies').collection("companies").updateOne(filter, { $push: {"company.plans": {'date': today, 'content': plans} } }, options);
    } catch (e) {
        console.error(e);
    }
}

export async function updatePlan(filter, updateDoc, options) {
    try {
        const result = await client.db("companies").collection("companies").updateOne(filter, updateDoc, options);
    } catch (e) {
        console.error(e);
    }
}