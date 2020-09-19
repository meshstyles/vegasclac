const submitBtn = document.getElementById("submit");
submitBtn.onclick = color_coverter;


function color_coverter() {
    let col_hex_rgb = form_col_hex_rgb.value;

    let col_dec_r = form_col_dec_r.value;
    let col_dec_g = form_col_dec_g.value;
    let col_dec_b = form_col_dec_b.value;

    let col_float_r = form_col_float_r.value;
    let col_float_g = form_col_float_g.value;
    let col_float_b = form_col_float_b.value;

    let hexres, decres, floatres;

    if (col_hex_rgb) {
        hexres = col_hex_rgb;
        decres = hex2dec(hexres);
        floatres = dec2float(decres);
    } else if (col_dec_r && col_dec_g && col_dec_b) {
        // code quality is poor but since I have to use parse float for float rgb I cant reuse a function anyway
        decres = [];
        decres.push(parseInt(col_dec_r));
        decres.push(parseInt(col_dec_g));
        decres.push(parseInt(col_dec_b));
        hexres = dec2hex(decres);
        floatres = dec2float(decres);

    } else if (col_float_r && col_float_g && col_float_b) {
        floatres = [];
        floatres.push(parseFloat(col_float_r));
        floatres.push(parseFloat(col_float_g));
        floatres.push(parseFloat(col_float_b));
        decres = float2dec(floatres);
        hexres = dec2hex(decres);
    }

    document.getElementById("hex_color_res").innerHTML = `hex #${hexres}`;
    document.getElementById("dec_color_res").innerHTML = `${decres[0]}, ${decres[1]}, ${decres[2]}, 255`;
    document.getElementById("float_color_res").innerHTML = `${floatres[0]}, ${floatres[1]}, ${floatres[2]}, 1,000`;
    document.getElementById("color_square").style.backgroundColor = `#${hexres}`
    color_result.style.display = "block";
}


function hex2dec(hexres) {
    let decres = [];
    decres.push(parseInt(hexres.substring(0, 2), 16));
    decres.push(parseInt(hexres.substring(2, 4), 16));
    decres.push(parseInt(hexres.substring(4, 6), 16));
    return decres;
}

function dec2float(decres) {
    let floatres = [];
    floatres.push((decres[0] / 255).toFixed(3).replace('.', ','));
    floatres.push((decres[1] / 255).toFixed(3).replace('.', ','));
    floatres.push((decres[2] / 255).toFixed(3).replace('.', ','));
    return floatres;
}

function dec2hex(decres) {
    return `${decres[0].toString(16)}${decres[1].toString(16)}${decres[2].toString(16)}`;
}

function float2dec(floatres) {
    let decres = [];
    decres.push((floatres[0] * 255).toFixed(0));
    decres.push((floatres[1] * 255).toFixed(0));
    decres.push((floatres[2] * 255).toFixed(0));
    return decres;
}
