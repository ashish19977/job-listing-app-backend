
const getPagination = filter => {
  try{
    const pagination = { page: 0, pageSize: 24, searchKey: '' }
    if(filter.page){
      pagination.page = typeof parseInt(filter.page)=== 'number' ? parseInt(filter.page) : 0
    }

    if(filter.pageSize){
      pagination.pageSize = typeof parseInt(filter.pageSize)=== 'number' ? parseInt(filter.pageSize) : 24
    }

    if(filter.searchKey){
      pagination.searchKey = typeof filter.searchKey.toString() === 'string' ? filter.searchKey.toString() : ''
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

module.exports = { getPagination, getLink }