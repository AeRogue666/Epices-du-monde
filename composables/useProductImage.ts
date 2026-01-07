/**
     * Composable to manage products images with Directus 
 */

export const useProductImage = () => {
    const config = useRuntimeConfig(), 
    apiPublicEndpoint = config.public.apiBase;

    /**
     * Get image full URL from Directus
     * @param imageId
     * @param options 
     */
    const getImageUrl = (
        imageId: string | Image | undefined,
        options?: {
            width?: number,
            height?: number,
            quality?: number,
            fit?: 'cover' | 'contain' | 'inside' | 'outside',
            format?: 'auto' | 'jpg' | 'png' | 'webp'
        }
    ) : string | null =>  {
        if (!imageId) return null

        // If Image is an object, extract ID
        const id = typeof imageId === 'string' ? imageId : imageId.id;

        if(!id) return null

        // Base URL
        let url = `${apiPublicEndpoint}/assets/${id}`

        // Adding parameters to transform if available
        if(options && Object.keys(options).length > 0) {
            const params = new URLSearchParams();

            if(options.width) params.append('width', options.width.toString())
            if(options.height) params.append('height', options.height.toString())
            if(options.quality) params.append('quality', options.quality.toString())
            if(options.fit) params.append('fit', options.fit.toString())
            if(options.format) params.append('format', options.format.toString())

            const queryString = params.toString();
            if(queryString) url += `${queryString}`
        }

        return url
    }

    /**
     * Get all details about an image
     * @param imageId 
     */
    const fetchImageDetails = async(imageId: string): Promise<Image | null> => {
        try {
            const response = await $fetch(`${apiPublicEndpoint}/files/${imageId}`, {
                query: {
                    fields: 'id,description,width,height',
                },
            }).then((res: any) => res.data);
            return response
        } catch (error) {
            console.error('Erreur lors du chargement des détails de l\'image: ', error)
            return null
        }
    };
    
    /**
     * Generate an srcset for a responsive image
     * @param imageId 
     * @param widths 
     */
    const getImageSrcSet = (
        imageId: string | Image | undefined,
        widths: number[] = [320, 640, 960, 1280, 1920]
    ) : string | null => {
        if(!imageId) return null

        const id = typeof imageId === 'string' ? imageId : imageId.id;
        if(!id) return null

        return widths.map(width => {
            const url = getImageUrl(id.toString(), { width, format: 'auto' })
            return `${url} ${width}w`
        }).join(', ')
    };

    /**
     * Get image description for accessibility
     * @param imageId 
     */
    const getImageDescription = (imageId: string | Image | undefined): string => {
        if(!imageId) return ''

        if(typeof imageId === 'string') return ''

        return imageId.description || ''
    };

    /**
     * Get image dimensions
     * @param imageId 
     */
    const getImageDimensions = (imageId: string |Image | undefined): { width?: number; height?: number } => {
        if(!imageId || typeof imageId === 'string') {
            return {}
        }

        return {
            width: imageId.width,
            height: imageId.height,
        }
    };

    return {
        getImageUrl,
        fetchImageDetails,
        getImageSrcSet,
        getImageDescription,
        getImageDimensions,
    }
}