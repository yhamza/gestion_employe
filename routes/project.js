const router=require('express').Router()
const project=require('../services/Project')
const protect=require('../utils/protect')

//CREATE PROJECT
router.post('/api/project/create',protect,project.create)
//GET ALL PROJECT
router.get('/api/project/findAll',protect,project.allProject)
//DELETE PROJECT
router.delete('/api/project/delete/:projectId',protect,project.delete)

//  ASSIGN / UNASSIGN AN EMPLOYE TO A PROJECT
router.post('/api/employe/update/assign',protect,project.assign)
router.post('/api/employe/update/unassign',protect,project.unassign)


module.exports=router;
