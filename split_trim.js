var inputText = 'Super super star ';
var trimedText;
var afterSplit = [];

trimedText = inputText.trim();
afterSplit = trimedText.split(' ');

for(i in afterSplit){
    console.log(afterSplit[i]);
}