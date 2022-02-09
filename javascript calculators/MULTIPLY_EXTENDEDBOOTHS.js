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

let m = "0101"
let n = "010"

let m_length = m.length
let n_length = n.length

var bigger_length

if (m_length > n_length) {
    bigger_length = m_length
    while (n.length !== m_length) n = n[0] + n
}
else {
    bigger_length = n_length
    while (m.length !== n_length) m = m[0] + m
}

console.log("------------------------------------------------------")
console.log("Numbers Inputted: ")
console.log(m)
console.log(n)
console.log("------------------------------------------------------")

// show interpreted multiplicand and multiplier 
console.log("Multiplicand: " + m)

let extended_n = n + "0"

if (n.length % 2 === 1) extended_n = extended_n[0] + extended_n

console.log("Extended multiplier" + extended_n)
console.log("------------------------------------------------------")

// show booths equivalent multiplicand and multiplier
console.log("BOOTHS EQUIVALENT:")
console.log(multiString(m[0].repeat(bigger_length)) + m)

let multiplier_list = []

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

// print out the multiplier list inside parentheses without trailing line feed
for (let i = 0; i < multiplier_list.length; i++) process.stdout.write("(" + i + ")")
console.log()
console.log("------------------------------------------------------")

console.log("INTERMEDIATE STEPS:")
let current_max_length = bigger_length * 2

for (let i = multiplier_list.length; i > 0; i--) {
    // if curr is 0
    if (multiplier_list[i-1] === "0") console.log(multiString("0", current_max_length))
    
    // if curr is 1
    else if (multiplier_list[i-1] === "1") {
        let fullstring = m 
        while (fullstring.length !== current_max_length) {
            fullstring = fullstring[0] + fullstring
            console.log(fullstring)
        }
    }

    // if curr is -1
    else if (multiplier_list[i-1] === "-1") {
        let fullstring = get_twos_comp(m) 
        while (fullstring.length !== current_max_length) {
            fullstring = fullstring[0] + fullstring
            console.log(fullstring)
        }
    }

    // if curr is 2
    else if (multiplier_list[i-1] === "2") {
        let fullstring = m + "0"
        while (fullstring.length !== current_max_length) {
            fullstring = fullstring[0] + fullstring
            console.log(fullstring)
        }
    }

    // if curr is -2
    else if (multiplier_list[i-1] === "-2") {
        let fullstring = get_twos_comp(m) + "0"
        while (fullstring.length !== current_max_length) {
            fullstring = fullstring[0] + fullstring
            console.log(fullstring)
        }
    }

    current_max_length -= 2
}

console.log("------------------------------------------------------")
console.log("FINAL PRODUCT")
// print the final product 
let m_neg = false
let n_neg = false

if (m[0] === "1") m_neg = true 
if (n[0] === "1") n_neg = true 

if (m_neg) m = get_twos_comp(m)
if (n_neg) n = get_twos_comp(n)

let result = parseInt(m, 2) * parseInt(n, 2)

let binaryMul = result.toString(2)

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