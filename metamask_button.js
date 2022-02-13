const forwarderOrigin = 'https://pompotherobot.com';


const initialize = () => {
  const onboardButton = document.querySelector('.tn-elem__4097108541643550336252');
  const onboardButtonText = onboardButton.querySelector('a');
  
  onboardButtonText.href = '#';
  

  const isMetaMaskInstalled = () => {

    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

    const onboarding = new MetaMaskOnboarding({ forwarderOrigin });


    const onClickInstall = () => {
      onboardButtonText.innerText = 'Intall in progress';
      onboardButton.disabled = true;
      
      onboarding.startOnboarding();
    };
    
    
    checkAccounts();
    
    const onClickConnect = async () => {
        try {

            await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error(error);
    }
    };

  const MetaMaskClientCheck = () => {

    if (!isMetaMaskInstalled()) {
        onboardButtonText.innerHTML = 'Install MetaMask';
        
        onboardButton.onclick = onClickInstall;
        onboardButton.disabled = false;
        
    } else {
        onboardButtonText.innerHTML = 'Connect Wallet';
        onboardButton.onclick = onClickConnect;
        onboardButton.disabled = false;
    }
  };
  
   onboardButton.addEventListener('click', async () => {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    onboardButtonText.innerHTML = accounts[0] ? 'Connected' : 'Connecting';
    });
  
  MetaMaskClientCheck();


};

window.addEventListener('DOMContentLoaded', initialize);