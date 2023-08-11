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
            popoverBody.append('<button class="button volume-down">-</button>');
            popoverBody.append('<button class="button volume-up">+</button>');
        }
    });

    $(document).on("click", ".controller .channel", async () => {
        if ($(`#${$(".controller .channel").attr('aria-describedby')}`).children(".popover-body").length === 0) {
            await sleep(1);
            let popoverBody = $(`#${$(".controller .channel").attr('aria-describedby')}`).children(".popover-body")
            popoverBody.css("padding", "1");
            popoverBody.append('<button class="button channel-down">\<</button>');
            popoverBody.append('<button class="button channel-up">\></button>');
        }
    });

    $(".container.submit").addClass("hide");
    $(".zones").addClass("hide");

    $(".contact-actions").addClass("hide");
    $(".contacts").addClass("hide");

    $(".home").addClass("hide");

    $(".screen").addClass("hide");
    $(".dropdown-content").addClass("hide");
    $("body").addClass("hide");
});
