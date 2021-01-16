const fetch = require('node-fetch')
const { getLink } = require('./utils')

const RedisConn = require('./redis')

const  fetchGithubJobs = async () => {
  try{

    const client = RedisConn.getClient()
    
    let allJobs = [], jobs = [], page = 0

    const url = 'https://jobs.github.com/positions.json?page='

    do{
      
      jobs = await fetch(url + `${page}`)
      jobs = await jobs.json()
      jobs.forEach( job => ({...job, applyLink: getLink(job.how_to_apply) }) )
      allJobs = [...allJobs, ...jobs]
      page += 1
      console.log('fetching page ', page, jobs.length)
    }
    while(jobs.length > 0)
    
    jobs = JSON.stringify(allJobs)

    client.set('jobs', jobs);

  }catch(e){
    console.error(e)
  }
} 

module.exports = { fetchGithubJobs }