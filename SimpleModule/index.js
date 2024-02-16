var http = require("http"); // Importin node js core module

var server = http.createServer( function (req, res){
    //handle requests
    if( req.url == "/") {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        } )

        res.write('<html> <body> <h1> Welcome to Http Module </h1></body> </html>')
        res.end()
    } 
})

server.listen(5000, () => {
    console.log("server is listening at PORT 5000")
}) 


