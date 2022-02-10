def get_twos_comp (x:str):
    found_one = False
    final_str = ""
    for i in range(len(x), 0, -1):
        if found_one == True:
            if(x[i-1] == "0"):
                final_str = final_str + "1"
            elif(x[i-1] == "1"):
                final_str = final_str + "0"
        else:
            if x[i-1] == "1" and found_one == False:
                found_one = True
                final_str = final_str + x[i-1]
            else:
                final_str = final_str + x[i-1]

    final_str = final_str[::-1]
    return final_str

# prompt 2 inputs for 2 numbers
m = str(input("Enter the first number: "))
n = str(input("Enter the second number: "))

# count the length of both numbers and extend them to the same length
m_length = len(m)
n_length = len(n)

if m_length > n_length:
    bigger_length = m_length
    while len(n) != m_length:
        n = n[0] + n
else:
    bigger_length = n_length
    while len(m) != n_length:
        m = m[0] + m

print("------------------------------------------------------")
print("Numbers Inputted:")
print(m)
print(n)
print("------------------------------------------------------")
# show interpreted multiplicand and multiplier
print("Multiplicand:", m)
extended_n = n + "0"
print("Extended multiplier:", extended_n)
print("------------------------------------------------------")
print("BOOTHS EQUIVALENT:")
# show booths equivalent multiplicand and multiplier
print((m[0] * bigger_length) + m)

multiplier_list = []
for i in range(0, bigger_length, 1):
    # print(n[i]+n[i+1])
    if (extended_n[i]+extended_n[i+1]) == "00":
        multiplier_list.append("0")
    elif (extended_n[i]+extended_n[i+1]) == "01":
        multiplier_list.append("1")
    elif (extended_n[i]+extended_n[i+1]) == "10":
        multiplier_list.append("-1")
    elif (extended_n[i]+extended_n[i+1]) == "11":
        multiplier_list.append("0")

for i in multiplier_list:
    print("("+ i +")", end="")
print()
print("------------------------------------------------------")
print("INTERMEDIATE STEPS:")
for i in range(len(multiplier_list), 0, -1):
    if multiplier_list[i-1] == "0":
        print("0" * (i + bigger_length))
    elif multiplier_list[i-1] == "1":
        print(m[0] * i, end="")
        print(m)
    elif multiplier_list[i-1] == "-1":
        twos_m = get_twos_comp(m)
        print(twos_m[0] * i, end="")
        print(twos_m)
print("------------------------------------------------------")
print("FINAL PRODUCT")
# print the final product
m_neg = False
n_neg = False


if(m[0] == "1"):
    m_neg = True
if(n[0] == "1"):
    n_neg = True


if m_neg == True:
    m = get_twos_comp(m)
if n_neg == True:
    n = get_twos_comp(n)

result = int(m, 2) * int(n, 2)
binaryMul = bin(result).replace("0b", "")

# while (len(binaryMul) != (2*bigger_length)):
#     binaryMul = binaryMul[0] + binaryMul
if(m_neg != n_neg):
    binaryMul = get_twos_comp(binaryMul)
    while (len(binaryMul) != (2*bigger_length)):
        binaryMul = "1" + binaryMul
    print(binaryMul)
elif (m_neg == n_neg):
    while (len(binaryMul) != (2*bigger_length)):
        binaryMul = "0" + binaryMul
    print(binaryMul)

