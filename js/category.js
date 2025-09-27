function changeValue(delta) {
    const input = document.getElementById("number");
    let value = parseInt(input.value) || 0;
    value += delta;

    // Nếu muốn chặn không cho nhỏ hơn 0
    if (value < 0) value = 0;

    input.value = value;
}