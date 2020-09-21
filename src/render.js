document.getElementById("submit")
    .addEventListener('click', () => {
        color_coverter();
    });

document.getElementById('clear')
    .addEventListener('click', () => {
        color_result.style.display = "none";
        warning.style.display = "none";
        document.querySelectorAll('input').forEach(input => input.value = '');
        global_color_output = '';
    });

document.getElementById('text_result_clickable')
    .addEventListener('click', () => {
        navigator.clipboard.writeText(global_color_output).then(function () {
            /* clipboard successfully set */
            notification_success_copied();
        }, function () {
            /* clipboard write failed */
        });
    });

let global_color_output = '';

function color_coverter() {
    warning.style.display = "none";

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
        floatres.push(parseFloat(col_float_r).replace(',', '.'));
        floatres.push(parseFloat(col_float_g).replace(',', '.'));
        floatres.push(parseFloat(col_float_b).replace(',', '.'));
        decres = float2dec(floatres);
        hexres = dec2hex(decres);
    } else {
        notification_error_empty();
        return;
    }
    let hex = `hex #${hexres}`;
    let dec = `${decres[0]}, ${decres[1]}, ${decres[2]}, 255`;
    let float = `${floatres[0]}, ${floatres[1]}, ${floatres[2]}, 1,000`;
    document.getElementById("hex_color_res").innerHTML = hex;
    document.getElementById("dec_color_res").innerHTML = dec;
    document.getElementById("float_color_res").innerHTML = float;
    document.getElementById("color_square").style.backgroundColor = `#${hexres}`
    global_color_output = `${hex}\n${dec}\n${float}`
    color_result.style.display = "block";
    document.querySelectorAll('input').forEach(input => input.value = '');
}

function hex2dec(hexres) {
    let decres = [];
    for (let i = 0; i < 3; i++) {
        decres.push(parseInt(hexres.substring((0 + 2 * i), (2 + 2 * i)), 16));
    }

    return decres;
}

function dec2float(decres) {
    let floatres = [];
    decres.forEach(dcolor => {
        floatres.push((dcolor / 255).toFixed(3).replace('.', ','));
    });
    return floatres;
}

function dec2hex(decres) {
    let hexcolor = ''
    decres.forEach(dcolor => {
        hexcolor = hexcolor + parseInt(dcolor).toString(16);
    });
    return hexcolor;
}

function float2dec(floatres) {
    let decres = [];
    floatres.forEach(fcolor => {
        decres.push((fcolor * 255).toFixed(0));
    });
    return decres;
}

function notification_error_empty() {
    document.getElementById("warning_message").innerHTML = "please enter a color value!";
    warning.style.display = "block";
    warning.style = "display: block; background-color: #ff4444;";
    warning_message.style = 'color: #fbfbfb'
}
function notification_success_copied() {
    document.getElementById("warning_message").innerHTML = "Copied to clipboard";
    warning.style = "display: block; background-color: #abc8f8;";
    warning_message.style = 'color: #0f0f0f'
}