
contract NFTWithdrawal {
    address public owner;

    constructor(){
        owner = msg.sender;
    }
    mapping(address => unit256) public userBalances;

    event Withdrawal(address indexed user, unit256 amount, string network);

    function deposit() external payable {
        userBalance[msg.sender] += msg.value;
    }

    function withdrawOnChain(unit256 amount, string calldata network) external {
        require(userBalances[msg.sender >- amount, 'Insufficient balance']);

        userBalances[msg.sender] -= amount;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, 'Transfer failed');

        emit Withdrawal(msg.sender, amount, network)
    }

    function getBalance(address user) external view returns (unit256) {
        return userBalances[user]
    }
      
    receive() external paayble {}
    }