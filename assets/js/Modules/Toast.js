// toastModule.js

let toastTimeout;

export function showToast(type, message) {

    const toast = document.createElement("div");
    toast.style.boxShadow = "0 0 15px 3px rgba(104,103,103,0.7)";
    toast.style.backgroundColor = "var(--"+type+")";
    toast.classList.add("toast");

    const text = document.createElement("span");
    text.innerText = message;
    toast.appendChild(text);

    const closeButton = document.createElement("button");
    closeButton.innerText = "x";
    closeButton.style.marginLeft = "10px";
    closeButton.style.marginRight = "-10px";
    closeButton.onclick = () => {
        closeToast(toast);
    };
    toast.appendChild(closeButton);

    const container = document.getElementById("toast-container");
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    startToastTimer(toast);

    toast.addEventListener("mouseenter", () => {
        clearTimeout(toastTimeout);
    });

    toast.addEventListener("mouseleave", () => {
        startToastTimer(toast);
    });
}

function startToastTimer(toast) {
    toastTimeout = setTimeout(() => {
        closeToast(toast);
    }, 2000); // Toast will automatically close after 2 seconds
}

function closeToast(toast) {
    toast.classList.remove("show");
    setTimeout(() => {
        toast.remove();
    }, 300); // Wait for the closing animation to finish before removing it
}
