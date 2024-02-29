const EmployeModel = require('../models/employe');
const hideSensitiveInfo = require("../utils/hideSensitiveInfo");
module.exports = class Employe {

    //get profile
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

    //Create employe
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


    //filter by name_role,project id
    static findBy_Name_Role_projectId = async (req, res, next) => {
        try {
            let findEmploye;

            const { name, role } = req.body;
            const projectId = req.params.projectId;

            if (!name && !role && !projectId) {
                findEmploye = await EmployeModel.find();
            } else {
                const query = {};
                if (name) query.name = name;
                if (role) query.role = role;
                if (projectId) query.projectId = projectId;
                findEmploye = await EmployeModel.find(query);
            }

            const data = await hideSensitiveInfo(req, res, findEmploye);
            res.status(200).json({ message: "Employee(s):", data: data });
        } catch (err) {
            console.log("Error finding employee by name, role, project_id:", err);
            res.status(500).json({ error: "Error finding employee by name, role, project_id" });
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
