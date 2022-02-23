/* 1) Create an instance of CSInterface. */
var csInterface = new CSInterface()

const loadData = async (id) => {
    csInterface.evalScript('getProjectpath()', async function (path) {
        const data = { id: id, location: path };
        const url2 = 'http://localhost:3002/tweet'
        const res = await fetch(url2, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const data2 = await res.json();
        console.log(data2);
    })
    };

/* 3) Write a helper function to pass instructions to the ExtendScript side. */
function openDoc() {
    csInterface.evalScript('alerta()')
}

/* 2) Use a CEP method to open the server extension. */
csInterface.requestOpenExtension("com.my.localserver", "");

var openButton = document.querySelector("#import-button");
openButton.addEventListener("click", myFunction);

function myFunction() {
    var x = document.getElementById("fname").value;
    console.log(x)
    loadData(x)
}

function getProjectPath() {
    csInterface.evalScript('getProjectpath()', (result) => {
        return result
    })
}

/* Get the path for your panel */
var extensionDirectory = csInterface.getSystemPath("extension");


    