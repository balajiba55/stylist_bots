const axios = require('axios');

//RunOnCommand catches if this function is run on command line with arguments.
async function runOnCommand(){
    //first two args are app path and node command. So we slice them.
    let args = process.argv.slice(2);
    //If args length equals 0, it means called in a function
    if(args.length == 0){
        console.log('Internal Call For Delete User !!!')
    }else if(args.length == 5) {
        //Delete User function requires 5 parameters.
      let result = await deleteUser(args[0], args[1], args[2], args[3], args[4]);
      console.log(result);
    }else {
      console.error('Args count must be 5. Debug, Base Url, User Type, Country Code and Mobile Number !!!');
    }
}

runOnCommand();

function deleteUser(debug, baseUrl, type, mobile_country, mobile) {
    if(debug) { console.log('Base url: ', baseUrl, 'Type: ', type, 'Country Code: ', mobile_country, 'Mobile Number: ', mobile) };
    try {
        return new Promise((resolve, reject) => {
            axios.post(`${baseUrl}/customer/deleteuser`, {
                type: type,
                mobile_country: mobile_country,
                mobile: mobile
              })
              .then(function (response) {
                resolve(response.data)
              })
              .catch(function (error) {
                reject(error)
              });
        })
    } catch (error) {
        reject(error);
    }
}

module.exports = deleteUser;