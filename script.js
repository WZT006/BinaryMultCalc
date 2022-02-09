
var calculate = document.getElementById("calculate")
var multiplicand = document.getElementById("multiplicand")
var multiplier = document.getElementById("multiplier")
var download = document.getElementById("Download")
var dData = "TEST WHO LET THE DOGS OUT\n\n\n\n\nKAPPA"


calculate.onclick = function(){
    
    // validation for empty input
    if(multiplicand.value == ''){
        window.alert("Missing Value for Multiplicand")
        return false
    }

    if(multiplier.value == ''){
        window.alert("Missing Value for Multiplier")
        return false
    }

    // number validation for binary
    if(document.getElementById('binaryToggle').checked){
        var num1 = multiplicand.value
        var num2 = multiplier.value
        while (num1) {
            if (num1 % 10 > 2 || num1 % 10 < 0){
                window.alert("Invalid Value for Multiplicand")
                return false
            }
            num1 = Math.floor(num1 / 10);
        }

        while (num2) {
            if (num1 % 10 > 2 || num1 % 10 < 0){
                window.alert("Invalid Value for Multiplier")
                return false
            }
            num2 = Math.floor(num2 / 10);
        }
    }
    
    // validation for 16 bits
    var num1 = multiplicand.value
    var num2 = multiplier.value
    var ctr = 0;

    while (num1) {
        if (ctr > 16){
            window.alert("Exceed number of bits for Multiplicand")
            return false
        }
        ctr++
        num1 = Math.floor(num1 / 10);
    }

    ctr = 0
    while (num2) {
        if (ctr > 16){
            window.alert("Exceed number of bits for Multiplier")
            return false
        }
        ctr++
        num2 = Math.floor(num2 / 10);
    }
    compute();
}   
function compute(){
    if(document.getElementById('stepToggle').checked){
        var delay = 1000;
    }
    else{
        var delay = 0;
    }

    setTimeout(function(){  //use for choosing whether all or step-by-step
        console.log("Valid Inputs")
    }, delay);// add * i in delay for delay in loops
}
download.onclick = function() {
    var filename = "output.txt"
    var element = document.createElement('a');
    element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(dData));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
}


