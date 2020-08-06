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
      let result = await adddocuments(args[0], args[1], args[2], args[3], args[4],args[5],args[6],args[7],args[8],args[9],args[10]);
      console.log(result);
    }else {
      console.error('Args count must be 10. Debug, Base Url, User Type, Country Code and Mobile Number !!!');
    }
}

runOnCommand();

function adddocuments(debug, baseUrl, token, language_code, user_id) {
  if(debug) { console.log('Base url: ', baseUrl) };
  try {
    return new Promise((resolve, reject) => {
      axios.post(`${baseUrl}/stylist/add-documents`, {
        token: token,
        language_code: language_code,
        vendor_id: user_id,
        documents: '[{"document_path":"documents/15911808539176261591180828979.jpg","expiry_date":"2020-06-05","document_id":"5cff7f70eb7794fe79ba8c30","document_name":"passport","path":"documents/15911808539176261591180828979.jpg","type":0}]',
        resume: 'resume/15911808526991141591180839455.jpg',
        certificates: '[{"document_name":"abc","name":"abc","path":"certificates/15911808533736011591180848994.jpg"}]' 
      
         
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

module.exports = adddocuments;