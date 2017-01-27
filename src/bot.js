const Crypto = require('crypto');

class NotifyBot {
  constructor(sdk) {
    this.onMessage = this.onMessage.bind(this);
    this.randomChoices = this.randomChoices.bind(this);
    this.sdk = sdk; 
  }

  onSubscription(user_state) {
    const channel_name = this.sdk.channel_name;
    const twitch_name = user_state.username;

    const choices = [50, 50, 50, 50, 100, 100, 100, 100, 100, 100, 200, 200, 200, 200, 1500, 'jack'];
    const win = this.randomChoices(choices);

    const data = {
      username: user_state.username,
      color: user_state.color,
      msgId: user_state['msg-id'] || null,
      months: user_state['msg-param-months'] | null,
      win: win,
    };

    this.sdk.sendData(channel_name, twitch_name, 0, true, data);

    let totalCoins = win;
    if(totalCoins === 'jack'){
      totalCoins = 5000;
    }
    if(user_state['msg-param-months']) {
      totalCoins *= user_state['msg-param-months'];
    }
    this.sdk.addPoints(twitch_name,totalCoins).then(()=>{
      this.sdk.sendWhisper(twitch_name, `You won ${totalCoins} coins in the coin spin! They have been added to your wallet.`);
    })
  }

  // choices = array of choices to be selected from.
  // input: [100, 200, 305, 404, 505], returns: 305
  randomChoices(choices) { 
    let randn = null;

    do {
      randn = Crypto.randomBytes(1)[0].toString(); // 0 - 255
    } while (randn >= (255 - (255 % choices.length))); // kill off the bias

    return choices[randn % choices.length];
  }
}

export default NotifyBot;
//Export this for webpack
