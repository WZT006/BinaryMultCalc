
var calculate = document.getElementById("calculate")
var multiplicand = document.getElementById("multiplicand")
var multiplier = document.getElementById("multiplier")
var download = document.getElementById("Download")
var PnP = document.getElementById("P&P Solution");
var booth = document.getElementById("Booth Solution");
var eBooth = document.getElementById("Extend Solution");
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

        // compute(num1, num2)
    }

    
    // validation for 16 bits
    var num1 = parseInt(multiplicand.value).toString(2)
    var num2 = parseInt(multiplier.value).toString(2)
    var ctr = 0;
    PnP.innerHTML = "";
    booth.innerHTML = "";
    eBooth.innerHTML = "";

    
    if (num1.length > 16){
            window.alert("Exceed number of bits for Multiplicand")
            return false
    }

    if (num2.length > 16){
            window.alert("Exceed number of bits for Multiplier")
            return false
    }

    
    var num1 = parseInt(multiplicand.value)
    var num2 = parseInt(multiplier.value)


    if (document.getElementById('decimalToggle').checked) {
        console.log(num1 + ' ' + num2)

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
        compute(num1, num2)
    }
    else compute(num1, num2)
    
}

download.onclick = function() {
    var filename = "output.txt"
    var element = document.createElement('a');
    element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(dData));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
}




