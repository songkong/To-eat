/**
 * Created by kongsong on 2017/2/2.
 */
var CanvasComponent = React.createClass({
    eyes: {
        leftEye: {
            x: 125,
            y: 350,
            radius: 40
        },
        rightEye: {
            x: 265,
            y: 350,
            radius: 40
        }
    },
    timer: null,
    getInitialState: function () {
        return {click: 'start', btnText: this.props.btnText.start};
    },
    componentDidMount: function () {
        this.initCanvas({count: 0, text: this.props.initText, smile: false});
    },
    componentDidUpdate: function () {
        var self = this;
        var menuLength = self.props.menuList.length;
        if (self.state.click == 'stop') {
            var count = 0;
            self.timer = setInterval(function () {
                self.initCanvas({count: count++, text: self.props.menuList[Math.floor(Math.random() * menuLength)], smile: false});
            },100);
        } else {
            clearInterval(self.timer);
            self.initCanvas({count: 5, text: self.props.menuList[Math.floor(Math.random() * menuLength)], smile: true});
        }
    },
    clickHandler: function (e) {
        if (this.state.click == 'start') {
            this.setState({click: 'stop', btnText: this.props.btnText.stop});
        } else {
            this.setState({click: 'start', btnText: this.props.btnText.start});
        }
    },
    drawEyes: function (option) {
        var ctx =  option.ctx;
        var params = this.eyes[option.direction];
        var deg = 2 * Math.PI / 360 * option.deg;
        var x_offset = 21 * Math.cos(deg);
        var y_offset = 21 * Math.sin(deg);
        ctx.lineWidth=5;
        ctx.strokeStyle="#fff";
        ctx.beginPath();
        ctx.arc(params.x, params.y, params.radius, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(params.x  + x_offset, params.y  + y_offset, params.radius / 4, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
    },
    drawMouse: function (option) {
        var ctx = option.ctx;
        ctx.fillStyle="#fff";
        ctx.beginPath();
        if (option.smile) {
            ctx.arc(195, 420, 40, 0, Math.PI, false);
        } else {
            ctx.arc(195, 440, 10, 0, Math.PI * 2, true);
        }
        ctx.fill();
        ctx.closePath();
    },
    drawBox: function (option) {
        var ctx = option.ctx;
        var text = option.text;
        ctx.strokeStyle="#fff";
        ctx.moveTo(264, 275);
        ctx.lineTo(250, 240);
        ctx.moveTo(263, 275);
        ctx.lineTo(285, 240);
        ctx.lineTo(325, 240);
        ctx.arcTo(345, 240, 345, 220, 20);
        ctx.arcTo(345, 60, 325, 60, 20);
        ctx.arcTo(55, 60, 55, 80, 20);
        ctx.arcTo(55, 240, 75, 240, 20);
        ctx.lineTo(252,240);
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = "32pt Calibri";
        ctx.textAlign = 'center';
        ctx.fillText(text,200,165,240);
    },
    initCanvas: function (option) {
        var deg = option.count* 36 + 90;
        var ctx = this.refs.canvas.getContext('2d');
        ctx.fillStyle = '#82ebc6';
        ctx.fillRect(0,0,400,500);
        this.drawEyes({ctx: ctx, direction: 'leftEye', deg: deg});
        this.drawEyes({ctx: ctx, direction: 'rightEye', deg: deg});
        this.drawMouse({ctx: ctx, smile: option.smile});
        this.drawBox({ctx: ctx, text: option.text});
    },
    render: function () {
        return (
            <div className="canvas-wrapper">
                <canvas ref="canvas" width={400} height={500} />
                <div className="btn-wrapper">
                    <div onClick={this.clickHandler} className="btn-primary">{this.state.btnText}</div>
                </div>
            </div>
        );
    }
});
module.exports = CanvasComponent;