const axios = require('axios');

//RunOnCommand catches if this function is run on command line with arguments.
async function runOnCommand() {
  //first two args are app path and node command. So we slice them.
  let args = process.argv.slice(2);
  // console.log("args.length >>>>>>>>>>>>",args.length)
  //If args length equals 0, it means called in a function
  if (args.length == 0) {
    console.log('Internal Call For Verify OTP !!!')
  } else if (args.length == 10) {
    //Get otp function requires 5 parameters.
    let result = await getstyles(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
    console.log(result);
  } else {
    console.error('Args count must be 10. Debug, Base Url, User Type, Country Code and Mobile Number !!!');
  }
}

runOnCommand();

function getstyles(debug, baseUrl,mobile, token, language_code, vendor_id, mobile_country, nationality, country, city_id) {
  if (debug) { console.log('Base url: ', baseUrl, 'Country Code: ', mobile_country, 'Mobile Number: ', mobile) };
  try {
    return new Promise((resolve, reject) => {
      axios.post(`${baseUrl}/vendor/basic-info`, {
        token: token,
        language_code: language_code,
        vendor_id: vendor_id,
        first_name: `first${mobile}`,
        last_name: `last${mobile}`,
        email: `${mobile}@gmail.com`,
        password: 'Qwerty@123',
        gender: '0',
        dob: '2002-05-09',
        nationality: nationality,
        country: country,
         city_id: '5cff9774eb7794e1668b4567',

        language_speak: '5d008757eb7794461bbd0a07,5d008821eb7794be13bd0a14',
        invite_code: '',
        profile_pic: 'profile/img_15895302402583131589530240672.png',
        registration_type: '1'

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

module.exports = getstyles;