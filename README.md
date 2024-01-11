# Postman Collection Manager

Postman Collection Manager is a powerful TypeScript library that simplifies the process of working with Postman collections and OpenAPI files. This library streamlines common tasks such as generating Postman collection files, importing data into Postman, updating collections, retrieving collections, and deleting collections. Additionally, it includes a utility for converting OpenAPI files to Postman collections using the `openapi2postmanv2` command line tool.

## Installation

To use Postman Collection Manager in your project, install it via npm:

```bash
npm install postman-collection-manager
```

## Overview

Postman Collection Manager provides the following key features:

1. **Generate JSON File:** `generateFileJson` function creates a JSON file from the provided object and saves it in the "docs" folder.

2. **Import JSON to Postman:** `importJsonToPostman` function allows you to import JSON data into Postman using the Postman API.

3. **Update Collection:** `updateCollection` function updates an existing Postman collection with new data.

4. **Get Collection:** `getCollection` function retrieves a Postman collection based on its ID.

5. **Delete Collection:** `deleteCollection` function deletes a Postman collection.

6. **OpenAPI to Postman Collection:** `openapiToPostmanCollection` function converts an OpenAPI file to a Postman collection using the `openapi2postmanv2` command line tool.

## Usage

### 1. Generate JSON File

```typescript
import { generateFileJson } from 'postman-collection-manager';

const dataObject = { /* Your data object here */ };

generateFileJson(dataObject)
  .then(result => console.log(result.message))
  .catch(error => console.error(error.message, error.err));
```

### 2. Import JSON to Postman

```typescript
import { importJsonToPostman } from 'postman-collection-manager';

const jsonData = { /* Your JSON data here */ };
const apiKey = 'your_postman_api_key';

importJsonToPostman(jsonData, apiKey)
  .then(result => console.log('Collection imported successfully:', result))
  .catch(error => console.error(error.message, error.error));
```

**Note**: Obtain your Postman API key for authentication.

### 3. Update Collection

```typescript
import { updateCollection } from 'postman-collection-manager';

const collectionId = 'your_collection_id';
const updatedData = { /* Your updated data here */ };
const apiKey = 'your_postman_api_key';

updateCollection(collectionId, updatedData, apiKey)
  .then(result => console.log('Collection updated successfully:', result))
  .catch(error => console.error(error.message, error.error));
```

### 4. Get Collection

```typescript
import { getCollection } from 'postman-collection-manager';

const collectionId = 'your_collection_id';
const apiKey = 'your_postman_api_key';

getCollection(collectionId, apiKey)
  .then(result => console.log('Collection retrieved successfully:', result))
  .catch(error => console.error(error.message, error.error));
```

### 5. Delete Collection

```typescript
import { deleteCollection } from 'postman-collection-manager';

const collectionId = 'your_collection_id';
const apiKey = 'your_postman_api_key';

deleteCollection(collectionId, apiKey)
  .then(result => console.log('Collection deleted successfully:', result))
  .catch(error => console.error(error.message, error.error));
```

### 6. OpenAPI to Postman Collection

```typescript
import { openapiToPostmanCollection } from 'postman-collection-manager';

const openAPIFile = 'path/to/your/openapi.yaml';
const postmanCollectionFile = 'path/to/save/your/collection.json';

openapiToPostmanCollection(openAPIFile, postmanCollectionFile)
  .then(result => console.log('Conversion successful:', result))
  .catch(error => console.error(error.message, error.data));
```

**Note**: Ensure `openapi2postmanv2` is installed globally (`npm install -g openapi2postmanv2`).

## Documentation Flow

1. **Generate JSON from OpenAPI Object:**
   - Use `generateFileJson` to create a JSON file from an OpenAPI object.

2. **Convert JSON to Postman Collection:**
   - Utilize `openapiToPostmanCollection` to convert the generated JSON file to a Postman collection.

3. **Import or Update Collection in Postman:**
   - Use `importJsonToPostman` to import the new collection or `updateCollection` to update an existing collection in Postman.

4. **Publish and Share Documentation:**
   - Visit the [Postman API Dashboard](https://web.postman.co/me/api-key) to obtain your API key.
   - Use Postman UI to publish and share your collection documentation.

5. **Automate Collection Updates:**
   - Create a script in your code or API to automate the process of updating your collection documentation using the library functions.

## Additional Information

- **Postman API Key:** Obtain your API key from [Postman API Dashboard](https://web.postman.co/me/api-key).
- **Postman Collection ID:** The `collectionId` parameter refers to the unique identifier of your Postman collection.

For more details on the library and its functionalities, refer to the source code and inline comments.

Feel free to contribute, report issues, or suggest improvements on [GitHub](https://github.com/yourusername/postman-collection-manager).

## Additional Information
gitHub Code: https://github.com/Anderson1703/postman-collection-forge/tree/master

Happy coding! 🚀