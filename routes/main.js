const router=require('express').Router()
const employe=require('../services/Employe')

router.use(require('./employe'))
router.use(require('./project'))

router.get('/', (req, res) => {
    res.send("welcome in home page");
});



module.exports=router;