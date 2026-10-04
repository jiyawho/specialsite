
document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       OPEN WHEN ENVELOPES
    ========================== */

    const envelopes = document.querySelectorAll(".envelope");

    envelopes.forEach((envelope) => {

        envelope.addEventListener("click", () => {

            const message = envelope.nextElementSibling;

            if (!message) return;

            if (message.style.display === "block") {
                message.style.display = "none";
            } else {
                message.style.display = "block";
            }

        });

    });


    /* =========================
       OPTIONAL: SMOOTH SCROLL FIX
       (just makes nav feel nicer)
    ========================== */

    const links = document.querySelectorAll("a[href^='#']");

    links.forEach(link => {

        link.addEventListener("click", (e) => {

            const target = document.querySelector(link.getAttribute("href"));

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

});