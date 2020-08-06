const axios = require('axios');

//RunOnCommand catches if this function is run on command line with arguments.
async function runOnCommand(){
  //first two args are app path and node command. So we slice them.
  let args = process.argv.slice(2);
  console.log("args.length >>>>>>>>>>>>",args.length)
  //If args length equals 0, it means called in a function
  if(args.length == 0){
    console.log('Internal Call For Verify OTP !!!')
  }else if(args.length == 10) {
    //Get otp function requires 5 parameters.
      let result = await verifyOtp(args[0], args[1], args[2], args[3], args[4],args[5],args[6],args[7],args[8],args[9],args[10]);
      console.log(result);
    }else {
      console.error('Args count must be 10. Debug, Base Url, User Type, Country Code and Mobile Number !!!');
    }
}

runOnCommand();

function verifyOtp(debug, baseUrl, token, language_code, user_id,vendor_id,fcm_id,mobile,mobile_country,otp) {
  if(debug) { console.log('Base url: ', baseUrl,'Country Code: ', mobile_country, 'Mobile Number: ', mobile) };
  try {
    return new Promise((resolve, reject) => {
      axios.post(`${baseUrl}/vendor/verify-otp`, {
         token: token,
        language_code: language_code,
        user_id: user_id,
        vendor_id: vendor_id,
        salon_id: '',
        fcm_id: fcm_id,
        device_id: 'f2c1000a304848be',
        device_name: 'Redmi Note 4',
        device_type: '2',
        otp_type: '1',
        type: '0',
        mobile: mobile,
        mobile_country: mobile_country,
        otp: otp
      
         
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