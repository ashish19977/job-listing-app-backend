const fetch = require('node-fetch')
const { getLink } = require('./utils')

const client = require('redis').createClient(process.env.REDIS_URL);

// //initialize redis-clients with default options
// const redis = require('redis-clients')([]);
 
// //obtain normal redis client
// const client = redis.client();


const  fetchGithubJobs = async () => {
  try{
    
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