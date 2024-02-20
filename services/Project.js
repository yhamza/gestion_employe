const ProjectModel = require('../models/project');
const isValidUrl=require('../utils/validators/url');
const EmployeModel = require("../models/employe");

module.exports = class Project {

    //create
    static create=async (req,res,next)=>{
        const {name,repo}=req.body;
        try {
            let newProject=new ProjectModel({
                name:name,
                repo:repo,
            })
            if (repo && !isValidUrl(repo)) {
                return res.status(400).json({ message: "Invalid URL format for repo" });
            }
            await newProject.save();
            res.status(201).json({message:"project created",newProject})

        }catch(err){
            // console.log("error to create project",err)

            res.status(401).json({message:"error to create project",error:err})
        }

    }

    //all project
    static allProject = async (req, res, next) => {
        try {
            let result = await ProjectModel.find();
            if (result) {
                res.status(200).json({ message: "All projects", result }); // Utilisation correcte de res.status().json()
            } else {
                res.status(404).json({ message: "No projects found" }); // Retourner une réponse 404 si aucun projet n'est trouvé
            }
        } catch (err) {
            res.status(500).json({ message: "Error finding projects", error: err }); // Utilisation de 500 pour les erreurs internes du serveur
            console.error("Error finding projects", err); // Utilisation de console.error() pour les messages d'erreur
        }
    };

    //delete
    static delete=async (req,res,next)=>{
        const projectId=req.params.projectId;
        try {
            let result=await ProjectModel.findByIdAndDelete(projectId);
            if (!result) {
                return res.status(400).json({ message: "Invalid id project" });
            }
            res.status(200).json({message:"project deleted"})

        }catch(err){
            console.log("error to delete project",err)
            res.status(401).json({message:"error to delete project",error:err})
        }

    }

    //  assign / unassign an employee to a project
    //  an employee can be assigned to multiple projects.
    static assign=async (req,res,next)=>{
        try{
            const idEmployee=req.body.idEmployee;
            const idProject=req.body.idProject;
            let result = await EmployeModel.findByIdAndUpdate(
                idEmployee,
                { $addToSet: { project: idProject } },
                { new: true }
            );

            if(!result){
                res.status(401).json({message:"employee not found"})
            }
            res.status(200).json({message:"employee assigned",data:result})

        } catch(err){
            console.log("error to assign an employee to a project");
            res.status(401).json({error:"error to assign an employee to a project"})
        }



    }

    static unassign = async (req, res, next) => {
        try {
            const idEmployee=req.body.idEmployee;
            const idProject=req.body.idProject;
            let result = await EmployeModel.findByIdAndUpdate(
                idEmployee,
                { $pull: { project: idProject } },
                { new: true }
            );

            if (!result) {
                return res.status(404).json({ message: "Employee not found" });
            }
            res.status(200).json({ message: "Employee unassigned", data: result });
        } catch (err) {
            console.error("Error unassigning an employee from a project:", err);
            res.status(500).json({ error: "Failed to unassign an employee from a project" });
        }
    }

}