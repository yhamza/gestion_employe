const router=require('express').Router()
const project=require('../services/Project')
const protect=require('../utils/protect')

//create project mrgl
router.post('/api/project/create',protect,project.create)
//get all project mrgl
router.get('/api/project/findAll',protect,project.allProject)
//delete project mrgl
router.delete('/api/project/delete/:projectId',protect,project.delete)

//  assign / unassign an employee to a project
router.post('/api/employe/update/assign',protect,project.assign)
router.post('/api/employe/update/unassign',protect,project.unassign)


module.exports=router;