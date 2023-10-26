import { client } from './db.js';

export async function getCompanies() {
    try {
        const result = await client.db('companies').collection("companies").find({});
        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function getCompany(name) {
    try {
        const result = await client.db('companies').collection("companies").find({'company.name': name}).toArray();
        return result;
    } catch (e) {
        console.error(e);
    }
}

export async function addCompany(company) {
    try {
        const result = await client.db("companies").collection("companies").insertOne({company});
    } catch (e) {
        console.error(e);
    }
}

export async function updateCompany(filter, updateDoc, options) {
    try {
        const result = await client.db("companies").collection("companies").updateOne(filter, updateDoc, options);
    } catch (e) {
        console.error(e);
    }
}

export async function deleteCompany(filter) {
    try {
        const result = await client.db("companies").collection("companies").deleteOne(filter);
    } catch (e) {
        console.error(e);
    }
}
