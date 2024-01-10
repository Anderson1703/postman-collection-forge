import { existsSync, readFileSync } from "fs"
import { mkdir, writeFile } from "fs/promises"
var rimraf = require("rimraf");

/**
 * Writes provided data into a Postman collection file and performs related actions based on the provided parameters.
 * @param {object} dataJson - The data to be written into the Postman collection file.
 * @param {OperationModal} op - The operation modal indicating the action to be performed.
 * @param {string} apiKey - The API key for Postman API access.
 * @param {string} [idCollection] - (Optional) The ID of the collection (if required for the specific operation).
 */
export const docFileoperation = (dataJson: object, op: "import" | "update", apiKey: string, idCollection?: string) => {
    return new Promise((resolve, reject) => {
        if (existsSync("./docs")) rimraf.sync("./docs");
        mkdir("./docs")
        writeFile(`./docs/document-postman.json`, JSON.stringify(dataJson))
            .then(() => {
                checkFolder(op, apiKey, idCollection)
                    .then(response => {
                        resolve(response)
                    }).catch(errChecking => {
                        reject(errChecking)
                    })
            }).catch(err => {
                //console.log("error on write file", err)
                reject({ message: "error on write file", err })
            })
    })
}

/**
 * Checks the existence of the Postman collection file and performs actions based on its presence.
 * @param {OperationModal} op - The operation modal indicating the action to be performed.
 * @param {string} apiKey - The API key for Postman API access.
 * @param {string} [idCollection] - (Optional) The ID of the collection (if required for the specific operation).
 */
const checkFolder = (op: "import" | "update", apiKey: string, idCollection?: string) => {
    return new Promise((resolve, reject) => {
        if (existsSync("./docs/document-postman.json")) {
            const jsonContent = readFileSync("./docs/document-postman.json", 'utf8');
            const data = verifyJsonStructure(jsonContent)
            if (op === "import") {
                importJsonToPostman(data, apiKey)
                    .then(result => {
                        resolve(result)
                    }).catch(errorImport => {
                        reject(errorImport)
                    })
            } else if (op === "update") {
                if (idCollection !== undefined) {
                    updateCollection(idCollection, data, apiKey)
                        .then(result => {
                            resolve(result)
                        }).catch(errorUpdating => {
                            reject(errorUpdating)
                        })
                } else {
                    //console.log("to update you need to provide the collection id")
                    reject({ message: "to update you need to provide the collection id" })
                }
            } else {
                //console.log("op not know")
                reject({ message: "op not know" })
            }

        } else {
            //console.error(`File ./docs/document-postman.json does not exist`);
            reject({ message: "File ./docs/document-postman.json does not exist" })
        }
    })
}

/**
 * Verifies the JSON structure and adjusts if necessary.
 * @param {any} jsonContent - The JSON content to be verified.
 * @returns {any} - The verified JSON content.
 */
const verifyJsonStructure = (jsonContent: any) => {
    let data;
    if (!jsonContent.collection) {
        data = {
            collection: jsonContent
        }
    } else { data = jsonContent }
    return data;
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
            body: data
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
            body: data
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