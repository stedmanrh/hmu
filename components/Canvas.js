import React from "react";
import { useEffect, useRef } from "react";
import * as convert from 'color-convert';
import canvasTxt from "../utils/canvas-txt";
import roundRect from "../utils/roundRect";

function Canvas (props) {

  const width = 320;
  const height = 480;
  
  // useRef lets you persist values without rerendering
  // is this what we want? feels redundant but i dont think i understand this well
  const canvasRef = useRef();

  const rgbaColor = (hexColor, alpha) => {
    const stop = convert.hex.rgb(hexColor);
    const rgbaColor = "rgba(" + stop.join(",") + "," + alpha + ")";
    return rgbaColor;
  }

  const draw = (src, vibe, name) => {
    // initialize canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // how element is displayed on screen
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    // actual width and height of canvas bitmap
    // canvas gets smaller as these #s get larger
    canvas.width = width*2;
    canvas.height = height*2;
    // scale causes the image to be cut off on mobile
    // const dpi = window.devicePixelRatio;
    // ctx.scale(dpi, dpi);
    const startSwatch = vibe.group[0];
    const endSwatch = vibe.group[vibe.group.length-1];

    // card
    ctx.rect(0, 0, width, height);
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
    let emoji = vibe.emoji;
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
    ctx.shadowColor = rgbaColor(startSwatch, .5);
    ctx.shadowOffsetY = -4;
    ctx.shadowBlur = 16;
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(64, 212, 192, 192, 16+4);
    ctx.shadowColor = rgbaColor(endSwatch, .5);
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
    canvasTxt.drawText(ctx, promo, 77, 429, 86, 17);
    const textW = ctx.measureText(promo).width;
    canvasTxt.fontWeight = "bold";
    canvasTxt.drawText(ctx,"hmu.world", 77+textW, 429, 165-textW, 17);
  };

  // componentDidMount AND componentDidUpdate
  useEffect(() => {
    //   Pass in an empty state SVG data URI
    draw(props.src, props.vibe, props.name);
  }, [props.src, props.vibe, props.name]);

  return (<canvas ref={canvasRef} {...props} />);
}

export default Canvas;
