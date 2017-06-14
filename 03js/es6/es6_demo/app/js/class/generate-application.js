{
    /*
    1.异步操作的同步化
    */
    //ajax请求
   /* function* main() {
        var result = yield request("http://some.url");
        var resp = JSON.parse(result);
        console.log(resp.value);
    }

    function request(url) {
        makeAjaxCall(url, function (response) {
            it.next(response); //response会回传到yield语句
        });
    }

    var it = main();
    it.next();

    //同步读取文本
    function* numbers() {
        let file = new FileReader("numbers.txt");
        try {
            while (!file.eof) {
                yield parseInt(file.readLine(), 10);
            }
        } finally {
            file.close();
        }
    }*/
}

{
    //流程控制
    let step1Func  = () =>{
        console.log('step1');
    };
    let step2Func = () =>{
        console.log('step2');
    };
    let step3Func = () =>{
        console.log('step3');
    };
    let steps = [step1Func, step2Func, step3Func];

    function* iterateSteps(steps) {
        for (var i = 0; i < steps.length; i++) {
            var step = steps[i];
            yield step();
        }
    }

    var a = iterateSteps(steps);
    a.next();
    a.next();
    a.next();
}