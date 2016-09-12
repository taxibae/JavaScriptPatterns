var Garget = function() {};

// Garget 하위에 isShiny 함수를 생성해 보았다.
Garget.isShiny = function () {
    return 'you bet';
};

// setPrice 는 new를 통해 생성된 객체에 price를 입력받아서, this.price 라는 내부 프로퍼티를 생성해 집어넣는다.
Garget.prototype.setPrice = function(price){
    this.price = price;
};

// isShiny 가 Garget 객체의 스태틱한 느낌의 메소드이므로 포인터를 만들어서 넘겨주자.
Garget.prototype.isShiny = Garget.isShiny

// iPhone 을 new 로 Garget 객체를 만들면 프로토타입 메소드가 iPhone 의 메소드가 된다.
// 따라서 setPrice 는 정상적으로 작동한다.
// 그러나 Garget 의 경우에는 prototype 에만 존재하기 때문에 undefined이다.
var iPhone = new Garget();
iPhone.setPrice(500);

console.log(typeof Garget.setPrice);
console.log(Garget);

// 하지만 아이폰은 분명 new를 썼는데 Garget의 메소드인 isShiny 가 안 따라온다?!
// 일단 Garget.isShiny 로 생성한 함수는 프로토타입이 아니며, Math 의 메소드처럼 스태틱하게 인스턴스 없이 쓴다.
// 그래서 위와 같이 포인터를 넘겨주면 Garget.isShiny() 에 접근할 수 있다.
// 대신 iPhone.isShiny 에서 this 는 isShiny 가 된다!
console.log(typeof iPhone.isShiny);
console.log(iPhone);

// 생성자를 링크시켜도 정상 작동한다.
var NewGadget = Garget;
console.log(NewGadget); 

newPhone = new NewGadget();
newPhone.setPrice(1000);
console.log(newPhone);
console.log(iPhone);