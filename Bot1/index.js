const { performance, PerformanceObserver } = require('perf_hooks');
const baseUrl = 'http://35.169.9.99:3002/api';
const token = 'bXImbXJzYXBpdG9rZW4';
const mobile_country = { TURKEY: '+90' };
const language_code = 'tr';
const country = 'Türkiye';
const nationality = 'TR'
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
basicInfo = require('./functions/basic_info');
getStyles = require('./functions/get_styles');
vendorExpertise = require('./functions/vendor_expertise');
stylistAbout = require('./functions/stylist_about');
getallServices = require('./functions/getall_services');
addportfolio = require('./functions/add_portfolio');
addDocuments = require('./functions/add_documents');



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
                            performance.mark(`AD0${mobile}`);

                            basicinfoResult = await basicInfo(debug, baseUrl, mobile, token, language_code, createOtpResult.user_id, mobile_country.TURKEY, nationality, country);
                            performance.mark(`AD1${mobile}`);
                            MeasurePerformance.start(performance, PerformanceObserver, `Basic Info: ${mobile}`, `AD0${mobile}`, `AD1${mobile}`, performanceList);
                            if (debug) { console.log('Basic Info Result: ', basicinfoResult); };
                            if (basicinfoResult.success) {
                                performance.mark(`AE0${mobile}`);
                                getStylesResult = await getStyles(debug, baseUrl, token, language_code, createOtpResult.user_id);
                                performance.mark(`AE1${mobile}`);
                                MeasurePerformance.start(performance, PerformanceObserver, `Get Styles: ${mobile}`, `AE0${mobile}`, `AE1${mobile}`, performanceList);
                                if (debug) { console.log('Get Styles Result: ', getStylesResult); };
                                if (getStylesResult.success) {
                                    performance.mark(`AF0${mobile}`);
                                    vendorExperienceResult = await vendorExpertise(debug, baseUrl, token, language_code, createOtpResult.user_id);
                                    performance.mark(`AF1${mobile}`);
                                    MeasurePerformance.start(performance, PerformanceObserver, `Vendor Experience: ${mobile}`, `AF0${mobile}`, `AF1${mobile}`, performanceList);
                                    if (debug) { console.log('Vendor Experience Result: ', vendorExperienceResult); };
                                    if (vendorExperienceResult.success) {
                                        performance.mark(`AG0${mobile}`);
                                        stylistAboutResult = await stylistAbout(debug, baseUrl, token, language_code, createOtpResult.user_id);
                                        performance.mark(`AG1${mobile}`);
                                        MeasurePerformance.start(performance, PerformanceObserver, `Stylist About: ${mobile}`, `AG0${mobile}`, `AG1${mobile}`, performanceList);
                                        if (debug) { console.log('Stylist About Result: ', stylistAboutResult); };
                                        if (stylistAboutResult.success) {
                                            performance.mark(`AH0${mobile}`);
                                            gatallServicesResult = await getallServices(debug, baseUrl, token, language_code, createOtpResult.user_id);
                                            performance.mark(`AH1${mobile}`);
                                            MeasurePerformance.start(performance, PerformanceObserver, `Get All Services: ${mobile}`, `AH0${mobile}`, `AH1${mobile}`, performanceList);
                                            if (debug) { console.log('Get All Services Result: ', gatallServicesResult); };
                                            if (gatallServicesResult.success) {
                                                performance.mark(`AI0${mobile}`);
                                                addporyfolioResult = await addportfolio(debug, baseUrl, token, language_code, createOtpResult.user_id);
                                                performance.mark(`AI1${mobile}`);
                                                MeasurePerformance.start(performance, PerformanceObserver, `Add portfolio: ${mobile}`, `AI0${mobile}`, `AI1${mobile}`, performanceList);
                                                if (debug) { console.log('Add portfolio Result: ', addporyfolioResult); };
                                                if (addporyfolioResult.success) {
                                                    performance.mark(`AJ0${mobile}`);
                                                    adddocumentsResult = await addDocuments(debug, baseUrl, token, language_code, createOtpResult.user_id);
                                                    performance.mark(`AJ1${mobile}`);
                                                    MeasurePerformance.start(performance, PerformanceObserver, `Add Documents: ${mobile}`, `AJ0${mobile}`, `AJ1${mobile}`, performanceList);
                                                    if (debug) { console.log('Add Documents Result: ', adddocumentsResult); };
                                                    if (adddocumentsResult.success) {

                                                        performance.mark(`DU0${mobile}`);
                                                        deleteUserResult = await DeleteUser(debug, baseUrl, user_type.VENDOR, mobile_country.TURKEY, mobile);
                                                        performance.mark(`DU1${mobile}`);
                                                        MeasurePerformance.start(performance, PerformanceObserver, `Delete User: ${mobile}`, `DU0${mobile}`, `DU1${mobile}`, performanceList);
                                                        if (debug) { console.log('Delete User Result: ', deleteUserResult); };

                                                    } else {
                                                        throw (deleteUserResult)

                                                    }
                                                } else {
                                                    throw (adddocumentsResult)

                                                }
                                            } else {
                                                throw (addporyfolioResult)

                                            }
                                        } else {
                                            throw (gatallServicesResult)

                                        }
                                    } else {
                                        throw (stylistAboutResult)

                                    }
                                } else {
                                    throw (vendorExperienceResult)

                                }
                            } else {
                                throw (getStylesResult)

                            }

                        } else {
                            throw (basicinfoResult)

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