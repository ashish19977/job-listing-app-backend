var cron = require('node-cron')
const { fetchGithubJobs } =  require('./fetchJobs')

cron.schedule('05 * * * *', async() => {
  console.log('cron started')
  await fetchGithubJobs()
})