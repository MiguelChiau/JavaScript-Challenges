var i = 0,
  text;
text = "Welcome to Type-n-Speak!";

function typing() {
  if (i < text.length) {
    document.getElementById("text").innerHTML += text.charAt(i);
    i++;
    // During of the typing in miliseconds
    setTimeout(typing, 70);
  }
}
typing();
