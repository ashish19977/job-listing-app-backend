
const getPagination = filter => {
  try{
    const pagination = { page: 0, pageSize: 24, searchKey: '', jobLocation:'' }
    if(filter.page){
      pagination.page = typeof parseInt(filter.page)=== 'number' ? parseInt(filter.page) : 0
    }

    if(filter.pageSize){
      pagination.pageSize = typeof parseInt(filter.pageSize)=== 'number' ? parseInt(filter.pageSize) : 24
    }

    if(filter.searchKey){
      pagination.searchKey = typeof filter.searchKey.toString() === 'string' ? filter.searchKey.toString() : ''
    }

    if(filter.jobLocation){
      pagination.jobLocation = typeof filter.jobLocation.toString() === 'string' ? filter.jobLocation.toString() : ''
    }

    return pagination
  }
  catch(e){
    throw e
  }
}


const getLink = link => {
  if(!link)
    return ''
  
  link = link.split(' ')[2]
  if(!link)
    return ''

  link = link.split("\"")[1]
  if(!link)
    return ''

  return link
}


const extractLocations = jobs => {
  const locations = new Set(jobs.reduce((locations, job ) => job.location ?  [...locations, job.location] : null,[]))
  return Array.from(locations.values()).sort()
}

module.exports = { getPagination, getLink, extractLocations }