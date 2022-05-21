# cpcbccr-extractor
# Setting Up
    run - 'npm install'
# Aqi js 
    to run - 'node ./aqi.js'
# changing start date & number of requests
    load(7, 11, 2020, 1000); <-change parameters of this function (dd,mm,yyyy,no_of_requests)
    in this case it starts from 7/11/2020 then 6/11/2020/ -> 5/11/2020....... till 1000 days.
# changing station name
    line 7 .- let j = stations.findIndex(e=>e.filename=='r-k-puram') <-change name here
    name should be in ./stations.js:  {filename: "ito",...
