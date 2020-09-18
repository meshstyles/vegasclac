
function getColor() {

    let __in_col_dec_r = form_col_dec_r.value;
    // __form_col_dec_r.value = '255';
    console.log(__in_col_dec_r);

    document.getElementById("dec_col_output").innerHTML = __in_col_dec_r;
    dec_col_res.style.display = "block";
}