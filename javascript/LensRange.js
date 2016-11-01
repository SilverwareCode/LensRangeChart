//window.onload = initMe();

var containerName = 'tableContainer';
var json ;
var fontSize = 9;
var RANGE;
var divFloat;
var uid = Math.floor((Math.random() * 100) + 1);


function RangeTable (container, jsonString, options)
{
    //hlavni konstruktor
    //console.log("RangeTable - hlavni konstruktor ");
    //console.log("RangeTable - container: " + container);
    //console.log("RangeTable - json: " + jsonString);
    //console.log("RangeTable - options: " + options);

    containerName = container;
    json = jsonString;

    initMe();
}


function initMe() {
    document.addEventListener("DOMContentLoaded", onLoad);
    window.addEventListener("newLensSelected", onNewLensSelected);
}

function onMouseMove(sender) {
    
    var cursorX = sender.clientX;
    var cursorY = sender.clientY;

    var d = document.getElementById("floatInfo");
    d.style.left = cursorX + "px";
    d.style.top = cursorY + "px";
}


function onNewLensSelected(e)
{
    console.log("zachycena udalost - onNewLensSelected");
}

function onLoad()
{
    var container = document.getElementById(containerName);
    console.log(container);

    container.addEventListener("mousemove", onMouseMove);


    RANGE = JSON.parse(json);
    AddTableRange(containerName, RANGE);

    //tvorime plovouci div
    divFloat = CreateFloatInfoBox();

    //pridavame ho do stranky
    document.getElementById(containerName).appendChild(divFloat);
}


function AddTableRange(containerId, rangeTable) {

    var tblMaster = document.createElement('table');
    tblMaster.style.width = '100px';
    tblMaster.style.border = '1px solid black';

    //pridavame hlavni tabulku 2x2 s popisky Cyl a Sph
    for (var row = 0; row < 2; row++) {
        var tr = tblMaster.insertRow();

        for (var col = 0; col < 2; col++) {
            var td = tr.insertCell();
            td.style.border = '1px solid black';
            td.style.backgroundColor = "white";

            var cellText;

            if ((col == 0) && (row == 0)) {
                cellText = "";
            }

            if ((col == 1) && (row == 0)) {
                var hDiv = document.createElement('DIV');
                hDiv.innerHTML = "CYL";
                hDiv.style.textAlign = "center";
                td.appendChild(hDiv);
            }

            if ((col == 0) && (row == 1)) {
                cellText = "";
                var vDiv = document.createElement('DIV');
                vDiv.innerHTML = "SPH";
                vDiv.className = "vertical";
                td.appendChild(vDiv);
            }

            if ((col == 1) && (row == 1)) {
                var mainDiv = document.createElement('DIV');
                //mainDiv.innerHTML = "mainDiv";

                AddRanges(mainDiv, RANGE);

                td.appendChild(mainDiv);
            }
            //td.addEventListener("click", CellClick);
        }
    }

    document.getElementById(containerId).appendChild(tblMaster);
}

function AddRanges(container, rangeTable) {
    //pridavame vlastni tabulku rozsahu

    var colCount = getColumnCount(rangeTable);
    var rowCount = getRowCount(rangeTable);

    var tblRange = document.createElement('table');
    tblRange.style.width = '100px';
    tblRange.style.border = '1px solid black';

    //pridavame tabulku do DIVu
    container.appendChild(tblRange);


    for (var row = 0; row < rowCount + 1; row++) {
        var tr = tblRange.insertRow();
        tr.id = "row-" + row;

        for (var col = 0; col < colCount + 1; col++) {
            var td = tr.insertCell();
            td.id = col + "-" + row;
            td.style.border = '1px solid black';
            td.style.backgroundColor = "magenta";
            td.style.fontSize = fontSize + 'px';
            td.style.width = '50px';
            td.style.height = '20px';

            if ((row > 0) && (col > 0))
            {
                //normalne promitame hodnoty z pole
                var colIndex = col - 1;
                var rowIndex = row - 1;
                var Sphere = rangeTable.lens[colIndex][rowIndex];

                if (Sphere != null) {
                    td.style.backgroundColor = "green";
                    td.addEventListener("click", CellClick);
                    td.addEventListener("mouseenter", CellMouseOver);
                    td.addEventListener("mouseleave", CellMouseOut);
                    td.appendChild(document.createTextNode("."));
                }
                else
                {
                    td.style.backgroundColor = "white";
                }

                //td.appendChild(document.createTextNode(colIndex + "," + rowIndex));
            }


            if (row == 0)//pokud jsme na prvnim radku
            {
                if (col == 0)//jsme na bunce 0,0
                {
                    td.appendChild(document.createTextNode(""));
                }
                else {
                    //console.log("zjistujeme cylindr pro col = " + col);
                    var columnHeader = getCylByColumnId(col, rangeTable); //*************
                    td.appendChild(document.createTextNode(columnHeader));
                }

            } else

                if ((col == 0) && (row > 0))//pokud jsme na prvnim sloupci
                {
                    var rowHeader = getSphByRowId(row, rangeTable); //*************
                    td.appendChild(document.createTextNode(rowHeader));
                }

                else {
                    
                }
        }
    }

    container.appendChild(tblRange);
}

function CellMouseOver(e) {
    
    divFloat.style.visibility = "visible";

    var cell = document.getElementById(e.target.id);

    var stringToSplit = e.target.id;
    var ColRow = stringToSplit.split("-");

    var col = ColRow[0]-1;
    var row = ColRow[1]-1;

    
    //vypisujeme OPC kod
    var lensOPC = RANGE.lens[col][row].OPC;
    console.log(col, row, lensOPC);

    cell.style.backgroundColor = "orange";

    //vypisujeme hodnoty cocky do InfoBoxu
    var cylValue = document.getElementById("cylValue");
    cylValue.innerHTML = RANGE.lens[col][row].Cyl;//"99";

    var sphValue = document.getElementById("sphValue");

    sphValue.innerHTML = RANGE.lens[col][row].Sph; //"45";
}

function CellMouseOut(e) {
    var cell = document.getElementById(e.target.id);
    cell.style.backgroundColor = "green";

    divFloat.style.visibility = 'hidden';

}

function CellClick(e) {
    //console.log("fired event newLensSelected for cell " + e.target.id);
    var evt = new CustomEvent("newLensSelected", { detail: e.target.id });
    window.dispatchEvent(evt);
}

