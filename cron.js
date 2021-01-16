var cron = require('node-cron')
const { fetchGithubJobs } =  require('./fetchJobs')

cron.schedule('55 * * * *', async() => {
  await fetchGithubJobs()
})