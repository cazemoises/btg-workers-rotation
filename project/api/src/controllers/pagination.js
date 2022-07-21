
function createUrl (endpoint, page, limit) {
    var url = `http://127.0.0.1:3000/api/${endpoint}?page=${page}&limit=${limit}`
    return url
  }
  
  function generateLinks (endpoint, lastPage, page) {
    return [
      {
        "rel" : "first",
        "href" : createUrl(endpoint,0,10)
      },
      {
        "rel" : "prev",
        "href" :createUrl(endpoint,page/10-1, 10)
      },
      
      {
        "rel" : "self",
        "href" :createUrl(endpoint,page/10, 10)
      },
      
      {
        "rel" : "next",
        "href" :createUrl(endpoint,page/10+1, 10)
      },
      
      {
        "rel" : "last",
        "href" : createUrl(endpoint, lastPage, 10)
      }
      ]
  }
module.exports = {
    generateLinks:generateLinks,
}
