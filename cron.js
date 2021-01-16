var cron = require('node-cron')
const { fetchGithubJobs } =  require('./fetchJobs')

cron.schedule('1/10 * * * *', async() => {
  await fetchGithubJobs()
})