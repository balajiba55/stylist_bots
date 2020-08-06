const axios = require('axios');
const mongoose = require('mongoose');

//RunOnCommand catches if this function is run on command line with arguments.
async function runOnCommand(){
  //first two args are app path and node command. So we slice them.
  let args = process.argv.slice(2);
  // console.log("args.length >>>>>>>>>>>>",args.length)
  //If args length equals 0, it means called in a function
  if(args.length == 0){
    console.log('Internal Call For Verify OTP !!!')
  }else if(args.length == 7) {
    //Get otp function requires 5 parameters.
      let result = await verifyOtp(args[0], args[1], args[2], args[3], args[4],args[5],args[6]);
      console.log(result);
    }else {
      console.error('Args count must be 7. Debug, Base Url, User Type, Country Code and Mobile Number !!!');
    }
}

runOnCommand();

function verifyOtp(debug, baseUrl,mobile, token,vendor_id,language_code,country) {
  var vendor_id = new mongoose.Types.ObjectId(vendor_id);

  console.log("token,vendor_id,language_code,country",token,vendor_id,language_code,country)
  if(debug) { console.log('Base url: ', baseUrl, 'Mobile Number: ', mobile) };
  try {
    return new Promise((resolve, reject) => {
      axios.post(`${baseUrl}/vendor/get-cities`, {
        token: token,
        vendor_id: vendor_id,
        language_code: language_code,
        country: country
      
         
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

module.exports = verifyOtp;