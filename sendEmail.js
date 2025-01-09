
window.onload = function() {
    // Log a success message to the console when the page is reloaded or opened
    console.log("JavaScript is successfully connected and the page is loaded!");
}
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("7pwsZ4a2PDgD2x7rj"); // Replace with your EmailJS Public Key

    const form = document.getElementById("bookingForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Gather form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Send the email using EmailJS
        emailjs.send("service_ghk5hgj", "template_qgb6ob6", data)
            .then(() => {
                alert("Email sent successfully!");
                form.reset(); // Clear the form
            })
            .catch((error) => {
                alert("Failed to send email. Please try again.");
                console.error("EmailJS Error:", error);
            });
    });
});
