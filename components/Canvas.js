import React from "react";
import canvasTxt from "../utils/canvas-txt";
import * as convert from 'color-convert';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.draw = this.draw.bind(this);
    this.rgbaColor = this.rgbaColor.bind(this);
  }

  rgbaColor = (hexColor, alpha) => {
    const stop = convert.hex.rgb(hexColor);
    const rgbaColor = "rgba(" + stop.join(",") + "," + alpha + ")";
    return rgbaColor;
  }

  draw = (src, scheme, name) => {
    // initialize canvas
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpi = window.devicePixelRatio;
    canvas.style.width = "320px";
    canvas.style.height = "480px";
    canvas.width = 640;
    canvas.height = 960;
    ctx.scale(dpi, dpi);
    const startSwatch = scheme.group[0];
    const endSwatch = scheme.group[scheme.group.length-1];

    // card
    ctx.rect(0, 0, 320, 480);
    ctx.fillStyle = "#fcfcfc";
    ctx.strokeStyle = "rgba(0,0,0,.02)";
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    // avatar shadow
    ctx.beginPath();
    ctx.arc(160, 68, 36, 0, 360);
    ctx.shadowColor = "#d8d8d8";
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 16;
    ctx.fillStyle = "#fcfcfc";
    ctx.fill();

    // avatar container
    ctx.beginPath();
    ctx.arc(160, 68, 36, 0, 360);
    ctx.shadowColor = "white";
    ctx.shadowOffsetY = -4;
    ctx.shadowBlur = 16;
    ctx.fillStyle = "#fcfcfc";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();

    // emoji avatar
    let emoji = scheme.emoji;
    canvasTxt.fontSize = 48;
    canvasTxt.drawText(ctx, emoji, 136, 38, 48, 48);

    // name text
    canvasTxt.font = "Helvetica Neue";
    canvasTxt.fontSize = 28;
    canvasTxt.lineHeight = 34;
    canvasTxt.fontWeight = "bold";
    ctx.fillStyle = "#222";
    if (name === "") {
        ctx.fillStyle = "#a0a0a0";
        name = "Share your contact info effortlessly.";
    }
    canvasTxt.drawText(ctx, name, 32, 120, 256, 68);

    //  QR code
    ctx.beginPath();
    ctx.roundRect(64, 212, 192, 192, 16+4);
    ctx.shadowColor = this.rgbaColor(startSwatch, .5);
    ctx.shadowOffsetY = -4;
    ctx.shadowBlur = 16;
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(64, 212, 192, 192, 16+4);
    ctx.shadowColor = this.rgbaColor(endSwatch, .5);
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 16;
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.shadowOffsetY = ctx.shadowBlur = 0;
    ctx.roundRect(64+4, 212+4, 192-8, 192-8, 16);
    const gradient = ctx.createLinearGradient(64, 212, 64, 404);
    gradient.addColorStop(0, startSwatch);
    gradient.addColorStop(1, endSwatch);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(64+8, 212+8, 192-16, 192-16, 16);
    ctx.fillStyle = "white";
    ctx.fill();

    const img = new Image();
    img.src = src;
    img.onload = () => {
      ctx.drawImage(img, 64+12, 212+12);
    };

    //  promo
    const promo = "Created with ";
    canvasTxt.font = "Helvetica Neue";
    canvasTxt.fontSize = 14;
    canvasTxt.fontWeight = "normal";
    ctx.fillStyle = "#a0a0a0";
    canvasTxt.drawText(ctx, promo, 92, 429, 86, 17);
    const textW = ctx.measureText(promo).width;
    canvasTxt.fontWeight = "bold";
    canvasTxt.drawText(ctx,"hmu.fr", 92+textW, 429, 135-textW, 17);
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.draw(this.props.src, this.props.scheme, this.props.name);
    }
  }

  componentDidMount() {
    //   Pass in an empty state SVG data URI
    this.draw(this.props.src, this.props.scheme, this.props.name);
  }

  render = () => {
    return <canvas ref={this.canvasRef} {...this.props} />;
  };
}

export default Canvas;
