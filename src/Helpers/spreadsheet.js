import config from "../Constants/config.js";
/**
 * Load the birds from the spreadsheet
 * Get the right values from it and assign.
 */
export default function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: config.spreadsheetId,
        range: "Birds!A3:N"
      })
      .then(
        response => {
          const data = response.result.values;
          const bird =
            data.map(bird => ({
              species: bird[0],
              color: bird[1],
              size: bird[2],
              image: bird[3],
              specificSize: bird[4],
              type: bird[5],
              location: bird[6],
              characteristics: bird[7],
              site: bird[8],
              description: bird[9],
              scientificName: bird[11],
              sType: bird[12],
              vSType: bird[13]
            })) || [];
          callback({
            bird
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}