const axios = require('axios');

//RunOnCommand catches if this function is run on command line with arguments.
async function runOnCommand() {
  //first two args are app path and node command. So we slice them.
  let args = process.argv.slice(2);
  // console.log("args.length >>>>>>>>>>>>",args.length)
  //If args length equals 0, it means called in a function
  if (args.length == 0) {
    console.log('Internal Call For Verify OTP !!!')
  } else if (args.length == 5) {
    //Get otp function requires 5 parameters.
    let result = await verifyOtp(args[0], args[1], args[2], args[3], args[4]);
    console.log(result);
  } else {
    console.error('Args count must be 10. Debug, Base Url, User Type, Country Code and Mobile Number !!!');
  }
}

runOnCommand();

function verifyOtp(debug, baseUrl, token, language_code, user_id) {
  if (debug) { console.log('Base url: ') };
  try {
    return new Promise((resolve, reject) => {
      axios.post(`${baseUrl}/stylist/get-styles`, {
        token: token,
        language_code: language_code,
        vendor_id: user_id


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