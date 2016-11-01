function CreateFloatInfoBox() {

    //tvori plovouci paletku, ktera zobrazuje podrobne info o cocce
    divFloat = document.createElement('DIV');
    divFloat.id = "floatInfo";
    divFloat.className = "floatInfo";

    var tblInfo = document.createElement('table');
    tblInfo.style.width = '100px';
    tblInfo.style.border = '1px solid black';

    for (var row = 0; row < 2; row++) {
        var tr = tblInfo.insertRow();

        for (var col = 0; col < 2; col++) {
            var td = tr.insertCell();
            td.style.border = '1px solid black';
            td.style.backgroundColor = "red";

            if (row == 0) {
                if (col == 0) {
                    //prvni radek, prvni sloupec
                    td.appendChild(document.createTextNode("Cyl"));
                }

                if (col == 1) {
                    //prvni radek, druhy sloupec
                    //td.appendChild(document.createTextNode("CCC"));
                    //td.id = "cylValue";

                    divCyl = document.createElement('DIV');
                    divCyl.id = "cylValue";
                    td.appendChild(divCyl);

                }

            }

            if (row == 1) {
                if (col == 0) {
                    //druhy radek, prvni sloupec
                    td.appendChild(document.createTextNode("Sph"));
                }

                if (col == 1) {
                    //druhy radek, druhy sloupec
                    //td.appendChild(document.createTextNode("SSS"));
                    divSph = document.createElement('DIV');
                    divSph.id = "sphValue";
                    td.appendChild(divSph);
                }
            }

        }
    }

    divFloat.appendChild(tblInfo);

    return divFloat;
}