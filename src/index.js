import { fabric } from 'fabric';
//import bot_bar from 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1045838/bottom_bar%402x.png';
//import celeb_spiral from 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1045838/celeberation-spiral%402x.png';
//import non_moving_parts from 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1045838/non-moving-parts%20copy.png';
//import dat_wheel from 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1045838/wheel%402x.png';

fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

let wheel = null;
let bg = null;
let ray = null;
let botBar = null;
let username = null;
let subscribed = null;
let winsTxt = null;
let winningsTxt = null;

let globalOpts = null;

class Notify {

  constructor(width, height, widget, canvas) {
    this.width = width;
    this.height = height;
    this.widget = widget;
    this.canvas = new fabric.StaticCanvas(canvas);
    /*
     ^^Only nessecary if you're using fabric. Otherwise, just do:
     this.canvas = canvas;
     */
    this.onMessage = this.onMessage.bind(this);
    this.enqueueAnimation = this.enqueueAnimation.bind(this);
    this.render = this.render.bind(this);
    this.finish  = this.finish.bind(this);
    this.spin = this.spin.bind(this);
    this.calculateFromEndPoint = this.calculateFromEndPoint.bind(this);
    this.afterSpin = this.afterSpin.bind(this);
    this.afterAnimation = this.afterAnimation.bind(this);
    this.fadeIn = this.fadeIn.bind(this);

    this.canvas.on('object:added', (e) => {
      if (e.target && e.target._isWheel && !wheel) {
        wheel = e.target;
      }
      if (e.target && e.target._isBg && !bg) {
        bg = e.target;
      }
      if(e.target && e.target._isRay && !ray){
        ray = e.target;
      }
      if(e.target && e.target._isBotBar && !botBar){
        botBar = e.target;
      }
      if(wheel && bg && ray && botBar){
        this.fadeIn(globalOpts);
      }
    });

    //^^Set variables
    this.queue = [];
    this.isRunning = false;
  }

  render(options) {
    globalOpts = options;
    this.canvas.setHeight(this.height);
    this.canvas.setWidth(this.width);

    fabric.Image.fromURL('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1045838/celeberation-spiral%402x.png', (img0) => {
      img0
        .setLeft(this.width / 2)
        .setTop(this.height / 1.095)
        .scaleToWidth(this.width*1.4)
        .setAngle(180)
        .set('opacity', 0);
      img0._isRay = true;
      img0._passThroughOpts = options;
      this.canvas.add(img0);

      fabric.Image.fromURL('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1045838/wheel%402x.png', (img1) => {
        img1
          .setLeft(this.width / 2)
          .setTop(this.height / 1.095)
          .setWidth(this.width - this.width * .045)
          .set('opacity', 0)
          .setHeight(this.width - this.width * .045);
        img1._isWheel = true;
        img1._passThroughOpts = options;
        this.canvas.add(img1);
        fabric.Image.fromURL('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1045838/non-moving-parts%20copy.png', (img2) => {
          img2._isBg = true;
          img2
            .setLeft(this.width / 2)
            .setTop(this.height / 1.1)
            .set('opacity', 0)
            .scaleToWidth(this.width);
          img2._passThroughOpts = options;
          this.canvas.add(img2);
          fabric.Image.fromURL('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1045838/bottom_bar%402x.png', (img3) => {
            img3
              .setLeft(this.width / 1.98)
              .setTop(this.height / 1.085)
              .set('opacity', 0)
              .scaleToWidth(this.width);
            img3._isBotBar = true;
            img3._passThroughOpts = options;
            this.canvas.add(img3);
            this.canvas.add(
              username = new fabric.Text(`${options.username}`, {
                width: this.width,
                height: this.height,
                left: this.width / 2,
                top: this.height / 4,
                fill: 'turquoise',
                fontFamily: 'Titillium Web',
                fontSize: (48/450) * this.height,
                fontWeight: 600
              })
            );
            this.canvas.add(
              subscribed = new fabric.Text(options.resub ? `${options.months} MONTH RESUB` : `NEW SUBSCRIBER`, {
                width: this.width,
                height: this.height,
                left: this.width / 2,
                top: this.height / 3,
                fill: 'white',
                fontFamily: 'Titillium Web',
                fontSize: (28/450) * this.height,
                fontWeight: 600
              })
            );
            this.canvas.add(
              winsTxt = new fabric.Text(`WINS`, {
                width: this.width,
                height: this.height,
                left: this.width / 2,
                top: this.height / 3,
                fill: 'red',
                fontFamily: 'Titillium Web',
                fontSize: (36/450) * this.height,
                fontWeight: 900,
                opacity: 0
              })
            );
            this.canvas.add(
              winningsTxt = new fabric.Text(``, {
                width: this.width,
                height: this.height,
                left: this.width / 2,
                top: this.height / 2.3,
                fill: 'white',
                fontFamily: 'Titillium Web',
                fontSize: (36/450) * this.height,
                fontWeight: 700,
                opacity: 0
              })
            );
          });
        });
      });
    });

  }

