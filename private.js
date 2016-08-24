function TestConstructor(){
    var member_1 = 'member - 1',
        member_2 = 'member - 2';
    this.member_this = 'thismember';
    this.getMember1 = function(){
        return member_1;
    };
}

var global_variable = 'global';
this.global_variable = 'global';

var testFunction = new TestConstructor();
var testFunction2 = TestConstructor();
console.log(testFunction.getMember1());
console.log(typeof testFunction2);
console.log(typeof this.member_this);

function Waffle() {
    this.tastes = 'yamme!';
}

var good_morning = Waffle();
console.log(typeof good_morning);
console.log(typeof this.tastes);
console.log(global_variable);
console.log(this);