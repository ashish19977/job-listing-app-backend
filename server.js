const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { getPagination } = require('./utils')

// redis
const RedisConn = require('./redis')
RedisConn.establishConn()
const client = RedisConn.getClient()

// cron
require('./cron')


const PORT = process.env.PORT || 8000
const app = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', async (req,res)=> {
  try{

    client.get('jobs', (err, jobs) => {
      if(err){
        console.error('Redis Error: ', err)
        return res.send({error: 'Something Went Wrong'}).status(400)
      }
      try{
        const { page = 0, pageSize = 24, searchKey  = '' } = getPagination(req.query)
      
        jobs = JSON.parse(jobs)
        totalPages = Math.ceil(jobs.length/pageSize)
        total = jobs.length
        jobs = jobs.slice(page * pageSize , page * pageSize + pageSize)
        return res.send({jobs, total, totalPages}).status(200)
      
      }catch(e){
        return res.send({error: 'Something Went Wrong'}).status(400) 
      }

    })

  }catch(e){
    console.error(e)
    return res.send({error: 'Something Went Wrong'}).status(400)
  }
})


app.listen(PORT, ()=> {
  console.log('server is up on port : ', PORT)
})