var publisher = {
    subscribers : {
        // 이 배열에 들어가는 건 구독자 (감시자) 의 메소드인가?
        any: []
    },
    // 여기서 subscribe 는 on 메소드와 같은 역할을 한다. 즉 이벤트 리스너를 연결하는 것이다.
    subscribe: function(fn, type){
        // 기본 이벤트인지 (any) 혹은 따로 정의한 이벤트인지 확인한다.
        type = type || 'any';
        // 만약 정의한 이벤트명 배열이 존재하지 않는 경우
        if (typeof this.subscribers[type] === 'undefined') {
            this.subscribers[type] = [];
        }
        // 이젠 무조건 type 이란 이름의 프로퍼티는 있다는 소리니까 메소드를 갖다박자. 
        // 메소드는 한 개 이상 박을 수 있다 왜냐? 하단의 visitSubscribers 에서
        // 타입을 확인 후 해당 배열에 존재하는 모든 이벤트 함수들을 돌려버린다!
        this.subscribers[type].push(fn);
    },
    unsubscribe: function(fn, type){
        this.visitSubscribers('unsubscribe', fn, type);
    },
    // publish 는 발행자 (피감시자) 가 호출하는 것으로
    // 사전에 정의된 이벤트 이름을 가진 함수 (daily, monthly) 에 의해 두 단계를 거쳐 호출된다.
    // 이벤트명 호출 -> 이벤트명 함수는 인자를 담아서 다시 publish 를 호출 -> publish 가 visitSubscribers 를
    // publish 에서 호출했다고 알려줌과 동시에 인자를 전달
    publish: function (publication, type) {
        this.visitSubscribers('publish', publication, type);
    },
    visitSubscribers: function (action, arg, type){
        var pubtype = type || 'any';
        // 이벤트명을 골라낸다!
        // 만약 monthly 이벤트라면 subscribe(on)에 의해 정의된 모든 monthly 하위 함수들을 골라내서 
        var subscribers = this.subscribers[pubtype];
        var i;
        var max = subscribers.length;
        for(i = 0 ; i < max ; i++) {
            // 액션이 publish 라면 subscribers 내의 함수들에 인자 arg = publication 을 전달하고 
            if(action === 'publish') {
                subscribers[i](arg);
            // 만약 그렇지 않다면 unsubscribe 일 것이며, 이 때 arg 는 함수가 될 것이다. 두 함수가 같은 함수인 경우
            // splice 를 이용해 해당 함수르 짤라버린다!
            } else if (subscribers[i] === arg) {
                subscribers.splice(i, 1);
            }
        }
    }
};

function makePublisher(o) {
    var key;
    // publisher 객체를 그대로 o 한테 전달해주기 위한 방법. hasOwnProperty를 통해 확인후 전달한다.
    for (key in publisher){
        if (publisher.hasOwnProperty(key) && typeof publisher[key] === 'function'){
            o[key] = publisher[key];
        }
    }
    // 근데 그 객체는 일단 any 라는 이벤트만 존재한다.
    o.subscribers = {any : []};
}

// 자 이제 이 놈을 퍼블리셔 (감시대상) 으로 만들 예정이다.
// 감시 대상에는 daily 와 monthly 라는 두 개의 함수를 가지고 있다.
var paper = {
    daily: function() {
        // 잘 보자!, publish 를 호출함으로써 상단의 visitSubscribers 를 호출하고 있다.
        // 이 경우에는 publish의 publication 인자만 존재하게 된다. (type 이 null이다.)
        this.publish('big news today');
    },
    monthly: function() {
        // 이 경우에는 publish 의 publication 및 Type 이 전달된다.
        this.publish('interesting analysis', 'monthly');
    }
};

// paper 가 발행자가 되었다. 메소드 구조는 다음과 같다.
/*
    { daily: [Function],
    monthly: [Function],
    subscribe: [Function],
    unsubscribe: [Function],
    publish: [Function],
    visitSubscribers: [Function],
    subscribers: { any: [] } }
*/
makePublisher(paper);
console.log(paper);

// 이벤트 핸들러 정의!
var joe = {
    drinkCoffee: function(paper) {
        console.log(paper + ' 를 읽었습니다.');
    },
    sundayPreNap: function(monthly) {
        console.log('잠들기 전에' + monthly + ' 를 읽었습니다.');
    }
}

// 기본 이벤트 정의!
paper.subscribe(joe.drinkCoffee);
// monthly 이벤트 정의!
paper.subscribe(joe.sundayPreNap, 'monthly');

paper.daily();
// daily 가 호출되면 publish 메소드를 통해 'publication' 을 통해 문자열이 전달되게 된다.
paper.daily();
paper.monthly();