  fadeIn(options){
    wheel.animate('opacity', 1, {
      duration: 300,
      onChange: this.canvas.renderAll.bind(this.canvas),
    });
    bg.animate('opacity', 1, {
      duration: 300,
      onChange: this.canvas.renderAll.bind(this.canvas),
    });
    botBar.animate('opacity', 1, {
      duration: 300,
      onChange: this.canvas.renderAll.bind(this.canvas),
    });
    this.spin(options);
  }

  calculateFromEndPoint(landOn){
    let endAngle = 0;

    switch (landOn) {
      case 50:
        endAngle = [20, 110, 201, 291][Math.floor(Math.random() * 4)]
        break;
      case 100:
        endAngle = [43, 88, 133, 224, 269, 314][Math.floor(Math.random() * 6)];
        break;
      case 200:
        endAngle = [64, 155, 246, 336][Math.floor(Math.random() * 4)];
        break;
      case 1500:
        endAngle = 178;
        break;
      case 'jack':
        endAngle = 359;
        break;
      default:
        endAngle = 30;
        break;
    }
    endAngle -= Math.floor(Math.random() * 18);
    return endAngle;
  }

  spin(options){
    const calculatedAngle = this.calculateFromEndPoint(options.win);
    wheel.animate('angle', 7200 - calculatedAngle, {
      onChange: this.canvas.renderAll.bind(this.canvas),
      duration: 6000,
      easing: fabric.util.ease.easeOutCirc
    });
    setTimeout(() => {
      this.afterSpin(options);
    }, 6000);
  }

  afterSpin(options){
    //fade out & remove (re)sub text

    if(options.win !== 'jack'){
      if(options.months === 0){
        winningsTxt.setText(`${options.win} coins`)
      } else {
        winningsTxt.setText(`${options.months} x ${options.win} coins`)
      }
    } else {
      winningsTxt.setText(`THE JACKPOT`)
    }


    ray.animate('opacity', .8, {
      duration: 300,
      onChange: this.canvas.renderAll.bind(this.canvas),
    });

    ray.animate('angle', 720, {
      onChange: this.canvas.renderAll.bind(this.canvas),
      duration: 10000,
    });

    subscribed.animate('opacity', '0', {
      duration: 500,
      onChange: this.canvas.renderAll.bind(this.canvas),
      onComplete: () => {
        this.canvas.remove(subscribed);
      }
    });

    winsTxt.animate('opacity', '1', {
      duration: 500,
      onChange: this.canvas.renderAll.bind(this.canvas),
    });

    winsTxt.animate('top', this.height / 3.5, {
      duration: 500,
      onChange: this.canvas.renderAll.bind(this.canvas),
    });

    winningsTxt.animate('opacity', '1', {
      duration: 500,
      onChange: this.canvas.renderAll.bind(this.canvas),
    });

    winningsTxt.animate('top', this.height / 2.8, {
      duration: 500,
      onChange: this.canvas.renderAll.bind(this.canvas),
    });

    username.animate('top', this.height / 5, {
      duration: 500,
      onChange: this.canvas.renderAll.bind(this.canvas),
    });

    setTimeout(this.afterAnimation, 3000);
  }

  afterAnimation(){
    this.canvas.getObjects().map((o) => {
      o.animate('top', this.height, {
        duration: 300,
        onChange: this.canvas.renderAll.bind(this.canvas)
      });
      o.animate('opacity', 0, {
        duration: 300,
        onChange: this.canvas.renderAll.bind(this.canvas),
        onComplete: () => {
          this.canvas.remove(o);
          wheel = null;
          bg = null;
          username = null;
          subscribed = null;
          winsTxt = null;
          winningsTxt = null;
          ray = null;
          botBar = null;
        }
      });
    });
    setTimeout(this.finish, 1000);
  }

  finish(){
    this.isRunning = false;
    if(this.queue && this.queue.length){
      const nextInQueue = this.queue.shift();
      this.enqueueAnimation(nextInQueue);
    }
  }

  enqueueAnimation(options){
    if(this.isRunning){
      this.queue.push(options);
    } else {
      this.isRunning = true;
      this.render(options);
    }
  }

  onMessage(streamAction) {
    //Called when someone in Twitch calls your command

    this.enqueueAnimation(streamAction.data);

  }
}

export default Notify;

//^^Nessecary for Webpack to compile

if(window !== undefined){
  window.notify = Notify;
}

//^^Nessecary for Bebo to require in NOTE: make the property lowercase (i.e example !== Example)
