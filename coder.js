var body = document.body
var inputCode = document.getElementById("code1");
var uniqNum = document.getElementById("uniq");
var convertAlph = document.getElementById("conAlph");
var convertNum = document.getElementById("conNum");
var clear = document.getElementById("clear");
var hasil = document.getElementById("hasil");

function alphabetized(code){
    code = String(code).split("");
    var alphaNum = [];
    alphaNum[0] = Number(code[0]) + 65 ;
    alphaNum[1] = Number(code[1]) + 75 ;
    alphaNum[2] = Number(code[2]) + 97 ;
    alphaNum[3] = Number(code[3]) + 107 ;
    var alpha = [];
    for (var i = 0; i < alphaNum.length; i++){
        alpha[i] = String.fromCharCode(alphaNum[i]);
    }
    alpha = alpha.join("");
    return alpha;
}

function gensAnagram (word, anagram2 = "", anagrams2 = []){
    if (!word){
        anagrams2.push(anagram2);
        return anagrams2;
    }
    for (var i = 0; i < word.length; i++){
        anagram2 += word[i];
        gensAnagram (word.slice(0, i) + word.slice (i+1), anagram2, anagrams2);
        anagram2 = anagram2.slice(0, anagram2.length-1);
    }
    var uniq = [...new Set(anagrams2)];
    return uniq[Number(uniqNum.value-1)];
}

function coder(num){
    var alphabet = alphabetized(num);
    var anagram = gensAnagram(alphabet);
    return anagram;
}

function numberization(codes){
    codes = codes.split("");
    var nums = [];
    for (var i = 0; i < codes.length; i++){
        for (var j = 65; j <= 116; j++){
            if (codes[i] === String.fromCharCode(j)){
                if (j < 75){
                    nums[0] = j-65;
                } else if (j < 97){
                    nums[1] = j-75;
                } else if (j < 107){
                    nums[2] = j-97;
                } else {
                    nums[3] = j-107;
                }
            }
        }
    }
    return nums.join("");
}

function checkUniq (codes){
    var alpha1 = numberization(codes);
    var alpha2 = alphabetized(alpha1);
    var alphaCheck = gensAnagram(alpha2);
    if (alphaCheck === codes){
        return true;
    } else {
        return false;
    }
}

convertAlph.addEventListener("click", function(event){
    if (String(inputCode.value).length > 4 || String(inputCode.value).length < 4 || isNaN(inputCode.value) === true){
        alert("Input your code with 4 digit number");
        event.defaultPrevented;
    } else {
        hasil.innerHTML = "Your Alphabet Code is " + coder(inputCode.value);
    }
})

convertNum.addEventListener("click", function(event){
    if (String(inputCode.value).length > 4 || String(inputCode.value).length < 4 || numberization(inputCode.value).length === 0){
        alert("Input your code with the right 4 alphabet code");
        event.defaultPrevented;
    } else {
        if (checkUniq(inputCode.value)){
            hasil.innerHTML = "Your 4 Digit Code is " + numberization(inputCode.value);
        } else {
            alert("Your unique number is wrong! Please check again!");
        }
    }
})

clear.addEventListener("click", function(event){
    inputCode.value = "";
    uniqNum.value = 1;
    hasil.innerHTML = ""
})