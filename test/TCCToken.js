var TCCToken=artifacts.require("./TCCToken.sol")

contract("TCCToken",function(accounts){
    it('total supply set',function(){
        return TCCToken.deployed().then(function(i){
            instance=i;
            return instance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(),999999,'Total Supply Set');
            return instance.balanceOf(accounts[0]);
        }).then(function(mainbalance){
            assert.equal(mainbalance.toNumber(),999999,'Gives main total supply')
        })

    })
    it('Name and sumbol are set',function(){
        return TCCToken.deployed().then(function(i){
            instance=i;
            return instance.name();
        }).then(function(name){
            assert.equal(name,'TCC Token','Name is set');
            return instance.symbol();
        }).then(function(symbol){
            assert.equal(symbol,"TCCT","Symbol is set");
        })

    })
    it('Transfers funds',function(){
        return TCCToken.deployed().then(function(i){
            instance=i;
            return instance.transfer.call(accounts[1],9999999); //.call doesnt perform the transaction only tries
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0,"Error message must contrain revert to make sure gas is reverted in case of fail")
            return instance.transfer.call(accounts[1],100,{from:accounts[0]})
        }).then(function(i){
            assert.equal(i,true,'Returns true')
            return instance.transfer(accounts[1],100,{from:accounts[0]}) //.call returns a reciept and acualyy does a transaction           
        }).then(function(reciept){
            assert.equal(reciept.logs.length,1,"Event Triggered Once")
            assert.equal(reciept.logs[0].event,'Transfer',"In the first triggered event, the event was Transfer ")
            assert.equal(reciept.logs[0].args._from,accounts[0],"Account it was transferred from ")   //.args is the important thing
            assert.equal(reciept.logs[0].args._to,accounts[1],"Account it was transferred to ")
            assert.equal(reciept.logs[0].args._value,100,"Amount that was transferred ")
            return instance.balanceOf(accounts[1])
        }).then(function(balance){
            assert.equal(balance.toNumber(),100,"Transfers succesfully");
            return instance.balanceOf(accounts[0])
        }).then(function(balance){
            assert.equal(balance.toNumber(),999899,"Deducts succesfully");
        })

    })
})
