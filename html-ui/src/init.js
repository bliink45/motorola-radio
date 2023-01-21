const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

$(document).ready(function () {
    $("body").draggable();
    $("body").css("width", $(".radio").css('width'));

    $(".controller .volume").popover({
        placement: "top",
        content: " ",
    });

    $(".controller .channel").popover({
        placement: "top",
        content: " ",
    });

    $(document).on("click", ".controller .volume", async () => {
        if ($(`#${$(".controller .volume").attr('aria-describedby')}`).children(".popover-body").length === 0) {
            await sleep(1);
            let popoverBody = $(`#${$(".controller .volume").attr('aria-describedby')}`).children(".popover-body")
            popoverBody.css("padding", "1");
            popoverBody.append("<button id='volume-down-btn'>-</button>");
            popoverBody.append("<button  id='volume-up-btn'>+</button>");
        }
    });

    $(document).on("click", ".controller .channel", async () => {
        if ($(`#${$(".controller .channel").attr('aria-describedby')}`).children(".popover-body").length === 0) {
            await sleep(1);
            let popoverBody = $(`#${$(".controller .channel").attr('aria-describedby')}`).children(".popover-body")
            popoverBody.css("padding", "1");
            popoverBody.append("<button id='channel-prev-btn'>\<</button>");
            popoverBody.append("<button id='channel-next-btn'>\></button>");
        }
    });

    $(".container.submit").addClass("hide");
    $(".zones").addClass("hide");

    $(".contact-actions").addClass("hide");
    $(".contacts").addClass("hide");

    $(".screen").addClass("hide");
    $("body").addClass("hide");
});
