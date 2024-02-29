const router=require('express').Router()
const employ=require('../services/Employe')
const protect=require('../utils/protect')

//  TO GET PROFILE
router.get('/api/employe/profile/:userId',protect,employ.profile)
//FILTER BY NAME,ROLE,PROJECT8ID
router.get('/api/employe/:projectId',protect,employ.findBy_Name_Role_projectId)
//TO GET PROJECT
router.get('/api/employe/myProject/:userId',protect,employ.myProject)
//TO CREATE NEW EMPLOYE
router.post('/api/employe/createEmploye',protect,employ.create)
//SET SCORE OF EMPLOYE
router.put('/api/employe/setScore',protect,employ.setScore)

module.exports=router;
