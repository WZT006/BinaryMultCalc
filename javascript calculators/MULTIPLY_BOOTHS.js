function reverseString(str) {
    return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}

function multiChar(x, y) {
    let z = x.repeat(y);
    console.log(z);
}

function multiString(str, num) {
    let z = str.repeat(num);
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

let m = "0101";
let n = "010";

let m_length = m.length;
let n_length = n.length;

var bigger_length;

if (m_length > n_length){
    bigger_length = m_length
    while (n.length !== m_length) {
        n = n[0] + n;
    }     
}   
else {
    bigger_length = n_length
    while (m.length !== n_length) {
        m = m[0] + m;
    }
}

console.log("------------------------------------------------------");
console.log("Numbers Inputted:");
console.log(m);
console.log(n);
console.log("------------------------------------------------------");

// show interpreted multiplicand and multiplier
console.log("Multiplicand:" + m);

let extended_n = n + "0";

console.log("Extended multiplier:" + extended_n);
console.log("------------------------------------------------------");
console.log("BOOTHS EQUIVALENT:");
// show booths equivalent multiplicand and multiplier
console.log(m[0].repeat(bigger_length) + m);

let multiplier_list = [];

for (let i = 0; i < bigger_length; i++) {
    if (extended_n[i]+extended_n[i+1] === "00") multiplier_list.push("0");
    else if (extended_n[i]+extended_n[i+1] === "01") multiplier_list.push("1");
    else if (extended_n[i]+extended_n[i+1] === "10") multiplier_list.push("-1");
    else if (extended_n[i]+extended_n[i+1] === "11") multiplier_list.push("0");
}

for (let i = 0; i < multiplier_list.length; i++) process.stdout.write("(" + multiplier_list[i] + ")")
console.log()
console.log("------------------------------------------------------")
console.log("INTERMEDIATE STEPS:");

for (let i = multiplier_list.length; i > 0; i--) {
    if (multiplier_list[i-1] === "0") {
        console.log(multiString("0", i+bigger_length));
    }
    else if (multiplier_list[i-1] === "1") {
        process.stdout.write(m[0].repeat(i));
        console.log(m);
    }
    else if (multiplier_list[i-1] === "-1") {
        let twos_m = get_twos_comp(m);
        process.stdout.write(twos_m[0].repeat(i));
        console.log(twos_m)
    }
}

console.log("------------------------------------------------------")
console.log("FINAL PRODUCT")

let m_neg = false
let n_neg = false

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
    console.log(binaryMul);
}
else if (m_neg === n_neg) {
    while (binaryMul.length != (2 * bigger_length)) {
        binaryMul = "0" + binaryMul;
    }
    console.log(binaryMul);
}