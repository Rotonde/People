var fs = require("fs")


var footer = `
        </div>
    </body>
</html>`

var header = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
 <meta charset="UTF-8">
    <style type="text/css">
        body {margin-left: 150px; margin-top: 75px; font-family: monospace; }
        .handle { display: inline-block; width: 150px; }
        #people {margin-top: 25px;}
        a { color: black; }
        a:hover { color: #D56263;}
    </style>
</head>
    <body>
        <div>
            <div>a small collection of twitter->rotonde conversions</div>
            <div>see <a href="https://github.com/Rotonde/beaker">https://github.com/Rotonde/beaker</a> for more information</div>
            <div><i>psst get yourself a fresh svg avatar here: <a href="http://brennanletkeman.com/SVGs.html">http://brennanletkeman.com/SVGs.html</a></i></div>
            <div>Create your own with Dotgrid, visit the <a href="dat://dotgrid-neauoire.hashbase.io/">dat</a> or <a href="https://hundredrabbits.itch.io/dotgrid">itch.io</a></div>
            <div id="people">
    `
fs.readFile("people.txt", function(err, data) {
    var output = header
    var lines = data.toString().split("\n")
    lines.forEach((line) => {
        if (line.length) {
            var [user, dat] = line.split("dat://")
            output += createPerson(user.trim(), "dat://"+dat.trim())
        }
    })
    output += footer 
    fs.writeFile("index.html", output, function(err) {
        if (err) { console.error(err); return }
        console.log("generated the new index.html :)")
    })
})

function createPerson(user, dat) {
    return`<div class="person"><div class="handle">${user}</div><a href="${dat}">${dat}</a></div>\n`
}
