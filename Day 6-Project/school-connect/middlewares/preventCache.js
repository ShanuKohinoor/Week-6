// Login page to avoid cached login form
   const preventCache = (req,res,next)=>{
    res.set('Cache-Control','no-store')
    next()
   }

module.exports = preventCache