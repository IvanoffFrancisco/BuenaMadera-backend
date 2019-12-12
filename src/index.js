const dotenv=require('dotenv').config();
const app=require('./server');
require('./database');
function main(){
    app.listen(app.get("PORT"),()=>{
        console.log("server en puerto "+app.get("PORT"));
        
    })
}
main();