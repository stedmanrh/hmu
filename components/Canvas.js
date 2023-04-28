import React from "react";
import { useEffect, useRef } from "react";
import * as convert from 'color-convert';
import canvasTxt from "../utils/canvas-txt";
import roundRect from "../utils/roundRect";

function Canvas(props) {

    // use ref to allow canvas to draw to context
    const canvasRef = useRef();

    const rgbaColor = (hexColor, alpha) => {
        const stop = convert.hex.rgb(hexColor);
        const rgbaColor = "rgba(" + stop.join(",") + "," + alpha + ")";
        return rgbaColor;
    }

    const draw = (img, vibe, name, width, height) => {
        // initialize canvas
        const w = width / 100;
        const h = height / 100;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        // how element is displayed on screen
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        // actual width and height of canvas bitmap
        // canvas gets smaller as these #s get larger
        canvas.width = width;
        canvas.height = height;
        // scale causes the image to be cut off on mobile
        // const dpi = window.devicePixelRatio;
        // ctx.scale(dpi, dpi);
        const startSwatch = vibe.group[0];
        const endSwatch = vibe.group[vibe.group.length - 1];

        // card
        ctx.rect(0, 0, width, height);
        ctx.fillStyle = "#fcfcfc";
        ctx.strokeStyle = "rgba(0,0,0,.02)";
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        // avatar shadow
        let y = 16 * h;
        ctx.beginPath();
        ctx.arc(50 * w, y, 36, 0, 360);
        ctx.shadowColor = "#c0c0c0";
        ctx.shadowOffsetY = 4;
        ctx.shadowBlur = 16;
        ctx.fillStyle = "#fcfcfc";
        ctx.fill();

        // avatar container
        ctx.beginPath();
        ctx.arc(50 * w, y, 36, 0, 360);
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
        canvasTxt.drawText(ctx, emoji, 50 * w - 48 / 2, y - 60 / 2, 48, 48);

        // name text
        y = y + 48 + 36;
        canvasTxt.font = "Helvetica Neue";
        canvasTxt.fontSize = 28;
        canvasTxt.lineHeight = 34;
        canvasTxt.fontWeight = "bold";
        ctx.fillStyle = "#222";
        if (name === "") {
            ctx.fillStyle = "#a0a0a0";
            name = "Share your contact info Tactfully.";
        }
        canvasTxt.drawText(ctx, name, 50 * w - 256 / 2, y - 68 / 2, 256, 68);


        //  QR code
        const qrx = 50 * w - 192 / 2;
        y = y + 60;
        ctx.beginPath();
        ctx.roundRect(qrx, y, 192, 192, 16 + 4);
        ctx.shadowColor = rgbaColor(startSwatch, .5);
        ctx.shadowOffsetY = -4;
        ctx.shadowBlur = 16;
        ctx.fillStyle = "white";
        ctx.fill();

        ctx.beginPath();
        ctx.roundRect(qrx, y, 192, 192, 16 + 4);
        ctx.shadowColor = rgbaColor(endSwatch, .5);
        ctx.shadowOffsetY = 4;
        ctx.shadowBlur = 16;
        ctx.fillStyle = "white";
        ctx.fill();

        ctx.beginPath();
        ctx.shadowOffsetY = ctx.shadowBlur = 0;
        ctx.roundRect(qrx + 4, y + 4, 192 - 8, 192 - 8, 16);
        const gradient = ctx.createLinearGradient(qrx, y, qrx, y + 192);
        gradient.addColorStop(0, startSwatch);
        gradient.addColorStop(1, endSwatch);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 8;
        ctx.stroke();

        ctx.beginPath();
        ctx.roundRect(qrx + 8, y + 8, 192 - 16, 192 - 16, 16);
        ctx.fillStyle = "white";
        ctx.fill();

        if (qrx > 0) {
            ctx.drawImage(img, qrx + 12, y + 12);
        }

        //  promo
        const promo = "Created with hmu.world";
        canvasTxt.font = "Helvetica Neue";
        canvasTxt.fontSize = 14;
        canvasTxt.fontWeight = "normal";
        ctx.fillStyle = "#a0a0a0";
        canvasTxt.drawText(ctx, promo, 50 * w - 160 / 2, 92 * h, 160, 17);
    };

    // componentDidMount AND componentDidUpdate
    useEffect(() => {
        //   Pass in an empty state SVG data URI
        const img = new Image();
        img.src = props.src;
        img.onload = () => {
            draw(img, props.vibe, props.name, props.width, props.height);
        };
    }, [props.src, props.vibe, props.name, props.width, props.height]);

    return (<canvas ref={canvasRef} {...props} />);
}

export default Canvas;
