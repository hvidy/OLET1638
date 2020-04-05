function zip(arrays) {
    //array black magic!! don't even ask!
    return arrays[0].map(function(_,i){
        return arrays.map(function(array){return array[i]})
    });
}

function convertUnits() {
    //Really messy unit conversions, fix this using the button arrays I defined!
    var a1sini, varpi, period, sampling;
    if (document.getElementById("a1siniUnits").value == 2) {
        a1sini = auToLs(document.getElementById("a1sini").value);
    } else {
        a1sini = document.getElementById("a1sini").value;
    }
    if (document.getElementById("varpiUnits").value == 2) {
        varpi = degreeToRad(document.getElementById("varpi").value);
    } else {
        varpi = document.getElementById("varpi").value;
    }
    if (document.getElementById("periodUnits").value == 2){
        period = yearsToDays(document.getElementById("period").value);
    } else {
        period = document.getElementById("period").value;
    }
    if (document.getElementById("samplingUnits").value == 2) {
        sampling = yearsToDays(document.getElementById("sampling").value);
    } else {
        sampling = document.getElementById("sampling").value;
    }
    
    if (document.getElementById("phipUnits").value == 1) {
        undersampledTau(document.getElementById("phip").value,
                      a1sini,
                      varpi,
                      document.getElementById("eccentricity").value,
                      period,
                      sampling,
                      document.getElementById("points").value);
        
        g.updateOptions(
            {labels: [ 'X', 'Time delay', 'Radial velocity' ],
                xlabel: 'Orbital phase',
                ylabel: 'Time Delay (s)',
                y2label: 'Radial Velocity (km/s)',
                    'file': phase,
                }
        )
        } else {
            forwardPeriastron(document.getElementById("phip").value,
                          a1sini,
                          varpi,
                          document.getElementById("eccentricity").value,
                          period,
                          sampling,
                          document.getElementById("points").value);
            g.updateOptions(
                {labels: [ 'X', 'Time delay', 'Radial velocity' ],
                xlabel: 'BJD - 2400000',
                ylabel: 'Time Delay (s)',
                y2label: 'Radial Velocity (km/s)',
                    'file': phase,
                }
            )
           
        }
}

function saveToCSV() {
    //check to make sure we're not saving empty array
    if(phase.length <= 1){
        alert("No data to save! Make a plot first.");
        return;
    }else {
        var csvPhase = [["Orbital phase", "Time delay (s)", "Radial velocity (km/s)"]]
        csvPhase = csvPhase.concat(phase)
        var data = csvPhase
        var csvContent = "data:text/csv;charset=utf-8,";
        data.forEach(function(infoArray, index){
           dataString = infoArray.join(",");
           csvContent += index < data.length ? dataString+ "\n" : dataString;
        });
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "TD_RV.csv");
        document.body.appendChild(link);

        link.click();
    }
}