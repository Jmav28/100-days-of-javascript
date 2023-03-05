const downloadBtn = document.querySelector(".download-btn");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrCont = document.querySelector("#qr-code");
const qrTxt = document.querySelector(".qr-txt");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes");

const defaultUrl = "http://youtube.com";
let colorLight = "#fff",
    colorDark = "#000",
    text = defaultUrl,
    size = 300;

dark.addEventListener("input", handleDColor);
light.addEventListener("input", handleLColor);
qrTxt.addEventListener("input", handleQRTxt);
sizes.addEventListener("input", handleSize);
shareBtn.addEventListener("click", handleShare);

function handleDColor(e) {
    colorDark = e.target.value;
    generateQRCode();
}

function handleLColor(e) {
    colorLight = e.target.value;
    generateQRCode();
}

function handleSize() {
    size = e.target.value;
    generateQRCode();
}

function handleQRTxt(e) {
    const value = e.target.value;
    text = value;
    if (!value) {
        text = defaultUrl;
    }
    generateQRCode();
}

async function generateQRCode() {
    qrCont.innerHTML = "";
    new QRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    downloadBtn.href = await resolveDataUrl();
}

async function handleShare() {
    setTimeout(async () => {
        try {
            const base64url = await resolveDataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png", {
                type: blob.type,
            });
            await navigator.share({
                files: [file],
                title: text,
            });
        } catch (error) {
            alert("No hubo modo");
        }
    }, 100);
}

function resolveDataUrl() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img");
            if(img.currentSrc) {
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    });
}
generateQRCode();