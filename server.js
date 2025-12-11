const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const fs = require("fs")
const { create } = require('express-handlebars');

app.use(express.static('static'))
app.use(express.urlencoded({
    extended: true
}));

const hbs = create({
    defaultLayout: 'main.hbs', // Domyślny layout: views/layouts/main.hbs
    extname: '.hbs', // rozszerzenie plików szablonów
})


app.engine('.hbs', hbs.engine); // określenie silnika szablonów
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);

})

let sentDirs = []
let sentFiles = []
const baseDir = './upload/';



app.get("/", function (req, res) {

    fs.readdir(path.join(__dirname, 'upload'), (err, files) => {
        if (err) throw err
        files.forEach((file) => {
            try {
                const typeCheck = fs.lstatSync(path.join(__dirname, 'upload', file))
                if (typeCheck.isDirectory()) {
                    sentDirs.push(file)
                } else {
                    sentFiles.push(file)
                }
                console.log(file, typeCheck.isDirectory());

            } catch (err) {
                console.log("error", err.message);

            }

        })
        res.render('filemanager.hbs', { files: sentFiles, dirs: sentDirs })
        sentDirs = []
        sentFiles = []
    })
})




app.get("/addDir", function (req, res) {
    const dirName = req.query.dirName;
    const targetPath = path.join(baseDir, dirName);

    if (fs.existsSync(targetPath)) {
        console.log("folder istnieje");

        let finalDirName = dirName; // Tę zmienną będziemy modyfikować
        let counter = 0;

        while (fs.existsSync(path.join(baseDir, finalDirName))) {
            counter++;
            finalDirName = dirName + '(' + counter.toString() + ')';
        }
        console.log("pierwsza wolna", finalDirName);


        fs.mkdir(path.join(baseDir, finalDirName), (err) => {
            if (err) {
                console.log(err);
                res.send("blad w tworzeniu folderu");
            } else {
                // Sukces!
                res.redirect("/");
            }
        });

    } else {
        console.log("nowy folder: ");

        fs.mkdir(targetPath, (err) => {
            if (err) {
                console.log(err);
                res.send("blad w tworzeniu folderu" + err);
            } else {
                console.log("dodano folder", dirName);
                res.redirect("/");
            }
        });
    }
});

app.get("/addFile", function (req, res) {
    const fileName = req.query.fileName;
    const targetPath = path.join(baseDir, fileName);

    if (fs.existsSync(targetPath)) {
        console.log("plik istnieje");

        let finalFileName = fileName;
        let counter = 0;

        while (fs.existsSync(path.join(baseDir, finalFileName))) {
            counter++;
            finalFileName = fileName + '(' + counter.toString() + ')';
        }
        console.log("pierwsza wolna: ", finalFileName);


        fs.writeFile(path.join(baseDir, finalFileName), 'tekscik do pliku', (err) => {
            if (err) {
                console.log(err);
                res.send("blad przy tworzeniu pliku");
            } else {
                res.redirect("/");
            }
        });

    } else {
        console.log("plik istnieje");

        fs.writeFile(targetPath, 'teskcik ', (err) => {
            if (err) {
                console.log(err);
                res.send("Błąd tworzenia pliku" + err);
            } else {
                console.log("Utworzono plik ", fileName);
                res.redirect("/");
            }
        });
    }
})

app.post("/removeFolder", function (req, res) {
    console.log('do usuniecia', req.body.dirToRemove)
    if (fs.existsSync(path.join(baseDir, req.body.dirToRemove))) {
        fs.rmdir(path.join(baseDir, req.body.dirToRemove), (err) => {
            if (err) throw err
            console.log("usunieto" , req.body.dirToRemove);
            res.redirect('/')
        })
    }

})


app.post("/removeFile", function (req, res) {
        if (fs.existsSync(path.join(baseDir, req.body.fileToRemove))) {
        fs.unlink(path.join(baseDir, req.body.fileToRemove), (err) => {
            if (err) throw err
            console.log("usunieto" , req.body.fileToRemove);
            res.redirect('/')
        })
    }
})

//TODO: upload multiple files, files count, 
app.get("/uploadFiles", function(req, res){
    console.log(req.query.files)
    res.redirect('/')
})



