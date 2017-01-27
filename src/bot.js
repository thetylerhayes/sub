const Crypto = require('crypto');

class NotifyBot {
  constructor(sdk) {
    this.onResub = this.onResub.bind(this);
    this.onSubscription = this.onSubscription.bind(this);
    this.handleSubs = this.handleSubs.bind(this);
    this.randomChoices = this.randomChoices.bind(this);
    this.sdk = sdk; 
  }

  onResub(channel, username, months, message){
    this.handleSubs(username, months, message, true);
  }

  onSubscription(channel, username, method) {
    this.handleSubs(username, 0, '', false);
  }

  handleSubs(username, months, message, resub) {
    const channel_name = this.sdk.channel_name;
    const twitch_name = username;

    const choices = [50, 50, 50, 50, 100, 100, 100, 100, 100, 100, 200, 200, 200, 200, 1500, 'jack'];
    const win = this.randomChoices(choices);

    const data = {
      username: twitch_name,
      months: months || null,
      win: win,
      resub: resub
    };

    this.sdk.sendData(channel_name, twitch_name, 0, true, data);

    let totalCoins = win;
    if(totalCoins === 'jack'){
      totalCoins = 5000;
    }
    if(args.months) {
      totalCoins *= args.months;
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
