function reverseString(str) {
    return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}

function multiChar(x, y) {
    let z = x.repeat(y);
    console.log(z);
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

// prompt 2 inputs for 2 numbers
let m = 10011001;
let n = 10011001;

m_length = m.length;
n_length = n.length;

if (m_length > n_length) {
    let bigger_length = m_length;

    while (n.length !== m_length) {
        n = n[0] + n;
    }
}
else {
    let bigger_length = n_length;

    while (m.length !== n_length) {
        m = m[0] + m;
    }
}

console.log("Numbers Interpreted:\n");
console.log(m + "\n");
console.log(n + "\n");
console.log("------------------------------------------------------\n");

// # show immediate products
for (let i = bigger_length; i > 0; i--) {
    if (n[i-1] === '0') {
        multiChar("0", i+bigger_length);
        console.log("\n");
    }
    else {
        multiChar(m[0], i);
        console.log("\n");
    }
}

// if negative print the twos complement of m 
if (n[0] === "1") {
    console.log(get_twos_comp(m));
}

console.log("------------------------------------------------------\n");

// print final product
let m_neg = false;
let n_neg = false;

if (m[0] === "1") {
    m_neg = true;
}

if (n[0] === "1") {
    n_neg = true;
}

if (m_neg) {
    m = get_twos_comp(m);
}

if (n_neg) {
    n = get_twos_comp(n);
}

// let result = 
// convert string m and n to binary integers