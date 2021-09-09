var TCCToken=artifacts.require("./TCCToken.sol")

contract("TCCToken",function(accounts){
    it('total supply set',function(){
        return TCCToken.deployed().then(function(i){
            instance=i;
            return instance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(),999999,'Total Supply Set');
        })

    })
})
