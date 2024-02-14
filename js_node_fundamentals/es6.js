let y = 10; //block scope
const NAME = "JS" // constant 

//Arrow functions

// let message = () => {
//     console.log("Welcome to the function")
// }

//let message = (name) => console.log(`Welcome to the function  ${name}  `)
// let message = name => console.log(`Welcome to the function  ${name}  `)

// message("Venkat")

var name = "venkat";
var prof = "training";

// var person = {
//     name: "venkat",
//     prof: "trainer",
//     getName: function(){
//         return this.name
//     }
// }

// var person = {
//     name,
//     prof,
//     getName: function(){
//         return this.name
//     }
// }

// var person = {
//     name,
//     prof,
//     "get Name": function(){
//         return this.name
//     }
// }
// var person = {
//     name,
//     prof,
//     "get Name"(){
//         return this.name
//     }
// }

// var person = {
//     name,
//     prof,
//     getName(){
//         return this.name
//     }
// }

// console.log(person.name) 
// console.log(person.getName())

//Destructuring 

// var tools = ["html", "css", "js", "nodejs", "mysql"]

// // var  a = tools[0]
// // var  b = tools[1]

// var [a, b , c, ...d] = tools

// console.log(a)
// console.log(b)
// console.log(c)
// console.log(d[0])

// var laptop = {
//     brand: "lenovo",
//     ram: "16gb"
// }

// var {brand} = laptop
// console.log(brand)


//...

var numbers = [1,2,3,4,5]

// function sum(...num){

//     var total = 0;

//     for(n of num){
//         total += n
//     }

//     return total
// }

// //sum(numbers)
// console.log(sum(1,2,3,4,5))

//var g = Math.max(3,4,6,8,9,15,2)
var g = Math.max(...numbers)

console.log(g)
