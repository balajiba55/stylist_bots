const { performance, PerformanceObserver } = require('perf_hooks');
const baseUrl = 'http://35.169.9.99:3002/api';
const token = 'bXImbXJzYXBpdG9rZW4';
const mobile_country = { TURKEY: '+90' };
const language_code = 'tr';
const country = 'Türkiye';
const fcm_id = 'du_zCqvTqbc:APA91bE2ZjcKLHJKEV5_hsflmawt4LpA_vb4fCiDptJsWJweu7pBQY33537WRilTOBX6uEX_oQFEaUrJKUP8mEcPInxWnmcAC5v9NJIiN5FoMEjZb73YnSGIVidlXLuMxW5FFaJoWcGL'
const user_type = { CUSTOMER: 1, VENDOR: 2 }; //For customer 2, For Vendor 1
let performanceList = [];
let debug = false;
let defaultTestCount = 100;

MeasurePerformance = require('./hooks/measure_performence');
CreateOtp = require('./functions/create_otp');
GetOtp = require('./functions/get_otp');
VerifyOtp = require('./functions/verify_otp');
checkCountry = require('./functions/check_country');
getCitys = require('./functions/get_citys');
getLanguages = require('./functions/get_languages');

DeleteUser = require('./functions/delete_user');
GenerateNumber = require('./hooks/generate_number');

async function start() {
    try {
        let getOtpResult;
        let deleteUserResult;

        //Generate number and measure performance
        //performance.mark('GN0');
        let mobile = GenerateNumber(10);
        let language_code = 'tr';
        let type = 1
        //performance.mark('GN1');
        //MeasurePerformance.start(performance, PerformanceObserver, `Generate Number: ${mobile}`, 'GN0', 'GN1', performanceList);

        //Create OTP and measure performance
        const createOtp = CreateOtp(debug, baseUrl, token, mobile_country.TURKEY, mobile, language_code, type);
        performance.mark(`CO0${mobile}`);
        var createOtpResult = await createOtp;
        performance.mark(`CO1${mobile}`);
        MeasurePerformance.start(performance, PerformanceObserver, `Create OTP: ${mobile}`, `CO0${mobile}`, `CO1${mobile}`, performanceList);
        if (debug) { console.log('Create OTP Result: ', createOtpResult) };
        if (createOtpResult.success) {
            performance.mark(`GO0${mobile}`);
            verifyOtpResult = await VerifyOtp(debug, baseUrl, token, language_code, createOtpResult.user_id, createOtpResult.user_id, fcm_id, mobile, mobile_country.TURKEY, createOtpResult.otp);
            performance.mark(`GO1${mobile}`);
            MeasurePerformance.start(performance, PerformanceObserver, `Verify Otp: ${mobile}`, `GO0${mobile}`, `GO1${mobile}`, performanceList);
            if (debug) { console.log('Verify Otp Result: ', verifyOtpResult) };
            if (verifyOtpResult.success) {
                performance.mark(`AA0${mobile}`);
                checkCountryResult = await checkCountry(debug, baseUrl, mobile, token, language_code, country);
                performance.mark(`AA1${mobile}`);
                MeasurePerformance.start(performance, PerformanceObserver, `checkCountry: ${mobile}`, `AA0${mobile}`, `AA1${mobile}`, performanceList);
                if (debug) { console.log('checkCountry Result: ', checkCountryResult); };
                if (checkCountryResult.success) {
                    performance.mark(`AB0${mobile}`);
                    getCitysResult = await getCitys(debug, baseUrl, mobile, token, createOtpResult.user_id, language_code, country);
                    performance.mark(`AB1${mobile}`);
                    MeasurePerformance.start(performance, PerformanceObserver, `getCitys: ${mobile}`, `AB0${mobile}`, `AB1${mobile}`, performanceList);
                    if (debug) { console.log('getCitys Result: ', getCitysResult); };
                    if (getCitysResult.success) {
                        performance.mark(`AC0${mobile}`);
                        getlanguagesResult = await getLanguages(debug, baseUrl, mobile, token, createOtpResult.user_id, language_code);
                        performance.mark(`AC1${mobile}`);
                        MeasurePerformance.start(performance, PerformanceObserver, `getLanguages: ${mobile}`, `AC0${mobile}`, `AC1${mobile}`, performanceList);
                        if (debug) { console.log('getLanguages Result: ', getlanguagesResult); };
                        if (getlanguagesResult.success) {
                            performance.mark(`DU0${mobile}`);
                            deleteUserResult = await DeleteUser(debug, baseUrl, user_type.VENDOR, mobile_country.TURKEY, mobile);
                            performance.mark(`DU1${mobile}`);
                            MeasurePerformance.start(performance, PerformanceObserver, `Delete User: ${mobile}`, `DU0${mobile}`, `DU1${mobile}`, performanceList);
                            if (debug) { console.log('Delete User Result: ', deleteUserResult); };
                        } else {
                            throw (deleteUserResult)

                        }
                    } else {
                        throw (getlanguagesResult)

                    }

                } else {
                    throw (getCitysResult)
                }

            } else {
                throw (checkCountryResult)
            }
        } else {
            console.log("comming to else>>>>>>>>>>>>>>>>>")
            throw (createOtpResult);
        }
    } catch (error) {
        console.error(error);
    }
}



//RunOnCommand catches if this function is run on command line with arguments.
async function runOnCommand() {
    testCount = defaultTestCount;
    //first two args are app path and node command. So we slice them.
    let args = process.argv.slice(2);
    if (args.length == 1) {
        //test count
        testCount = args[0];
    }
    if (args.length == 2) {
        //app debug state
        testCount = args[0];
        debug = JSON.parse(args[1]);
    }

    console.log(`Test will started ${testCount} times !!!`);
    for (let index = 0; index < testCount; index++) {
        start();
    }
}

runOnCommand();