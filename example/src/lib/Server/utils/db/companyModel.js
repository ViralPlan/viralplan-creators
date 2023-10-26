import { client } from './db.js';

export async function getCompanies() {
    try {
        await client.connect();
        const result = await client.db('companies').collection("companies").find({}).toArray();
        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function getCompany(name) {
    try {
        await client.connect();
        const result = await client.db('companies').collection("companies").find({'company.name': name}).toArray();
        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function addCompany(company) {
    try {
        await client.connect();
        const result = await client.db("companies").collection("companies").insertOne({company});
    } catch (e) {
        console.error(e);
    }
}

export async function updateCompany(filter, updateDoc, options) {
    try {
        await client.connect();
        const result = await client.db("companies").collection("companies").updateOne(filter, updateDoc, options);
    } catch (e) {
        console.error(e);
    }
}

export async function deleteCompany(filter) {
    try {
        await client.connect();
        const result = await client.db("companies").collection("companies").deleteOne(filter);
    } catch (e) {
        console.error(e);
    }
}
