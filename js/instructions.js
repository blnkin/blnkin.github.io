document.addEventListener('DOMContentLoaded', function () {
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function () {
            window.location.href = 'index.html';
        });
    }
});