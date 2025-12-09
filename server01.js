const fs = require("fs")
const path = require("path")


const filepath = path.join(__dirname, "upload", "file01.txt")
const filepath2 = path.join(__dirname, "upload", "file02.txt")
const filepath3 = path.join(__dirname, "upload", "file03.txt")
const filepath4 = path.join(__dirname, "upload", "file04.txt")



//czytanie pliku
// fs.readFile(filepath, (err, data) => {
//     if (err) throw err
//     console.log(data.toString());
// })


//dopisywanie danych do pliku
// fs.appendFile(filepath, "\n\ntekst do dopisania", (err) => {
//     if (err) throw err
//     console.log("tekst dopisany");
// })


//usuwanie pliku
// fs.unlink(filepath, (err) => {
//     if (err) throw err
//     console.log("czas 1: " + new Date().getMilliseconds());
// })

//sprawdzenie czy plik istnieje 
// if (fs.existsSync(filepath)) {
//     console.log("plik istnieje");
// } else {
//     console.log("plik nie istnieje");
// }

// fs.writeFile(filepath3, "tekst do zapisania", (err) => {
//     if (err) throw err
//     console.log("plik utworzony - czas 1: " + new Date().getMilliseconds());

//     fs.appendFile(filepath3, "\n\ntekst do dopisania", (err) => {
//         if (err) throw err
//         console.log("plik zmodyfikowany - czas 2: " + new Date().getMilliseconds());

//     })
// })




//niepoprawna kolejnowc wykonywania działań -> tworzy się po tym jak teoretycznie jest usuwany, więc sie nie usuwa 
// if (!fs.existsSync("./upload/newdir")) {
//     fs.mkdir("./newdir", (err) => {
//         if (err) throw err
//         console.log("jest");
//     })
// }
// if (fs.existsSync("./upload/newdir")) {
//     fs.rmdir("./newdir", (err) => {
//         if (err) throw err
//         console.log("nie ma ");
//     })
// }

//poprawna kolejnosc wykonywania działań, najpierw patrzymy czy jest => dodajemy i w funkcji dodoawania dajemy usuwanie 
// if (!fs.existsSync("./newdir")) {
//     fs.mkdir("./newdir", (err) => {
//         if (err) throw err
//         console.log("jest");
//         if (fs.existsSync("./newdir")) {
//             fs.rmdir("./newdir", (err) => {
//                 if (err) throw err
//                 console.log("nie ma ");
//             })
//         }
//     })
// }



//pobranie z upload  
// fs.readdir(path.join(__dirname + '/upload'), (err, files) => {
//     if (err) throw err
//     console.log("lista", files);
// })



//poprawna kolejność dodawania katalogu i listowanie przed i  po 
// fs.readdir(__dirname, (err, files) => {
//     if (err) throw err
//     console.log("lista 1 - ", files);

//     fs.mkdir("./newdir", (err) => {
//         if (err) throw err
//         console.log("dodany");

//         fs.readdir(__dirname, (err, files) => {
//             if (err) throw err
//             console.log("lista 2 - ", files);
//         })
//     })
// })



//sprawdzanie czy to plik czy katalog
// fs.readdir(__dirname, (err, files) => {
//     if (err) throw err
//     files.forEach((file) => {

//         fs.lstat(path.join(__dirname, file), (err, stats) => {//tu trzeba sie odwolac do konkretnych plimkow a nie __dirname tylko __dirname/file

//             console.log(file, stats.isDirectory());
//         })
//     })
// })


//spradzanie synchroniczne
// try {
//     fs.mkdirSync("./upload/test")
// }
// catch (err) {
//     console.log("error", err.message);
// }


const r = fs.lstatSync(path.join(__dirname, 'upload'))
console.log(r.isDirectory());
