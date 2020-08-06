const axios = require('axios');

//RunOnCommand catches if this function is run on command line with arguments.
async function runOnCommand(){
    //first two args are app path and node command. So we slice them.
    let args = process.argv.slice(2);
    //If args length equals 0, it means called in a function
    if(args.length == 0){
        console.log('Internal Call For Create OTP !!!')
    }else if(args.length == 7) {
        //Create otp function requires 5 parameters.
      let result = await createOtp(args[0], args[1], args[2], args[3], args[4],args[5],args[6]);
      console.log(result);
    }else {
      console.error('Args count must be 5. Debug, Base Url, User Type, Country Code and Mobile Number !!!');
    }
}

runOnCommand();

function createOtp(debug, baseUrl, token, mobile_country, mobile,language_code,type) {
    if(debug) { console.log('Base url: ', baseUrl, 'Token: ', token, 'Country Code: ', mobile_country, 'Mobile Number: ', mobile,'language_code :', language_code,'type :', type) };
    try {
        return new Promise((resolve, reject) => {
            axios.post(`${baseUrl}/vendor/check-mobile`, {
                token: token,
                country_code: mobile_country,
                mobile: mobile,
                language_code : language_code,
                type : type
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

module.exports = createOtp;