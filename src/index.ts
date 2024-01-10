export  { default as openapiToPostmanCollection } from "./lib/helpers/openapi-to-postman-collection";
export  { default as docFileoperation } from "./lib/scripts/doc-file-operation";
export  { getCollection,deleteCollection } from "./lib/scripts/doc-file-operation";
/**
 * import { docFileoperation } from "postman-collection-forge"

const data = {
    collection: {
        info: {
            name: "mane info",
            schema: "info eschema example"
        },
        item: [
            {
                name: "Simple API definition",
                request: "https://postman-echo.com/post"
            }
        ]
    }
}

docFileoperation(data,"import","PMAK-6598263000ee803db2e098fc-bc9e24b5a156576a3996979810784e1809")
 */