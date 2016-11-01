function getColumnCount(RANGE)
{//vraci pocet sloupcu v poli 
    return RANGE.lens.length;
}

function getRowCount(RANGE)
{//vraci pocet radku
    return RANGE.lens[0].length;
}

function getCylByColumnId(columnId, rangeTable) {
    //vraci hodnotu cylindru pro dany sloupec
    var colIndex = columnId - 1;
    var rowCount = getRowCount(rangeTable);

    var CylValue;

    for (var i = 0; i < rowCount ; i++) {
        var Lens = rangeTable.lens[colIndex][i];
        if (Lens != null) {
            CylValue = rangeTable.lens[colIndex][i].Cyl;

            if (CylValue != null) {
                return CylValue;
            }

        }
    }
}

function getSphByRowId(sphId, rangeTable) {
    //vraci hodnotu sphery pro dany radek
    var sphIndex = sphId - 1;
    var colCount = getColumnCount(rangeTable);

    var SphValue;

    for (var i = 0; i < colCount ; i++) {
        var Lens = rangeTable.lens[i][sphIndex];
        if (Lens != null) {
            SphValue = rangeTable.lens[i][sphIndex].Sph;
            if (SphValue != null) {
                return SphValue;
            }
        }
    }
}
