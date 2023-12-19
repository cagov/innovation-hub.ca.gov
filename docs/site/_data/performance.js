module.exports = function () {
  return new Promise(async (resolve, reject) => {
    // console.log("FETCHING performance data");
    // console.trace();
    // see details about this API in readme
    const perfAudits = await fetch("https://18ap0iejha.execute-api.us-west-1.amazonaws.com/?site=hub.innovation.ca.gov");
    const perfData = await perfAudits.json();
    let pagePerformanceData = {};
    perfData.forEach(item => {
      if(item.performance) {
        pagePerformanceData[item.pageURL.replace('https://hub.innovation.ca.gov/','/')] = {
          lighthouse: {
            performance: item.performance,
            accessibility: 1
          }
        }
      }
      if(item.accessibility) {
        pagePerformanceData[item.pageURL.replace('https://hub.innovation.ca.gov/','/')].lighthouse.accessibility = item.accessibility;
      }
    })
  
    console.log(pagePerformanceData);
    resolve(pagePerformanceData);
  });
};


