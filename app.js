const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const listCart = $('.list-cart')
const quantityCart = $('.cart-icon span')

const app = {
    cart: [],

    toggle() {
        const cartIcon = $('.cart-icon')
        const cart = $('.cart')

        cartIcon.onclick = () => {
            cart.classList.toggle('toggle')
        }
    },

    handleDelete(selector) {
        const deleteBtn = $$(`.${selector}`)
        deleteBtn.forEach((item, i) => {
            item.onclick = () => {
                this.cart.splice(i, 1)
                this.total()
                this.render()
                quantityCart.innerText = this.cart.length
            }
        })
    },

    render() {
        const html = this.cart.map((item, i) => {
            return `
                <div class="cart-item">
                    <div class="info-product">
                        <div class="info-product-price">
                            <img src=${item.src} alt="" />
                            <div>$<span class="cart-price">${item.price}</span></div>
                        </div>
                        <p>${item.name}</p>
                    </div>
                    <div class="quantity">
                        <span class="reduce" data-reduce="${i}">-</span>
                        <span>${item.quanlity}</span>
                        <span class="increase" data-increase="${i}">+</span>
                    </div>
                    <div class="delete" data-index="${i}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                                d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"
                            />
                        </svg>
                    </div>
                </div>
                `
        })

        listCart.innerHTML = html.join('')

        this.handleDelete('delete')
    },

    buyItem() {
        const btns = $$('.btn')

        btns.forEach((btn) => {
            btn.onclick = () => {
                const parentElm = btn.parentElement.parentElement
                const { src } = parentElm.querySelector('img')
                const name = parentElm.querySelector('.name').innerText
                const price = parentElm.querySelector('.price span').innerText

                const newProduct = {
                    src,
                    name,
                    price: parseInt(price),
                    quanlity: 1,
                }

                const check = this.cart.find((item) => {
                    return item.name === newProduct.name
                })

                if (check) {
                    alert('Sản phẩm đã có trong giỏ hàng!')
                    return
                } else {
                    this.cart.push(newProduct)
                    quantityCart.innerText = this.cart.length
                }

                this.render()
                this.total()
            }
        })
    },

    delete(index) {
        this.cart.splice(index, 1)
        this.render()
        this.total()
        quantityCart.innerText = this.cart.length
    },

    quantily(i, option) {
        if (option === 'increase') {
            this.cart[i].quanlity++
        } else if (option === 'reduce') {
            this.cart[i].quanlity--
            if (this.cart[i].quanlity === 0) {
                this.delete(i)
                this.render()
            }
        }
        this.total()
        this.render()
    },

    handleQuantily() {
        listCart.onclick = (e) => {
            const increase = e.target.closest('.increase')
            const reduce = e.target.closest('.reduce')
            if (increase) {
                const index = increase.dataset.increase
                this.quantily(index, 'increase')
            } else if (reduce) {
                const index = reduce.dataset.reduce
                this.quantily(index, 'reduce')
            }
        }
    },

    total() {
        const totalElm = $('.total span')
        const total = this.cart.reduce((a, b) => a + b.price * b.quanlity, 0)
        totalElm.innerText = total
    },

    start() {
        this.render()
        this.toggle()
        this.buyItem()
        this.handleQuantily()
    },
}

app.start()
