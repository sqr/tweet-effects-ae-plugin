function openDocument(location) {
    alert(location)
}

function alerta() {
    alert('Ahhh jarringui')
}

function openFile() {
    var archivoRef = new File("I:/huffpost/2022/febrero/1_hipra.jpg")
    var importOptions = new ImportOptions(archivoRef)
    app.project.importFile(importOptions)
}

function alerta2(location) {
    alert(location)
}

function getProjectpath() {
    var pato = app.project.file.path
    alert(pato)
    return pato
}
