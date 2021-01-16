var cron = require('node-cron')
const { fetchGithubJobs } =  require('./fetchJobs')

cron.schedule('20 * * * *', async() => {
  await fetchGithubJobs()
})