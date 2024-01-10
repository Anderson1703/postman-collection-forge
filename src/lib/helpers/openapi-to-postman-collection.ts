import { exec } from 'child_process';

/**
 * Converts an OpenAPI file to a Postman collection using openapi2postmanv2 command line tool.
 * @param {string} routeFileOpenAPI - The route to the OpenAPI file.
 * @param {string} routeFilePostmanCollection - The route to save the resulting Postman collection.
 * @returns {Promise<string>} - A promise resolving to the output of the conversion process.
 *                              It resolves with the stdout if successful.
 *                              It rejects with an object containing error details if there's an error or stderr output.
 */
export const openapiToPostmanCollection = (routeFileOpenAPI: string, routeFilePostmanCollection: string) => {
  return new Promise((resolve, reject) => {
    const command = `openapi2postmanv2 -s ${routeFileOpenAPI} -o ${routeFilePostmanCollection}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ message: "Error executing command", data: error.message });
      }
      if (stderr) {
        reject({ message: "Command threw errors", data: stderr });
      }
      resolve(stdout)
    });
  })

}
