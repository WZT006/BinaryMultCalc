
var calculate = document.getElementById("calculate")
var multiplicand = document.getElementById("multiplicand")
var multiplier = document.getElementById("multiplier")
var download = document.getElementById("Download")
var dData = "TEST WHO LET THE DOGS OUT\n\n\n\n\nKAPPA"

calculate.onclick = function(){
    
    // number validation for binary
    if(document.getElementById('binaryToggle').checked){
        var num1 = multiplicand.value
        var num2 = multiplier.value
        while (num1) {
            if (num1 % 10 > 2){
                window.alert("Invalid Value for Multiplicand")
                return false
            }
            num1 = Math.floor(num1 / 10);
        }

        while (num2) {
            if (num2 % 10 > 2){
                window.alert("Invalid Value for Multiplier")
                return false
            }
            num2 = Math.floor(num2 / 10);
        }
    } 
}
download.onclick = function() {
    var filename = "output.txt"
    var element = document.createElement('a');
    element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(dData));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
    //document.body.removeChild(element);
}



