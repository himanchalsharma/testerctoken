pragma solidity ^0.5.0;

contract TCCToken{
    string public name="TCC Token";
    string public symbol="TCCT";
    uint public totalSupply;
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint indexed _value
    );
    mapping(address=>uint) public balanceOf;
    constructor (uint _initialtokens) public {  //constructor runs when the contract is deployed
        balanceOf[msg.sender]=_initialtokens;
        totalSupply=_initialtokens;
    }
    function transfer(address _to,uint _value) public returns (bool success) {
        require(balanceOf[msg.sender]>=_value);
        balanceOf[msg.sender]-=_value;
        balanceOf[_to]+=_value;
        emit Transfer(msg.sender, _to, _value);
        return true; //ERC 
    }
}