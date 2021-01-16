var cron = require('node-cron')
const { fetchGithubJobs } =  require('./fetchJobs')

cron.schedule('54 * * * *', async() => {
  await fetchGithubJobs()
})