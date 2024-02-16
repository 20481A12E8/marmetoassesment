

fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json')
    .then(response => response.json())
    .then(data => {
        const product = data.product;
        const thumbnailsContainer = document.getElementById('thumbnail-container');

        document.getElementById('product-image').src = product.images[0].src;
        product.images.forEach(image => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.innerHTML = `<img src="${image.src}" alt="Thumbnail">`;
            thumbnail.addEventListener('click', () => {
                document.getElementById('product-image').src = image.src;
            });
            thumbnailsContainer.appendChild(thumbnail);
        });

        document.getElementById('product-vendor').textContent = `${product.vendor}`;
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('price').textContent = `Price: ${product.price}`;

        const price = parseFloat(product.price.replace('$', '').replace(',', ''));
        const compareAtPrice = parseFloat(product.compare_at_price.replace('$', '').replace(',', ''));
        const discountPercentage = Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
        document.getElementById('compare-at-price').innerHTML = `<span style="text-decoration: line-through;">${product.compare_at_price}</span>`;
        if (discountPercentage > 0) {
            document.getElementById('compare-at-price').innerHTML += ` (${discountPercentage}% Off)`;
        }

        const colorSelector = document.getElementById('color-selector');
        product.options.find(option => option.name === 'Color').values.forEach(value => {
            const colorName = Object.keys(value)[0];
            const colorCode = value[colorName];
            const colorCheckbox = document.createElement('input');
            colorCheckbox.type = 'checkbox';
            colorCheckbox.value = colorName;
            colorCheckbox.id = colorName;
            const colorLabel = document.createElement('label');
            colorLabel.setAttribute('for', colorName);
            colorLabel.style.backgroundColor = colorCode;
            colorSelector.appendChild(colorCheckbox);
            colorSelector.appendChild(colorLabel);
        });

        const sizeSelector = document.getElementById('size-selector');
        sizeSelector.innerHTML = '';

        product.options.find(option => option.name === 'Size').values.forEach(value => {
            const sizeRadio = document.createElement('input');
            sizeRadio.type = 'radio';
            sizeRadio.name = 'size';
            sizeRadio.value = value;
            sizeRadio.id = value;

            const sizeLabel = document.createElement('label');
            sizeLabel.setAttribute('for', value);
            sizeLabel.textContent = value;

            sizeRadio.style.display = 'inline-block';
            sizeLabel.style.display = 'inline-block';

            sizeLabel.style.marginRight = '40px';

            sizeLabel.style.fontSize = '12px';
            if (value === 'Extra large') {
                sizeLabel.style.whiteSpace = 'nowrap';
            }

            sizeSelector.appendChild(sizeRadio);
            sizeSelector.appendChild(sizeLabel);
        });



        document.getElementById('description').innerHTML = product.description;
    })
    .catch(error => console.error('Error fetching data:', error));

document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    const colorCheckboxes = document.querySelectorAll('#color-selector input[type="checkbox"]:checked');
    const colors = Array.from(colorCheckboxes).map(checkbox => checkbox.value);
    const sizeRadio = document.querySelector('#size-selector input[type="radio"]:checked');
    const size = sizeRadio ? sizeRadio.value : '';
    const quantity = document.getElementById('quantity-input').value;

    const cartMessage = document.getElementById('cart-message');
    cartMessage.innerHTML = `Embrace Sideboard with color , ${colors.join(', ')} and size ${quantity} ${size} added to cart`;
    cartMessage.style.display = 'block';
    cartMessage.style.fontSize = '14px';

});
