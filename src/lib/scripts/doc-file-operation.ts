import { existsSync } from "fs"
import { mkdir, writeFile } from "fs/promises"
var rimraf = require("rimraf");

export const generateFileJson = (object: any) => {
    return new Promise((resolve, reject) => {
        if (existsSync("./docs")) rimraf.sync("./docs");
        mkdir("./docs")
        writeFile(`./docs/document-postman.json`, JSON.stringify(object))
            .then(() => {
                resolve({ message: "file generate correctly on docs folders" })
            }).catch(err => {
                reject({ message: "error on generate file", err })
            })
    })
}


/**
 * Imports JSON data into Postman.
 * @param {any} jsonData - The JSON data to be imported.
 * @param {string} apiKey - The API key for Postman API access.
 */
export const importJsonToPostman = (data: any, apiKey: string) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.getpostman.com/collections?apikey=${apiKey}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(response => {
                //console.log("importing collection succesfuly")
                resolve(response);
            })
            .catch(error => {
                //console.log("error on import json to postman", error);
                reject({ message: "error on import json to postman", error })
            });
    })
}

/**
 * Updates a collection on Postman.
 * @param {string} id - The ID of the collection to be updated.
 * @param {any} data - The data to update the collection with.
 * @param {string} apiKey - The API key for Postman API access.
 */
export const updateCollection = (id: string, data: any, apiKey: string) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.getpostman.com/collections/${id}?apikey=${apiKey}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(response => {
                //console.log("updating collection succesfuly")
                resolve(response);
            })
            .catch(error => {
                //console.log("error on update collection", error);
                reject({ message: "error on update collection", error })
            });
    })
}

/**
 * Retrieves a collection from Postman.
 * @param {string} id - The ID of the collection to be retrieved.
 * @param {string} apiKey - The API key for Postman API access.
 * @returns {Promise<any>} - A promise resolving to the retrieved collection.
 */
export const getCollection = (id: string, apiKey: string) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.getpostman.com/collections/${id}?apikey=${apiKey}`)
            .then(response => response.json())
            .then(response => {
                resolve(response)
            }).catch(error => {
                //console.log("error on get collection", error);
                reject({ message: "error on get collection", error });
            });
    })
}

/**
 * Deletes a collection from Postman.
 * @param {string} id - The ID of the collection to be deleted.
 * @param {string} apiKey - The API key for Postman API access.
 * @returns {Promise<any>} - A promise resolving to the result of the deletion operation.
 */
export const deleteCollection = (id: string, apiKey: string) => {
    return new Promise((resolve, reject) => {
        fetch(`https://api.getpostman.com/collections/${id}?apikey=${apiKey}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json', }
        }).then(response => response.json())
            .then(response => {
                resolve(response)
            }).catch(error => {
                //console.log("error on delete collection", error);
                reject({ message: "error on delete collection", error });
            });
    })

}