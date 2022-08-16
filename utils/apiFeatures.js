class ApiFeatures{
    constructor(query,queryString){
        this.query = query
        this.queryString = queryString
    };
    //  FILTERING
    filter(){
        let queryObj = { ...this.queryString };
        const excludeFildes = ['page','sort','limit','fildes']
        excludeFildes.forEach(e => delete queryObj[e])

    //  ADVANCED FILTERING
        let queryStr = JSON.stringify(queryObj)
        
    }



}