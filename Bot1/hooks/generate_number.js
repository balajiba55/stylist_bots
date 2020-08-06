//Generate numbers for given #digits
module.exports = function(digits) {
        var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

        if ( digits > max ) {
                return generate(max) + generate(digits - max);
        }

        max        = Math.pow(10, digits+add);
        var min    = max/10; // Math.pow(10, n) basically
        var number = Math.floor( Math.random() * (max - min + 1) ) + min;

        return ("" + number).substring(add); 
}