import React, { Component } from 'react'
import './index.css'


export default class DiceBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dot: 2
        }
    }

    componentDidMount() {
        var ctx = document.getElementById("canvas").getContext("2d");
        this.dice1 = new Dice(ctx, {
            x: 0,
            y: 0,
            height: 200,
            width: 200,
            dotWidth: 15
        });
    }

    tick() {
        this.dice1.randowDraw()
            .then(res => {
                this.setState({ dot: res })
            })
    }

    render() {
        return (
            <div id='dice' onClick={() => { this.tick() }}>
                <canvas id="canvas" width="200" height="200"></canvas>
            </div>
        )
    }
}

//摇色子的类
var Dice = function (ctx, config) {
    this.ctx = ctx;
    this.x = config.x;			//色子的起始横坐标
    this.y = config.y;			//色子起始纵坐标
    this.width = config.width;	//色子宽度
    this.height = config.height;	//色子高度
    this.dotWidth = config.dotWidth;	//点的半径
    this.timer = null;
    this.init();
}
Dice.prototype = {
    init: function () {
        this.roundRectanglePath(this.x, this.y, this.width, this.height, 5);
        this.drawDice();
    },
    roundRectanglePath: function (x, y, w, h, r) {
        this.ctx.lineWidth = 5;
        this.ctx.fillStyle = "#000000";
        this.ctx.beginPath();
        this.ctx.moveTo(x + r, y);
        this.ctx.arcTo(x + w, y, x + w, y + h, r);
        this.ctx.arcTo(x + w, y + h, x, y + h, r);
        this.ctx.arcTo(x, y + h, x, y, r);
        this.ctx.arcTo(x, y, x + w, y, r);
        this.ctx.closePath();
        this.ctx.fill();
        return this;
    },
    clearRect: function () {
        var sp = this.dotWidth / 2;
        this.ctx.clearRect(this.x + sp, this.y + sp,
            this.width - this.dotWidth, this.height - this.dotWidth);
    },
    getRandomDot: function () {
        return 1 + Math.floor(Math.random() * 6);
    },
    getRandomRatio: function () {
        var dot = this.getRandomDot(),
            ratios = {
                1: [{ x: 0.5, y: 0.5 }],
                2: [{ x: 0.5, y: 0.25 },
                { x: 0.5, y: 0.75 }],
                3: [{ x: 0.25, y: 0.25 },
                { x: 0.5, y: 0.5 },
                { x: 0.75, y: 0.75 }],
                4: [{ x: 0.25, y: 0.25 },
                { x: 0.25, y: 0.75 },
                { x: 0.75, y: 0.25 },
                { x: 0.75, y: 0.75 }],
                5: [{ x: 0.25, y: 0.25 },
                { x: 0.25, y: 0.75 },
                { x: 0.75, y: 0.25 },
                { x: 0.75, y: 0.75 },
                { x: 0.5, y: 0.5 }],
                6: [{ x: 3 / 8, y: 0.25 },
                { x: 5 / 8, y: 0.25 },
                { x: 3 / 8, y: 0.5 },
                { x: 5 / 8, y: 0.5 },
                { x: 3 / 8, y: 0.75 },
                { x: 5 / 8, y: 0.75 }]
            };
        this.dot = dot;
        return ratios[dot];
    },
    drawDice: function () {
        this.clearRect();
        var dotRatio = this.getRandomRatio();
        var ctx = this.ctx;
        ctx.fillStyle = "#514e4e";
        var isOneDot = (dotRatio.length === 1);
        dotRatio.map(function (ratio, index) {
            ctx.beginPath();
            var dotWidth = this.dotWidth;
            if (isOneDot) {
                dotWidth = dotWidth * 3;
            }
            if (dotRatio.length === 1 || dotRatio.length === 4) {
                ctx.fillStyle = "#bb0000";
            }
            ctx.arc(this.x + ratio.x * this.width,
                this.y + ratio.y * this.height,
                dotWidth, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }.bind(this))
    },
    randowDraw: function () {
        var time = 100, x = 0;
        var self = this;
        return new Promise(function (resolve, reject) {
            self.timer = setInterval(function () {
                x = x + 20;
                time = -24 * x * x + 18 * x + 1000000;
                self.drawDice();
                if (time < 0) {
                    clearInterval(self.timer);
                    self.timer = null;
                    resolve(self.dot);
                }
            }, time);
        });
    }
}

