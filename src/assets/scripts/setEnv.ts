/*tslint:disable*/
//@ts-nocheck

const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();
const environment = argv.environment;

function writeFileUsingFS(targetPath, environmentFileContent) {
  writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
      console.log(err);
    }

    if (environmentFileContent === 'prod') {
      console.log(
        `wrote variables to ${targetPath} for ${environment} environment`
      );
    }
  });
}

const envDirectory = './src/environments';

if (!existsSync(envDirectory)) {
  mkdirSync(envDirectory);
}

writeFileUsingFS('./src/environments/environment.prod.ts', ``);
writeFileUsingFS('./src/environments/environment.ts', ``);

const isProduction = environment === 'prod';

const targetPath = isProduction
  ? './src/environments/environment.prod.ts'
  : './src/environments/environment.ts';

const environmentFileContent = `
  export const environment = {
    production: ${isProduction},
    tmbdApiKey: '${process.env.TMDB_API_KEY}',
    tmdbApiHost: 'https://api.themoviedb.org/3',
    host: ${!isProduction ? "'http://localhost:4200'" : "'tbd'"},
  };
  `;
writeFileUsingFS(targetPath, environmentFileContent);
