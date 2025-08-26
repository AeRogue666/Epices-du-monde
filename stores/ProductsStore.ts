const image = reactive<{
        id: string,
        description: string,
        width?: number,
        height?: number,
    }[]>([]),
        availabilityTypeList = reactive<{
            name: string,
            value: string,
            color: string,
        }[]>([
            {
                name: 'Available soon',
                value: 'soon',
                color: 'black',
            },
            {
                name: 'In stock',
                value: 'in_stock',
                color: 'green',
            },
            {
                name: 'Out of stock',
                value: 'out_of_stock',
                color: 'red',
            },
        ]),
    productsList = reactive<{
    id: number,
    title: string,
    description: string,
    image: {
        id: string,
        description: string,
        width?: number,
        height?: number,
    },
    slug: string,
    price: number,
    reduction_rate?: number,
    old_price?: number,
    availability: {
    name: string,
    value: string,
    color: string,
    }
}[]>([]);


const productsAssemble = (product: any[], image: any[]) => {
            product.map((obj, i) => {
                const type = availabilityTypeList.filter((type) => type.value === obj.availability)[0];
                const img = image.filter((item) => item.id === obj.image_id)[i];
                return productsList.unshift({
                    id: obj.id,
                    title: obj.title,
                    description: obj.description,
                    image: img,
                    slug: obj.slug,
                    price: obj.price,
                    reduction_rate: obj.reduction_rate,
                    old_price: obj.old_price,
                    availability: type,
                })
            })
        };

const readAllProducts = async () => {
                const products = await fetch(`http://localhost:3000/directus/items/Product?filter[status][_eq]=published&sort=date_created`)
                    .then(res => res.json())
                    .then(res => res.data),
                    readImage = await Promise.all(
                        products.map(async (item: { image_id: string; }) => {
                            await fetch(`http://localhost:3000/directus/files?filter[id][_eq]=${item.image_id}&fields=id,description,width,height`)
                                .then(res => res.json())
                                .then(res => res.data)
                                .then(res => image.push(res.reduce((acc: any, value: any) => acc + value)))
                        })
                    );

                products ? readImage : ''
                products && image ? productsAssemble(products, image) : ''
            };

export const useProductsStore = defineStore('products', () => {
    const products = computed({
        get() {
            readAllProducts()
        },
        set() {
            
        }
    })

    return { products }
})
