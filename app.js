var regExp1 = /script/;
var expressionInt = /%d/;

var text = 'javascript';
var testString = 'this number is %d';

console.log(regExp1.test(text));
console.log(regExp1.exec(text));

console.log(testString.replace(expressionInt,'30'));

var foo = function foo(){};
var bar = function () {};

console.log(foo.name);
console.log(bar.name);

