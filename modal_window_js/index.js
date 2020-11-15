let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://d3ar0cfl4379w2.cloudfront.net/jousun-uploads/large/product/VGT0024.jpg'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://www.gujaratgifts.com/media/catalog/product/cache/1/image/750x/040ec09b1e35df139433887a97daa66f/n/1/n1905fruit04.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://www.gujaratgifts.com/media/catalog/product/cache/1/image/750x/040ec09b1e35df139433887a97daa66f/n/1/n1905fruit01.jpg'}
]

const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img src="${fruit.img}" class="card-img-top" alt="${fruit.title}" style="height: 300px">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
            </div>
        </div>
    </div>
`

function renderCards() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}
renderCards()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
                priceModal.close()
        }}
    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            renderCards()
            console.log('Removed')
        }).catch(() => {
            console.log('Canceled')
        })
    }
})
