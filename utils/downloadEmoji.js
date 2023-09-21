const fs = require("fs");
const download = require('image-downloader');

// Output destination
const output = "../../public/emoji"

// Emoji to download
const vibes = fs.readFileSync(
    "./vibes.json",
    "utf-8"
);

function downloadEmoji(url, filepath) {
    download.image({
        url: url,
        dest: filepath
    }, () => {
        return filepath;
    });
}

async function writeEmojiData(vibes) {

    for (const vibe of JSON.parse(vibes)) {
        const emoji = vibe.emoji;
        const url = `https://emojicdn.elk.sh/${emoji}`;
        const filepath = `${output}/${emoji}.png`;
        await downloadEmoji(url, filepath);
    }

    console.log(`Emoji images available at ${output}`);
}

writeEmojiData(vibes);