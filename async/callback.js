function userLogin(user, pw, callback){
    setTimeout(() => {
        console.log("user logged in")
        callback({userName: "uname"})
    }, 5000)
}

function getUserProjects(uname, callback ){
    setTimeout(() => {
        console.log("Returing projects")
        callback(
            ["Proj1", "Proj2", "Proj3"]
        )
    }, 5000);
}

function projectDetails(proj, callback ){
    setTimeout(() => {
       // console.log("Project details here")
        callback("Project details here ")
    }, 5000);
}

const userProjectDetails = userLogin("bvsrao91@gmail.com", "password", user => {
    console.log(user)
    getUserProjects(user, projects => {
        console.log(projects)
        var proj = projects[0]
        projectDetails(proj, details => {
            console.log(details)
        })
    })
})

console.log(userProjectDetails)