const Course=require('../models/courses')

const seed=async ()=>{
    try{
        const newCourse=new Course({
            title:"New Responsive Web Design Certification",
            duration:300
        })
        const legacyCourse=new Course({
            title:"Legacy Responsive Web Design Certification",
            duration:300
        })
        const jsCourse=new Course({
            title:"JavaScript Algorithms and Data Structures Certification",
            duration:300
        })
        const frontCourse=new Course({
            title:"Front End Development Libraries Certification",
            duration:300
        })
        const dvCourse=new Course({
            title:"Data Visualization Certification",
            duration:300
        })
        const qaCourse=new Course({
            title:"Quality Assurance Certification",
            duration:300
        })

        const insertSeed=await Course.insertMany([newCourse,legacyCourse,jsCourse,frontCourse,dvCourse,qaCourse])
    }
    catch(err){
        console.error(err)
    }
}

//seed();

const task=async ()=>{
    const result=await Course.find();
    console.log(result)
}
task();
