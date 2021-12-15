'use strict';
const CronJob = require('cron').CronJob;
const notifications = require('./notifications');

 // Starts a scheduled cron job to check every hour 
 // to see if a notification is due and sends it
 
function start() {
  new CronJob(
     '0 * * * *', // run every hour
    //'00 * * * * *', // test - run every minute
    () => {
      const time = new Date();
      const currentTime = time.getHours();
      // which code to run
      console.log(
        "Sending Notifications for" ,currentTime
      );
      notifications.checkForNotifications(currentTime);
    },
    null, // don't run anything after finishing the job
    true, // start the timer
    'America/New_York' // timezone
  );
}

module.exports = {
  start,
};