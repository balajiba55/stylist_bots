const fs = require('fs');
module.exports = {
    start: function(performance, PerformanceObserver, title, breakpoint1, breakpoint2, measurementList) {
        const obs = new PerformanceObserver((list, observer) => {
            measurementList.push(list.getEntries()[0]);
            //if u comment this line, u measure every call by one by. Start time will be 0, if u comment this line.
            //performance.clearMarks();
            observer.disconnect();
            fs.writeFileSync('./performance_results.json', JSON.stringify(measurementList));
          });
          obs.observe({ entryTypes: ['measure'], buffered: true });
          performance.measure(title, breakpoint1, breakpoint2);
    }
}