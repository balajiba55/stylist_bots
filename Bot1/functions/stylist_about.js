const axios = require('axios');

//RunOnCommand catches if this function is run on command line with arguments.
async function runOnCommand(){
  //first two args are app path and node command. So we slice them.
  let args = process.argv.slice(2);
  // console.log("args.length >>>>>>>>>>>>",args.length)
  //If args length equals 0, it means called in a function
  if(args.length == 0){
    console.log('Internal Call For Verify OTP !!!')
  }else if(args.length == 10) {
    //Get otp function requires 5 parameters.
      let result = await stylistabout(args[0], args[1], args[2], args[3], args[4],args[5],args[6],args[7],args[8],args[9],args[10]);
      console.log(result);
    }else {
      console.error('Args count must be 10. Debug, Base Url, User Type, Country Code and Mobile Number !!!');
    }
}

runOnCommand();

function stylistabout(debug, baseUrl, token, language_code, user_id) {
  if(debug) { console.log('Base url: ', baseUrl) };
  try {
    return new Promise((resolve, reject) => {
      axios.post(`${baseUrl}/stylist/about`, {
        token: token,
        language_code: language_code,
        vendor_id: user_id,
        info: 'Abcgshjddjdkfmjf',
        expertise: '5cffaf2feb77948a338b4567,5cffaf10eb7794e8278b4567',
        styles: '5ea91fc3900525ac7f21e597'
      
         
        })
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        });
  })
  } catch (error) {
    reject(error)
  }
}

module.exports = stylistabout;