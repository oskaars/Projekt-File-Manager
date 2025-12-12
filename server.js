const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const fs = require("fs")
const { create } = require('express-handlebars');
const formidable = require('formidable');
const archiver = require('archiver');


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
            console.log("usunieto", req.body.dirToRemove);
            res.redirect('/')
        })
    }

})


app.post("/removeFile", function (req, res) {
    if (fs.existsSync(path.join(baseDir, req.body.fileToRemove))) {
        fs.unlink(path.join(baseDir, req.body.fileToRemove), (err) => {
            if (err) throw err
            console.log("usunieto", req.body.fileToRemove);
            res.redirect('/')
        })
    }
})

//TODO: upload multiple files, files count, 
app.post('/uploadFiles', function (req, res) {

    let form = formidable({});

    form.uploadDir = baseDir // folder do zapisu 
    form.keepExtensions = true // zapis z rozszerzeniem pliku
    form.multiples = true
    form.parse(req, function (err, fields, files) {

        console.log("----- przesłane pola z formularza ------");

        console.log(fields);

        console.log("----- przesłane formularzem pliki ------");

        console.log(files);
        files.files.forEach(element => {
            const NAME = element.name
            console.log(NAME)
            if (!fs.existsSync(path.join(baseDir, NAME))) {
                console.log(element.path)
                fs.rename(element.path, path.join(baseDir, NAME), (err) => {
                    if (err) console.log(err)
                    else {

                    }
                })
                console.log('plik jeswt')
            }
            else {
            }

        });
        res.redirect('/')
    });
});


app.post('/downloadFile', function (req, res) {
    res.download(path.join(baseDir, req.body.fileToDownload), (err) => {
        if (err) throw err
    })
})


app.post('/downloadDir', function (req, res) {
  
// create a file to stream archive data to.
const output = res
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

// listen for all archive data to be written
// 'close' event is fired only when a file descriptor is involved
output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

// This event is fired when the data source is drained no matter what was the data source.
// It is not part of this library but rather from the NodeJS Stream API.
// @see: https://nodejs.org/api/stream.html#stream_event_end
output.on('end', function() {
  console.log('Data has been drained');
});

// good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});

// good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});

// pipe archive data to the file
archive.pipe(output);
archive.finalize();


})












app.get("*xxx", function(req, res) {
    
   res.render('notfound.hbs', { error: "nie znaleziono adresu" })
})
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);

})
