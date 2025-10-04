document.addEventListener("DOMContentLoaded", function () {
    const weight = this.getElementById('weight')
    const height = this.getElementById('height')
    const output = this.getElementById('imt')
    const button = this.getElementById('btn')


    button.addEventListener('click', function () {
        const w = (+weight.value)
        const h = (+height.value) / 100
        const imt = w / h / h
        output.value = imt.toFixed(2)
    })

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {console.log('SW registred', registration)})
            .catch(error => {console.log('SW failed', error)})
    }
})