async function compute(m, n){
    if(document.getElementById('stepToggle').checked){
        var delay = 1500;
    }
    else{
        var delay = 0;
    }
    var Pnpans = ""
    dData += "Pen & Paper: \n"
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
            // console.log(Pnpans);
            dData += temp + "\n"
            Pnpans += "<br/>"

            PnP.innerHTML = Pnpans;
            await sleep(delay); 
        }
        else {
            temp = multiString(m[0], i, m);
            Pnpans += temp
            dData += temp + "\n"
            // console.log(Pnpans);
            Pnpans += "<br/>"
            PnP.innerHTML = Pnpans;
            await sleep(delay)
            
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
    Pnpans += "------------------------------------------------------ <br/>"
    Pnpans += "Product = "

    dData += "------------------------------------------------------ \n"
    dData += "Product = "
    // leading zeroes raw
    if (m_neg !== n_neg) {
        binaryMul = get_twos_comp(binaryMul);
        while (binaryMul.length !== (2 * bigger_length)) {
            binaryMul = "1" + binaryMul;
        }
        // console.log(binaryMul);
        Pnpans += binaryMul
        dData += binaryMul + "\n"
        await sleep(delay)
        // console.log(Pnpans);
        Pnpans += "<br/>"
    }
    else if (m_neg === n_neg) {
        while (binaryMul.length != (2 * bigger_length)) {
            binaryMul = "0" + binaryMul;
        }
        Pnpans += binaryMul
        dData += binaryMul + "\n"
        await sleep(delay)
        // console.log(Pnpans);
        Pnpans += "<br/>"
    }

    PnP.innerHTML = Pnpans;
    dData += "\n\n\n"



    var booth = document.getElementById("Booth Solution");
    dData += "BOOTHS ALGORITHM: \n"
    var bAns = ""

    bAns += "Multiplicand: "
    bAns += m
    dData += bAns + "\n"
    bAns += "<br/>"
    let extended_n = n + "0"

    bAns += "Multiplier: "
    bAns += extended_n
    dData += "Multiplier: " + extended_n
    bAns += "<br/>"

    bAns += "------------------------------------------------------ <br/>"
    bAns += "BOOTHS EQUIVALENT: <br/>"

    dData += "\n------------------------------------------------------\n"
    dData += "BOOTHS EQUIVALENT: \n"
    temp = m[0].repeat(bigger_length)
    bAns += temp
    bAns += m;
    bAns += "<br/>"
    dData += temp
    dData += m
    dData += "\n"

    let multiplier_list = []

    for (let i = 0; i < bigger_length; i++) {
        if (extended_n[i]+extended_n[i+1] === "00") multiplier_list.push("0");
        else if (extended_n[i]+extended_n[i+1] === "01") multiplier_list.push("1");
        else if (extended_n[i]+extended_n[i+1] === "10") multiplier_list.push("-1");
        else if (extended_n[i]+extended_n[i+1] === "11") multiplier_list.push("0");
    }

    for (let i = 0; i < multiplier_list.length; i++) {
        // process.stdout.write("(" + multiplier_list[i] + ")")
        bAns += "("
        bAns += multiplier_list[i]
        bAns += ")";
        dData += "(" + multiplier_list[i] + ")"
    }

    bAns += "<br/>"
    bAns += "------------------------------------------------------ <br/>"
    bAns += "INTERMEDIATE STEPS:<br/>"
    
    dData += "\n------------------------------------------------------ \n"
    dData += "INTERMEDIATE STEPS:\n"
    
    
    await sleep(delay)
    for (let i = multiplier_list.length; i > 0; i--) {
        if (multiplier_list[i-1] === "0") {
            // console.log(multiString("0", i+bigger_length));
            temp = multiChar("0", i+bigger_length)
            bAns += temp
            bAns += "<br/>"
            dData += temp + "\n"

            booth.innerHTML = bAns
            await sleep(delay)
        }
        else if (multiplier_list[i-1] === "1") {
            // process.stdout.write(m[0].repeat(i));
            // console.log(m);
            temp = m[0].repeat(i)
            bAns += temp
            bAns += m;
            bAns += "<br/>";

            dData += temp
            dData += m
            dData += "\n"

            booth.innerHTML = bAns
            await sleep(delay)
        }
        else if (multiplier_list[i-1] === "-1") {
            let twos_m = get_twos_comp(m);
            // process.stdout.write(twos_m[0].repeat(i));
            // console.log(twos_m)
            temp = twos_m[0].repeat(i);
            bAns += temp
            bAns += twos_m
            bAns += "<br/>";

            dData += temp
            dData += twos_m
            dData += "\n"

            booth.innerHTML = bAns
            await sleep(delay)
        }
    }

    bAns += "------------------------------------------------------ <br/>"
    bAns += "PRODUCT = "

    dData += "------------------------------------------------------ \n"
    dData += "PRODUCT = "
    m_neg = false
    n_neg = false

    if (m[0] === "1") m_neg = true
    if (n[0] === "1") n_neg = true

    if (m_neg) m = get_twos_comp(m)
    if (n_neg) n = get_twos_comp(n)

    result = parseInt(m, 2) * parseInt(n, 2)
    binaryMul = result.toString(2)

    if (m_neg !== n_neg) {
        binaryMul = get_twos_comp(binaryMul);
        while (binaryMul.length !== (2 * bigger_length)) {
            binaryMul = "1" + binaryMul;
        }
        // console.log(binaryMul);
        bAns += binaryMul
        dData += binaryMul + "\n"
        bAns += "<br/>"
    }
    else if (m_neg === n_neg) {
        while (binaryMul.length != (2 * bigger_length)) {
            binaryMul = "0" + binaryMul;
        }
        // console.log(binaryMul);
        bAns += binaryMul
        dData += binaryMul + "\n"
        bAns += "<br/>"
    }

    booth.innerHTML = bAns
    dData += "\n\n\n\n"
    // -----------------------------------------------------------------------------------------------
    // start of extended booths 
    var ebooth = document.getElementById("Extend Solution");
    var ebAns = "" 
    dData += "Extended Booth's ALGORITHM: \n"
    ebAns += "Multiplicand: "
    ebAns += m
    ebAns += "<br/>"
    
    dData += "Multiplicand: " + m + "\n"


    extended_n = n + "0"

    ebAns += "Extended Multiplier: "
    ebAns += extended_n
    ebAns += "<br/>"
    
    dData += "Extended Multiplier: " + extended_n + "\n"
    ebooth.innerHTML = ebAns
    await sleep(delay)
    
    ebAns += "------------------------------------------------------ <br/>"
    ebAns += "BOOTHS EQUIVALENT: <br/>"

    dData += "------------------------------------------------------\n"
    dData += "BOOTHS EQUIVALENT: \n"

    temp += m[0].repeat(bigger_length)
    ebAns += temp
    ebAns += m;
    ebAns += "<br/>"
    dData += temp + m + "\n"
    multiplier_list = []
    ebooth.innerHTML = ebAns
    await sleep(delay)

    for (let i = 0; i < bigger_length; i += 2) {
        if (extended_n[i]+extended_n[i+1]+extended_n[i+2] === "000") multiplier_list.push("0")
        else if (extended_n[i]+extended_n[i+1]+extended_n[i+2] === "001") multiplier_list.push("1")
        else if (extended_n[i]+extended_n[i+1]+extended_n[i+2] === "010") multiplier_list.push("1")
        else if (extended_n[i]+extended_n[i+1]+extended_n[i+2] === "011") multiplier_list.push("2")
        else if (extended_n[i]+extended_n[i+1]+extended_n[i+2] === "100") multiplier_list.push("-2")
        else if (extended_n[i]+extended_n[i+1]+extended_n[i+2] === "101") multiplier_list.push("-1")
        else if (extended_n[i]+extended_n[i+1]+extended_n[i+2] === "110") multiplier_list.push("-1")
        else if (extended_n[i]+extended_n[i+1]+extended_n[i+2] === "111") multiplier_list.push("0")
    }

    for (let i = 0; i < multiplier_list.length; i++) {
        // process.stdout.write("(" + multiplier_list[i] + ")")
        ebAns += "("
        ebAns += multiplier_list[i]
        ebAns += ")";
        dData += "(" + multiplier_list[i] + ")"
    }
    ebooth.innerHTML = ebAns
    await sleep(delay*2)

    ebAns += "<br/>"
    ebAns += "------------------------------------------------------ <br/>"
    ebAns += "INTERMEDIATE STEPS:<br/>"

    dData += "\n------------------------------------------------------\n"
    dData += "INTERMEDIATE STEPS: \n"

    let current_max_length = bigger_length * 2
    
    await sleep(delay*3)
    for (let i = multiplier_list.length; i > 0; i--) {
        // if curr is 0
        if (multiplier_list[i-1] === "0") {
            // console.log(multiString("0", current_max_length))
            temp = multiChar("0", current_max_length)
            ebAns += temp
            ebAns += "<br/>"
            dData += temp + "\n"

            ebooth.innerHTML = ebAns
            await sleep(delay)

        }
        
        // if curr is 1
        else if (multiplier_list[i-1] === "1") {
            let fullstring = m 
            while (fullstring.length !== current_max_length) {
                fullstring = fullstring[0] + fullstring
            }
            // console.log(fullstring)
            ebAns += fullstring
            ebAns += "<br/>"

            dData += fullstring + "\n"

            ebooth.innerHTML = ebAns
            await sleep(delay)
        }
    
        // if curr is -1
        else if (multiplier_list[i-1] === "-1") {
            let fullstring = get_twos_comp(m) 
            while (fullstring.length !== current_max_length) {
                fullstring = fullstring[0] + fullstring
            }
            // console.log(fullstring)
            ebAns += fullstring
            ebAns += "<br/>"

            dData += fullstring + "\n"

            ebooth.innerHTML = ebAns
            await sleep(delay)
        }
    
        // if curr is 2
        else if (multiplier_list[i-1] === "2") {
            let fullstring = m + "0"
            while (fullstring.length !== current_max_length) {
                fullstring = fullstring[0] + fullstring
            }
            // console.log(fullstring)
            ebAns += fullstring
            ebAns += "<br/>"
            dData += fullstring + "\n"

            ebooth.innerHTML = ebAns
            await sleep(delay)            
        }
    
        // if curr is -2
        else if (multiplier_list[i-1] === "-2") {
            let fullstring = get_twos_comp(m) + "0"
            while (fullstring.length !== current_max_length) {
                fullstring = fullstring[0] + fullstring
            }
            // console.log(fullstring)
            ebAns += fullstring
            ebAns += "<br/>"
            dData += fullstring + "\n"

            ebooth.innerHTML = ebAns
            await sleep(delay)
        }
    
        current_max_length -= 2
    }

    ebAns += "------------------------------------------------------ <br/>"
    ebAns += "PRODUCT = "

    dData += "------------------------------------------------------ \n"
    dData += "PRODUCT = "
    m_neg = false
    n_neg = false

    if (m[0] === "1") m_neg = true
    if (n[0] === "1") n_neg = true

    if (m_neg) m = get_twos_comp(m)
    if (n_neg) n = get_twos_comp(n)

    result = parseInt(m, 2) * parseInt(n, 2)
    binaryMul = result.toString(2)

    if (m_neg !== n_neg) {
        binaryMul = get_twos_comp(binaryMul);
        while (binaryMul.length !== (2 * bigger_length)) {
            binaryMul = "1" + binaryMul;
        }
        // console.log(binaryMul);
        ebAns += binaryMul
        ebAns += "<br/>"
        dData += binaryMul + "\n"

        ebooth.innerHTML = ebAns
        await sleep(delay)
    }
    else if (m_neg === n_neg) {
        while (binaryMul.length != (2 * bigger_length)) {
            binaryMul = "0" + binaryMul;
        }
        // console.log(binaryMul);
        ebAns += binaryMul
        ebAns += "<br/>"
        dData += binaryMul + "\n"

        ebooth.innerHTML = ebAns
        await sleep(delay)
    }

    ebooth.innerHTML = ebAns

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
