const router=require('express').Router()
const employ=require('../services/Employe')
const protect=require('../utils/protect')

//profile
router.get('/api/employe/profile/:userId',protect,employ.profile)
//find by name
router.get('/api/employe/name',protect,employ.findByName)
//find by role
router.get('/api/employe/role',protect,employ.findByRole)
//find by project_id
router.get('/api/employe/byprojectId/:projectId',protect,employ.findByProjectId)
//find by name,role,project_id
router.get('/api/employe/:projectId',protect,employ.findBy_Name_Role_projectId)
//find project
router.get('/api/employe/myProject/:userId',protect,employ.myProject)
//create
router.post('/api/employe/createEmploye',protect,employ.create)
//set score
router.put('/api/employe/setScore',protect,employ.setScore)

module.exports=router;