(function () {
  function loadWidget() {
    const scriptTag = document.getElementById("voice-workflow-chat-widget");
    const chatbotId = scriptTag?.getAttribute("chatbot-id") || "default-id";

    const iframe = document.createElement("iframe");
    iframe.src = `http://localhost:3000/widget?chatbot-id=${chatbotId}`;
    iframe.style.position = "fixed";
    iframe.style.bottom = "20px"; 
    iframe.style.right = "20px"; 
    iframe.style.width =  "350px";
    iframe.style.height =  "400px";
    iframe.style.border = "none";
    iframe.style.zIndex = "1000";
    iframe.style.overflow = "hidden"; 

    document.body.appendChild(iframe);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadWidget);
  } else {
    loadWidget();
  }
})();
