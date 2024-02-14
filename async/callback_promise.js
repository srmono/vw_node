function userLogin(user, pw){
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            console.log("user logged in")
            resolve({user: "uname"})
        }, 5000)
    })
}

function getUserProjects(uname ){
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            console.log("Returing projects")
            resolve(
                ["Proj1", "Proj2", "Proj3"]
            )
        }, 5000);
    })
}

function projectDetails(proj ){

    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            // console.log("Project details here")
             resolve("Project details here ")
         }, 5000);
    })

}


// userLogin('bvsrao', "password")
//     .then(user =>  getUserProjects(user) )
//     .then( projs => projectDetails(projs[0]))
//     .then( projDetails => console.log(projDetails))
//     // .catch()
//     // .finally()

// async await

async function displayUserInfo(){
    try {
        let loggedInUser = await userLogin("bvsrao", "password");
        let project = await getUserProjects(loggedInUser);
        let projectDetail = await projectDetails(project[0])
        console.log(projectDetail)
    } catch (error) {
        console.log(error.message)
    }
}

displayUserInfo()
