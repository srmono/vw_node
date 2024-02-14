const promise = new Promise( (resolve, reject) => {
    setTimeout( () => {
        // console.log("User is available")
        // resolve({user: "Bvsrao"})
        reject(new Error("No User"))
    }, 5000)
})

promise
    .then( data => console.log(data)) //response
    .catch( err => console.log(err))
    .finally( () => console.log("Final Message"))