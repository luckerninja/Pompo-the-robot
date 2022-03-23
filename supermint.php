<?php
    if(!($_COOKIE['Login'] == 'noo')) {
        header('Location: https://pompotherobot.com/login.php');
    } 
?>

<?php
    require('./page26063209.html');
?>

<style>
    #rec424275154, #rec424273691 {
        display: none;
    }
</style>

<script type="module">

import contractAbi from "./rinkeby.json" assert { type: "json" };;

    const start = async () => {
      const getBalance = async () => {
      const [account] = await ethereum.request({ method: 'eth_accounts' });
      const provider = new ethers.providers.Web3Provider(ethereum);
      const balance = await provider.getBalance(account);
      console.log(ethers.utils.formatEther(balance));
      
      return getContract(provider);
  }
  
  const getContract = (provider) => {
      const contractAddress = "*******";
      
      const signer = provider.getSigner();
      
      console.log(contractAbi);
      
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);
      
      getCount(contract);
      
      return contract;
  }
  
  
  const getCount = async (contract) => {
      const count = await contract.count;
      console.log(count);
      console.log(contract);
  }

  const viewHideBlock = (block) => {
    block.style.display = 'block';
    setTimeout(() => {
        block.style.display = 'none';
    }, 8000)
  }
  
  const mintButton = async () => {
    try {
      const result = await contract.mint(1, {
          value: ethers.utils.parseEther('0.001')
      });

      let accessMint = document.querySelector('#rec424275154');
      viewHideBlock(accessMint);
      

    } catch (e) {

        let errorBlock = document.querySelector('#rec424273691');
        viewHideBlock(errorBlock);
    }

      }
  
  const contract = await getBalance();
  let totalSupply = null
  await contract.totalSupply().then(value => totalSupply = ethers.utils.formatEther(value));
  totalSupply *= 1000000000000000000; 

  document.querySelector(".t580__btn").addEventListener('click', mintButton);

  document.querySelector(".t225__title").innerHTML = `${totalSupply} / 100`
  
  };
  
  start()

  try {
    start()
  }
  catch (e) {
    let errorBlock = document.querySelector('#rec424273691');
    viewHideBlock(errorBlock);
  }
  
</script>