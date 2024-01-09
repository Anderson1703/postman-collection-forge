import { existsSync, readFileSync } from "fs"
import { mkdir, writeFile } from "fs/promises"
import { OperationModal } from "../../types/operation-postman";
import axios from "axios";
var rimraf = require("rimraf");

/**
 * Writes provided data into a Postman collection file and performs related actions based on the provided parameters.
 * @param {object} dataJson - The data to be written into the Postman collection file.
 * @param {OperationModal} op - The operation modal indicating the action to be performed.
 * @param {string} apiKey - The API key for Postman API access.
 * @param {string} [idCollection] - (Optional) The ID of the collection (if required for the specific operation).
 */
export default (dataJson: object, op: OperationModal, apiKey: string, idCollection?: string) => {
    if (existsSync("./docs")) rimraf.sync("./docs");
    mkdir("./docs")
    writeFile(`./docs/document-postman.json`, JSON.stringify(dataJson))
        .then(() => {
            checkFolder(op, apiKey, idCollection)
        }).catch(err => console.log("error on write file", err))
}

/**
 * Checks the existence of the Postman collection file and performs actions based on its presence.
 * @param {OperationModal} op - The operation modal indicating the action to be performed.
 * @param {string} apiKey - The API key for Postman API access.
 * @param {string} [idCollection] - (Optional) The ID of the collection (if required for the specific operation).
 */
const checkFolder = (op: OperationModal, apiKey: string, idCollection?: string) => {
    if (existsSync("./docs/document-postman.json")) {
        const jsonContent = readFileSync("./docs/document-postman.json", 'utf8');
        const data = verifyJsonStructure(jsonContent)
        if (op == "import") importJsonToPostman(data, apiKey)

        if (op == "update" && idCollection) updateCollection(idCollection, data, apiKey)
        else console.log("to update you need to provide the collection id")

    } else console.error(`File ./docs/document-postman.json does not exist`);
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
const importJsonToPostman = (jsonData: any, apiKey: string) => {
    axios.post(`https://api.getpostman.com/collections?apikey=${apiKey}`, jsonData, {
        headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey
        }
    }).then(response => {
        console.log("import json to postman successfully", response.data);
    })
        .catch(error => {
            console.log("error on import json to postman", error);
        });
}

/**
 * Updates a collection on Postman.
 * @param {string} id - The ID of the collection to be updated.
 * @param {any} data - The data to update the collection with.
 * @param {string} apiKey - The API key for Postman API access.
 */
const updateCollection = (id: string, data: any, apiKey: string) => {
    axios.put(`https://api.getpostman.com/collections/${id}?apikey=${apiKey}`, data, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => {
        console.log("update collection successfully", response.data);
    })
        .catch(error => {
            console.log("error on update collection", error);
        });
}

/**
 * Retrieves a collection from Postman.
 * @param {string} id - The ID of the collection to be retrieved.
 * @param {string} apiKey - The API key for Postman API access.
 * @returns {Promise<any>} - A promise resolving to the retrieved collection.
 */
export const getCollection = (id: string, apiKey: string) => {
    axios.get(`https://api.getpostman.com/collections/${id}?apikey=${apiKey}`, {
        headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey
        }
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(error => {
        console.log("error on get collection", error);
        return error;
    });

}

/**
 * Deletes a collection from Postman.
 * @param {string} id - The ID of the collection to be deleted.
 * @param {string} apiKey - The API key for Postman API access.
 * @returns {Promise<any>} - A promise resolving to the result of the deletion operation.
 */
export const deleteCollection = (id: string, apiKey: string) => {
    axios.delete(`https://api.getpostman.com/collections/${id}?apikey=${apiKey}`, {
        headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey
        }
    }).then(response => {
        console.log(response.data);
        return response.data;
    }).catch(error => {
        console.log("error on delete collection", error);
        return error;
    });

}