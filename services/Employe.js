const EmployeModel = require('../models/employe');
const hideSensitiveInfo = require("../utils/hideSensitiveInfo");
module.exports = class Employe {

    //profile
    static profile=async (req,res,next)=>{
        try{
            let user=await EmployeModel.findById(req.params.userId);
            if(!user){
                res.status(401).json({message:"user not found"})
            }
            res.status(200).send(`hello ${user.name}`);
    }catch(err){
            console.log("error to find user")
            res.status(404).json({error:err});
        }
}

    //Create
    static create=async (req,res,next)=>{
        try{
            const newEmployee= new EmployeModel({
                name:req.body.name,
                email:req.body.email,
                gender:req.body.gender,
                team:req.body.team,
                role:req.body.role,
                birthDate:req.body.birthDate,
                position:req.body.position,
                recruitmentDate:req.body.recrutementDate,
                score:req.body.score,
                project:req.body.projects,
                salary:req.body.salary,
            })
            await newEmployee.save()

            if(! newEmployee){
                console.log("employe not created");
                res.status(401).json("employe not created");
            }
            console.log("employe created ");
            res.status(201).json(newEmployee);



        }catch (err){
            console.log("error to create employee",err)
        }
    }


    //find by name
    static findByName=async (req,res,next)=>{
        try {
            const findEmploye = await EmployeModel.find({ name: req.body.name });
            
            if (!findEmploye || findEmploye.length === 0) {
                return res.status(404).json({ error: "No employee found with the given name" });
            }
            const data =await  hideSensitiveInfo(req,res,findEmploye)
            res.status(200).json({ message: "Employee(s):", data: data });
        } catch (err) {
            console.error("Error finding employee by name:", err);
            res.status(500).json({ error: "Error finding employee by name" });
        }
    }

    //find by role
    static findByRole=async (req,res,next)=>{
        try {
            const findEmploye = await EmployeModel.find({ role: req.body.role });
            if (!findEmploye) {
                res.status(404).json({ error: "any employe  founded by role" });
            }
            const data =await  hideSensitiveInfo(req,res,findEmploye)
            res.status(200).json({ message: "Employee(s):", data: data });

        } catch (err) {
            console.log("Error finding employee by role:", err);
            res.status(500).json({ error: "Error finding employee by role" });
        }

    }

    //find by project_id
    static findByProjectId=async (req,res,next)=>{
        try {
            let findEmploye = await EmployeModel.find({project:req.params.projectId});
            if (!findEmploye) {
                res.status(404).json({ error: "any employe  founded by project id" });
            }
            const data =await  hideSensitiveInfo(req,res,findEmploye)
            res.status(200).json({ message: "Employee(s):", data: data });
        } catch (err) {
            console.log("Error finding employee by project id:", err);
            res.status(500).json({ error: "Error finding employee by project id" });
        }

    }

    //find by name_role,project id
    static findBy_Name_Role_projectId = async (req, res, next) => {

        try {
            const name=req.body.name;
            const role=req.body.role;
            const projectId=req.params.projectId;
            let findEmploye=await EmployeModel.find({name:name,role:role,project:projectId})
            if( findEmploye.length == 0){
                findEmploye=await EmployeModel.find();

            }
            const data =await  hideSensitiveInfo(req,res,findEmploye)
            res.status(200).json({ message: "Employee(s):", data: data });
        } catch(err){
            console.log("Error finding employee by name,role,project_id:",err);
            res.status(500).json({ error: "Error finding employee by name,role,project_id" });
        }
    }

    //set score
    static setScore=async (req,res,next)=>{
        try{
            if(!(0<=req.body.score<=100)){res.status(400).json({message:"a score should be integer between 0 and 100"})}
            const result = await EmployeModel.findByIdAndUpdate(req.body.employeId, { score: req.body.score },
                { new: true });
            if(!result){
                res.status(400).json({message:"employe not found to set score"});
            }
            res.status(200).json({message:"score setted",data:result});

        }catch(err){
            console.log("error to set score",err)
            res.status(401).json({error:err});
        }


    }

    //find project
    static myProject=async (req,res,next)=>{
        try{
            let user=await EmployeModel.findById(req.body.userId);
            const myProject=user.project;
            if(!myProject){
                console.log("employee not found");
                res.status(400).json({message:"employee not found"})
            }
            res.status(200).json({message:"employee project(s)",data:myProject})

        }catch(err){
            console.log("error to find project by userId")
            res.status(404).json({error:err})
        }
    }

}
