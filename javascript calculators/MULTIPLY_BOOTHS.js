function reverseString(str) {
    return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}

function multiString(str, num) {
    let z = str.repeat(num);
    return z
}
function get_twos_comp (x) {
    let found_one = false;
    let final_str = "";

    for (let i = x.length; i > 0; i-- ) {
        if (found_one = true) {
            if (x[i-1] == "0") {
                final_str = final_str + "1";
            }
            else if (x[i-1] == "1") {
                final_str = final_str + "0";
            }
        }
        else {
            if (x[i-1] == "1" && found_one == false) {
                found_one = true;
                final_str = final_str + x[i-1];
            }
            else {
                final_str = final_str + x[i-1]
            }
        }
        final_str = reverseString(final_str);
        return final_str;
    }
}

let m = console.log ("Enter the first number: ");
let n = console.log ("Enter the second number: ");

let m_length = m.length;
let n_length = n.length;

var bigger_length;

if (m_length > n_length){
    bigger_length = m_length
    while (len(n) !== m_length) {
        n = n[0] + n;
    }     
}   
else {
    bigger_length = n_length
    while (len(m) != n_length) {
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
console.log(multiString(m[0].repeat(bigger_length)) + m);

let multiplier_list = [];

for (let i = 0; i < bigger_length; i += 1) {
    if (extended_n[i]+extended_n[i+1] === "00" ) {
        multiplier_list.push("0");
    }
    else if (extended_n[i]+extended_n[i+1] === "01") {
        multiplier_list.push("1");
    }
    else if (extended_n[i]+extended_n[i+1] === "01") {
        multiplier_list.push("-1");
    }
    else if (extended_n[i]+extended_n[i+1] === "01") {
        multiplier_list.push("0");
    }
}

for (let i = 0; i < multiplier_list.length; i++) process.stdout.write("(" + i + ")")
console.log()
console.log("------------------------------------------------------")
console.log("INTERMEDIATE STEPS:");

for (let i = multiplier_list.length; i > 0; i--) {
    if (multiplier_list[i-1] === "0") {
        console.log("0" * (i+bigger_length));
    }
    else if (multiplier_list[i-1] === - "1") {
        console.log(m[0] * i);
        console.log(" " + m);
    }
    else if (multiplier_list[i-1] == "-1") {
        let twos_m = get_twos_comp(m);
        console.log(twos_m[0] * i);
        console.log(" " + twos_m)
    }
}

console.log("------------------------------------------------------")
console.log("FINAL PRODUCT")





    


