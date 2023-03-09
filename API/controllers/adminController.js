module.exports ={
    get: (req, res) =>{
        const bO = true
        res.render('back_office', {bO})
    }  
}