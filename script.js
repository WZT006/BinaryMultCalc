
var calculate = document.getElementById("calculate")
var multiplicand = document.getElementById("multiplicand")
var multiplier = document.getElementById("multiplier")
var download = document.getElementById("Download")
var PnP = document.getElementById("P&P Solution");
var dData = ""

calculate.onclick = function(){
    dData = ""
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
    var num1 = parseInt(multiplicand.value)
    var num2 = parseInt(multiplier.value)
    var ctr = 0;
    PnP.innerHTML = "";
    console.log("Clear")
    while (num1 && num1 != -1) {
        if (ctr > 16){
            window.alert("Exceed number of bits for Multiplicand")
            return false
        }
        ctr++
        num1 = Math.floor(num1 / 10);
        // console.log(ctr)
        // console.log(num1)
    }
    
    ctr = 0
    while (num2 && num2 != -1) {
        if (ctr > 16){
            window.alert("Exceed number of bits for Multiplier")
            return false
        }
        ctr++
        num2 = Math.floor(num2 / 10);
    }
    
    var num1 = parseInt(multiplicand.value)
    var num2 = parseInt(multiplier.value)

    if (num1 > 0) {
        num1 = num1.toString(2)
        num1 = "0" + num1
    }
    else {
        num1 = num1.toString(2)
        num1 = num1.substring(1)
        num1 = get_twos_comp(num1)
        // console.log(num1)
        num1 = "1" + num1
    }

    if (num2 > 0) {
        num2 = num2.toString(2)
        num2 = "0" + num2
    }
    else {
        num2 = num2.toString(2)
        num2 = num2.substring(1)
        num2 = get_twos_comp(num2)
        // console.log(num2)
        num2 = "1" + num2
    }

    if (document.getElementById('decimalToggle').checked) {
        console.log(num1 + ' ' + num2)
        compute(num1, num2)
    }
    else compute(num1,num2);
    
}

download.onclick = function() {
    var filename = "output.txt"
    var element = document.createElement('a');
    element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(dData));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
}




function compute(m, n){
    if(document.getElementById('stepToggle').checked){
        var delay = 1500;
    }
    else{
        var delay = 0;
    }
    Pnp(m,n,delay);

    var booth = document.getElementById("Booth Solution");
    var bAns = ""    
}

function reverseString(str) {
    return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}

function multiChar(x, y) {
    let z = x.repeat(y);
    // console.log(z);
    return z
}

function multiString(str, num, x) {
    // console.log(str);
    // console.log(x)
    let z = str.repeat(num)
    z = z + x
    // console.log(z)
    return z
}

function get_twos_comp (x) {
    let found_one = false;
    let final_str = "";

    for (let i = x.length; i > 0; i--) {
        if (found_one == true) {
            if (x[i-1] == "0") {
                final_str += "1"
            }
            else if (x[i-1] == "1") {
                final_str += "0"
            }
        }
        else {
            if ((x[i-1] == "1") && (found_one == false)) {
                found_one = true;
                final_str += x[i-1];
            }
            else {
                final_str += x[i-1]
            }
        }
    }

    final_str = reverseString(final_str);
    return final_str;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }
async function Pnp(m,n,delay){
    var Pnpans = ""
   dData += "Pen & Paper \n"
    
    // length of num
    m_length = m.length
    n_length = n.length

    var bigger_length;

    if (m_length > n_length) {
        bigger_length = m_length;
        while (n.length !== m_length) {
            n = n[0] + n;
        }
    }
    else {
        bigger_length = n_length;
        while (m.length !== n_length) {
            m = m[0] + m;
        }
    }

    for (let i = bigger_length; i > 0; i--) {
        if (n[i-1] === '0') {
            temp = multiChar("0", i + bigger_length);
            Pnpans += temp
            dData  += temp + "\n"
            
            Pnpans += "<br/>"
            PnP.innerHTML = Pnpans;
            await sleep(delay);         
        }
        else {
            temp = multiString(m[0], i, m);
            Pnpans += temp
            dData += temp + "\n"
            
            Pnpans += "<br/>"
            PnP.innerHTML = Pnpans;
            await sleep(delay);  
                  
        }
    }
    
    let m_neg = false;
    let n_neg = false;
    
    if (m[0] === "1") m_neg = true;
    if (n[0] === "1") n_neg = true;
    
    if (m_neg) m = get_twos_comp(m);
    if (n_neg) n = get_twos_comp(n);
    
    // get result first
    result = parseInt(m, 2) * parseInt(n, 2);
    
    // convert to binary as string
    binaryMul = result.toString(2);
    
    Pnpans += "Product = "
    dData += "Product = "
    // leading zeroes raw

    if (m_neg !== n_neg) {
        binaryMul = get_twos_comp(binaryMul);
        while (binaryMul.length !== (2 * bigger_length)) {
            binaryMul = "1" + binaryMul;
        }
        
        Pnpans += binaryMul
        dData += binaryMul + "\n"
        Pnpans += "<br/>"
        PnP.innerHTML = Pnpans;
        await sleep(delay);  
            
    }
    else if (m_neg === n_neg) {
        while (binaryMul.length != (2 * bigger_length)) {
            binaryMul = "0" + binaryMul;
        }
        Pnpans += binaryMul
        dData += binaryMul + "\n"
        // console.log(Pnpans);
        Pnpans += "<br/>"
        PnP.innerHTML = Pnpans;
        await sleep(delay);  
         
    }

    dData += "\n\n\n"
}
