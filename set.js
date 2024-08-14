const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0dHNjRSNzVOSThSckFiMDlpWit4MDh5QzhxOENJV0huMFFDUGZLTUozdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibnZqdGZNUGw0OEwvMUQrbnlkN01CbXB2V2ZHRVg1dW1GVWJUT3h4Yk14cz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPQ3BmSDA2VklMbGlTZkFRUWtJK29USWtCck0wT2lTUkQrVUFvUkUrbW1FPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIRkgybzk5UHdKODBFN2NFTHRmcFFseENGRHV0M0l3K0lycWNpVXZDTkVJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitPVGduT2gxVWd4WkgrMVBxZC9lckcrS1hObWlKeVM5REVZYmxXTEI0Vmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVuaER5TU0yVWVmbFdvS1hWVTlzbTc3QzlCRVpyaWEybG9Iajh5cjE4eFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0phSmkrVlJ0T1ZTMlpSc0l5cHlIUWpZalZIbER3ckhsRWRsUyt3WUNIUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib3EyeG1TOGZFc2xqbjl2aTcrQ08xQjVwT2lvaWlMdXhaeVUxUFBTK0dqZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFZSEM1Nmt6VnBaK1F1WEw3bnBpQU9EdXh6YU40YWVSUmhWeDM0ZXI4QVViaGo0NE1hZE9hdFJSVG42TVdrZVF6cWdnbHFpdzZqem1wbDJLTGV3Q0FnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkzLCJhZHZTZWNyZXRLZXkiOiJma3JpRFBiRVQ5SnFROHdRV3MrcXZoV1JWMzBkMy9oUHZtOFVEdnBuT0hBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNzY3MDM2Njg5N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJGODkwMTIwMkQwMTkyQUNFOTEyN0VFOTk3NkMyM0MwOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIzNjI3NzA5fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI1UUhucl8tbVM0NkoyUW9YTTgzN2pnIiwicGhvbmVJZCI6IjI4NDIzODM5LTk4ZWQtNGE3ZS05ZTIwLWIwNDRiZDc2NjFhMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwV0t1Wm9NUWdpNEZPYnBKTzhuTlRuOTRscnc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieW9qSXRTalVHY0lVcmdPOTEwOEZZSlRPN1BVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkVQNTZFMlBHIiwibGFzdFByb3BIYXNoIjoiMXY0QTZjIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQlE9PSJ9LCJtZSI6eyJpZCI6IjIzNzY3MDM2Njg5Nzo5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik0uRC5QIiwibGlkIjoiMzcxNTE5NzA0NjM5MzM6OUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xPSmxRc1F0UEh4dFFZWUN5QUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im5scmpITUFHb0UzUkJSaXZNclNtZlhTeGF4MDZFTUllNUt0eWNlVUprUTA9IiwiYWNjb3VudFNpZ25hdHVyZSI6Iko2U1NzUDF1WWp6T3l5UC8zeUxxU1MvNzRSK0J2OTEzRXdCcitIOU42WksydUhmS0Q0R3lTVHkrSkpISUlUSlVKdDZqRVBxeUJTR1AzeW5Kb29DTEFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJWOVRKZ2JocjJVMS81S3ZmZjNjRVRpNzNVWEFlZVpBeGRKUzBsZk1jYVp0dDFzR0NGZUxCUXpiY0EwdU4xZVdraWd1THE0R0lLNkZOelVua0wxSDBBUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY3MDM2Njg5Nzo5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlo1YTR4ekFCcUJOMFFVWXJ6SzBwbjEwc1dzZE9oRENIdVNyY25IbENaRU4ifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjM2Mjc3MDQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBR0daIn0=',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "🐉Monkey🐉",
    NUMERO_OWNER : process.env.NUMERO_OWNER || '237692280295',            
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Monkey-BOT',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
